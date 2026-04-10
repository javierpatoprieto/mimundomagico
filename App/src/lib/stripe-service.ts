/**
 * Stripe Integration Service
 * Handles subscription creation and payment processing
 */

import Stripe from 'stripe'
import { createServerSupabaseClient } from './supabase-server'
import { logOperation, logError } from './api-utils'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10',
})

export const STRIPE_PLAN_ID = 'price_1Qs0YpJdX0QYJzKq5m3x9y2z' // Replace with actual Stripe price ID
export const MONTHLY_PRICE_EUR = 299 // €2.99 in cents

export interface SubscriptionResult {
  subscriptionId: string
  clientSecret: string
  publishableKey: string
}

/**
 * Create a Stripe subscription for a user
 */
export async function createSubscription(userId: string): Promise<SubscriptionResult> {
  logOperation('createSubscription', { userId })

  try {
    // Get or create Stripe customer
    const customer = await getOrCreateStripeCustomer(userId)

    // Create subscription
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: STRIPE_PLAN_ID }],
      payment_behavior: 'default_incomplete',
      expand: ['latest_invoice.payment_intent'],
    })

    const latestInvoice = subscription.latest_invoice as Stripe.Invoice | null
    const paymentIntent = latestInvoice?.payment_intent as Stripe.PaymentIntent | null
    const clientSecret = paymentIntent?.client_secret || ''

    logOperation('createSubscription_success', {
      subscriptionId: subscription.id,
      customerId: customer.id,
    })

    return {
      subscriptionId: subscription.id,
      clientSecret,
      publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
    }
  } catch (error) {
    logError('createSubscription', error, { userId })
    throw error
  }
}

/**
 * Get or create a Stripe customer for a user
 */
async function getOrCreateStripeCustomer(userId: string): Promise<Stripe.Customer> {
  const supabase = createServerSupabaseClient()

  try {
    // Check if user already has a Stripe customer ID in database
    const { data: user, error: queryError } = await supabase
      .from('users')
      .select('stripe_customer_id')
      .eq('id', userId)
      .single()

    if (queryError && queryError.code !== 'PGRST116') {
      throw queryError
    }

    if (user?.stripe_customer_id) {
      const customer = await stripe.customers.retrieve(user.stripe_customer_id)
      return customer as Stripe.Customer
    }

    // Create new customer
    const { data: authUser } = await supabase.auth.admin.getUserById(userId)
    const customer = await stripe.customers.create({
      email: authUser?.user?.email,
      metadata: {
        supabase_uid: userId,
      },
    })

    // Save customer ID to database
    await supabase.from('users').update({ stripe_customer_id: customer.id }).eq('id', userId)

    return customer
  } catch (error) {
    logError('getOrCreateStripeCustomer', error, { userId })
    throw error
  }
}

/**
 * Handle Stripe webhook events
 */
export async function handleStripeWebhook(event: Stripe.Event): Promise<boolean> {
  logOperation('handleStripeWebhook', { eventType: event.type })

  try {
    const supabase = createServerSupabaseClient()

    switch (event.type) {
      case 'customer.subscription.updated':
      case 'customer.subscription.created': {
        const subscription = event.data.object as Stripe.Subscription
        const customerId = subscription.customer as string

        // Get user ID from Stripe metadata
        const customer = await stripe.customers.retrieve(customerId)
        const userId = customer.metadata?.supabase_uid

        if (userId) {
          const { error } = await supabase.from('subscriptions').upsert({
            user_id: userId,
            plan: 'premium',
            started_at: new Date().toISOString(),
            stripe_subscription_id: subscription.id,
          })

          if (error) throw error
          logOperation('subscription_updated', { userId, subscriptionId: subscription.id })
        }
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        const customerId = subscription.customer as string

        const customer = await stripe.customers.retrieve(customerId)
        const userId = customer.metadata?.supabase_uid

        if (userId) {
          const { error } = await supabase
            .from('subscriptions')
            .update({ plan: 'free', expires_at: new Date().toISOString() })
            .eq('user_id', userId)

          if (error) throw error
          logOperation('subscription_cancelled', { userId })
        }
        break
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice
        logOperation('payment_succeeded', { invoiceId: invoice.id, amount: invoice.amount_paid })
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        logError('payment_failed', new Error('Payment failed'), { invoiceId: invoice.id })
        break
      }

      default:
        logOperation('webhook_unhandled', { eventType: event.type })
    }

    return true
  } catch (error) {
    logError('handleStripeWebhook', error, { eventType: event.type })
    return false
  }
}

/**
 * Verify Stripe webhook signature
 */
export function verifyWebhookSignature(body: string, signature: string): Stripe.Event {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

  try {
    return stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (error) {
    logError('verifyWebhookSignature', error)
    throw error
  }
}
