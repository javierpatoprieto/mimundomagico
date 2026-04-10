/**
 * POST /api/create-subscription
 * Creates a Stripe subscription for premium plan
 */

import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { createSubscription } from '@/lib/stripe-service'
import { errorResponse, successResponse, logOperation, logError } from '@/lib/api-utils'

export async function POST(request: NextRequest) {
  try {
    // Get authenticated user
    const supabase = createServerSupabaseClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      const [response, status] = errorResponse('Usuario no autenticado', 'UNAUTHORIZED')
      return NextResponse.json(response, { status: 401 })
    }

    logOperation('create-subscription_request', { userId: user.id, email: user.email })

    // Check if user already has an active premium subscription
    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('plan, expires_at')
      .eq('user_id', user.id)
      .single()

    if (subscription?.plan === 'premium') {
      const [response, status] = errorResponse('Ya tienes una suscripción premium activa', 'ALREADY_PREMIUM')
      return NextResponse.json(response, { status: 400 })
    }

    // Create Stripe subscription
    let stripeResult
    try {
      stripeResult = await createSubscription(user.id)
    } catch (stripeError) {
      logError('stripe_creation_failed', stripeError, { userId: user.id })
      const [response, status] = errorResponse(
        'Error al crear suscripción. Por favor, intenta de nuevo.',
        'STRIPE_ERROR'
      )
      return NextResponse.json(response, { status: 500 })
    }

    logOperation('create-subscription_success', {
      userId: user.id,
      subscriptionId: stripeResult.subscriptionId,
    })

    const [response, statusCode] = successResponse(
      {
        subscriptionId: stripeResult.subscriptionId,
        clientSecret: stripeResult.clientSecret,
        publishableKey: stripeResult.publishableKey,
        amount: 299,
        currency: 'eur',
        description: 'Plan Premium - €2,99/mes',
      },
      200
    )

    return NextResponse.json(response, { status: statusCode })
  } catch (error) {
    logError('create-subscription_endpoint', error)
    const [response, status] = errorResponse('Error interno del servidor', 'INTERNAL_ERROR')
    return NextResponse.json(response, { status: 500 })
  }
}
