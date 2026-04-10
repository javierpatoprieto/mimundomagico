/**
 * POST /api/webhooks/stripe
 * Handles Stripe webhook events
 */

import { NextRequest, NextResponse } from 'next/server'
import { handleStripeWebhook, verifyWebhookSignature } from '@/lib/stripe-service'
import { logOperation, logError } from '@/lib/api-utils'

export async function POST(request: NextRequest) {
  try {
    // Get the raw body for signature verification
    const signature = request.headers.get('stripe-signature')

    if (!signature) {
      logError('webhook_missing_signature', new Error('No signature provided'))
      return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
    }

    const body = await request.text()

    // Verify webhook signature
    let event
    try {
      event = verifyWebhookSignature(body, signature)
    } catch (error) {
      logError('webhook_signature_verification_failed', error)
      return NextResponse.json({ error: 'Invalid signature' }, { status: 403 })
    }

    logOperation('webhook_received', {
      eventId: event.id,
      eventType: event.type,
    })

    // Process the event
    const success = await handleStripeWebhook(event)

    if (!success) {
      logError('webhook_processing_failed', new Error('Failed to process webhook'), {
        eventId: event.id,
        eventType: event.type,
      })
      return NextResponse.json({ error: 'Failed to process event' }, { status: 500 })
    }

    return NextResponse.json({ received: true }, { status: 200 })
  } catch (error) {
    logError('webhook_endpoint_error', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
