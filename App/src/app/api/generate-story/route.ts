/**
 * POST /api/generate-story
 * Generates a personalized story using OpenAI
 */

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { generateStory } from '@/lib/openai-service'
import { sendStoryNotificationEmail } from '@/lib/brevo-service'
import {
  errorResponse,
  successResponse,
  validateAge,
  logOperation,
  logError,
} from '@/lib/api-utils'

/**
 * Request body validation schema
 * Prevents injection attacks at the API boundary
 */
const RequestBodySchema = z.object({
  childName: z
    .string()
    .min(1, 'Name is required')
    .max(100, 'Name is too long')
    .regex(/^[\p{L}\p{N}\s\-']+$/u, 'Name contains invalid characters'),
  age: z.number().int().min(2, 'Age must be at least 2').max(10, 'Age must be at most 10'),
  interests: z
    .array(z.string().min(1).max(100))
    .min(1, 'At least one interest is required')
    .max(10, 'Too many interests'),
  theme: z.string().min(1).max(50).optional(),
  profileId: z.string().optional(),
})

interface RequestBody {
  childName: string
  age: number
  interests: string[]
  theme?: string
  profileId?: string
}

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const rawBody: unknown = await request.json()

    // Validate request body with Zod schema
    let body: RequestBody
    try {
      body = RequestBodySchema.parse(rawBody)
    } catch (validationError) {
      if (validationError instanceof z.ZodError) {
        const errorMessage = validationError.errors[0]?.message || 'Invalid input'
        const [response, status] = errorResponse(errorMessage, 'INVALID_INPUT')
        return NextResponse.json(response, { status })
      }
      throw validationError
    }

    const { childName, age, interests, theme = 'adventure', profileId } = body

    logOperation('generate-story_request', {
      childName,
      age,
      interestCount: interests.length,
      theme,
      hasProfileId: !!profileId,
    })

    // Get user from Supabase auth
    const supabase = createServerSupabaseClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      const [response, status] = errorResponse('Usuario no autenticado', 'UNAUTHORIZED')
      return NextResponse.json(response, { status: 401 })
    }

    // Check subscription status
    const { data: subscription, error: subError } = await supabase
      .from('subscriptions')
      .select('plan')
      .eq('user_id', user.id)
      .single()

    if (subError || !subscription) {
      const [response, status] = errorResponse('Error al verificar suscripción', 'SUBSCRIPTION_ERROR')
      return NextResponse.json(response, { status: 400 })
    }

    // Free users can generate max 1 story per month (simplified check)
    if (subscription.plan === 'free') {
      const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
      const { count } = await supabase
        .from('stories')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .gte('created_at', thirtyDaysAgo)
        .not('is_classic', 'is', true)

      if ((count || 0) >= 1) {
        const [response, status] = errorResponse(
          'Plan gratuito limitado a 1 cuento por mes. Actualiza a premium para generar ilimitados.',
          'RATE_LIMIT'
        )
        return NextResponse.json(response, { status: 429 })
      }
    }

    // Generate story with OpenAI
    // Input is already validated by Zod, no additional sanitization needed
    let storyData
    try {
      storyData = await generateStory({
        childName,
        age,
        interests,
        theme,
      })
    } catch (openaiError) {
      logError('openai_generation_failed', openaiError, { childName })
      const [response, status] = errorResponse(
        'Error al generar cuento. Por favor, intenta de nuevo más tarde.',
        'GENERATION_ERROR'
      )
      return NextResponse.json(response, { status: 500 })
    }

    // Save story to database
    const { data: storyRecord, error: dbError } = await supabase
      .from('stories')
      .insert({
        user_id: user.id,
        profile_id: profileId || null,
        title: storyData.title,
        content: storyData.story,
        is_premium: subscription.plan === 'premium',
        is_classic: false,
        cover_emoji: '🎉',
      })
      .select()
      .single()

    if (dbError) {
      logError('database_save_failed', dbError, { childName })
      const [response, status] = errorResponse('Error al guardar cuento', 'DATABASE_ERROR')
      return NextResponse.json(response, { status: 500 })
    }

    // Send notification email (fire and forget)
    if (user.email) {
      sendStoryNotificationEmail(user.email, childName, storyData.title).catch((err) => {
        logError('email_send_failed', err, { email: user.email, childName })
      })
    }

    logOperation('generate-story_success', {
      storyId: storyRecord.id,
      childName,
      tokenCount: storyData.tokenCount,
    })

    const [response, status] = successResponse(
      {
        storyId: storyRecord.id,
        title: storyData.title,
        story: storyData.story,
        createdAt: storyRecord.created_at,
      },
      201
    )

    return NextResponse.json(response, { status })
  } catch (error) {
    logError('generate-story_endpoint', error)
    const [response, status] = errorResponse('Error interno del servidor', 'INTERNAL_ERROR')
    return NextResponse.json(response, { status: 500 })
  }
}
