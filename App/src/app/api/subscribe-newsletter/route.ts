/**
 * POST /api/subscribe-newsletter
 * Subscribes an email to the Brevo newsletter
 */

import { NextRequest, NextResponse } from 'next/server'
import { subscribeToNewsletter } from '@/lib/brevo-service'
import {
  errorResponse,
  successResponse,
  sanitizeString,
  validateEmail,
  logOperation,
  logError,
} from '@/lib/api-utils'

interface RequestBody {
  email: string
  firstName?: string
  lastName?: string
}

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body: RequestBody = await request.json()

    // Validate email
    if (!body.email || !validateEmail(body.email)) {
      const [response, status] = errorResponse('Email inválido', 'INVALID_EMAIL')
      return NextResponse.json(response, { status: 400 })
    }

    // Sanitize inputs
    const email = sanitizeString(body.email.toLowerCase(), 255)
    const firstName = body.firstName ? sanitizeString(body.firstName, 100) : ''
    const lastName = body.lastName ? sanitizeString(body.lastName, 100) : ''

    logOperation('subscribe-newsletter_request', {
      email,
      hasFirstName: !!firstName,
      hasLastName: !!lastName,
    })

    // Subscribe to Brevo
    try {
      await subscribeToNewsletter({
        email,
        firstName,
        lastName,
      })
    } catch (brevoError) {
      logError('brevo_subscription_failed', brevoError, { email })

      // Check if error is about invalid email
      if (brevoError instanceof Error && brevoError.message.includes('Email inválido')) {
        const [response, status] = errorResponse('Email inválido', 'INVALID_EMAIL')
        return NextResponse.json(response, { status: 400 })
      }

      const [response, status] = errorResponse(
        'Error al suscribirse. Por favor, intenta de nuevo.',
        'SUBSCRIPTION_ERROR'
      )
      return NextResponse.json(response, { status: 500 })
    }

    logOperation('subscribe-newsletter_success', { email })

    const [response, statusCode] = successResponse(
      {
        message: 'Suscrito correctamente. Revisa tu email para confirmar.',
        email,
      },
      201
    )

    return NextResponse.json(response, { status: statusCode })
  } catch (error) {
    logError('subscribe-newsletter_endpoint', error)

    // Check if it's a JSON parsing error
    if (error instanceof SyntaxError) {
      const [response, status] = errorResponse('Formato de request inválido', 'INVALID_REQUEST')
      return NextResponse.json(response, { status: 400 })
    }

    const [response, status] = errorResponse('Error interno del servidor', 'INTERNAL_ERROR')
    return NextResponse.json(response, { status: 500 })
  }
}
