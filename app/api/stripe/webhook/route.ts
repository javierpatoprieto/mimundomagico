import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createServerClient } from '@/lib/supabase-server'
import Stripe from 'stripe'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    console.error('[webhook] Invalid signature:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  const supabaseAdmin = createServerClient()

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      const userId = session.metadata?.userId

      if (userId && session.customer) {
        await supabaseAdmin
          .from('profiles')
          .update({
            is_premium: true,
            stripe_customer_id: session.customer as string,
          })
          .eq('id', userId)
      }
      break
    }

    case 'customer.subscription.deleted':
    case 'customer.subscription.paused': {
      const subscription = event.data.object as Stripe.Subscription & { customer: string }
      const customerId = subscription.customer as string

      await supabaseAdmin
        .from('profiles')
        .update({ is_premium: false })
        .eq('stripe_customer_id', customerId)
      break
    }

    case 'customer.subscription.resumed':
    case 'invoice.payment_succeeded': {
      const obj = event.data.object as { customer?: string | null }
      const customerId = obj.customer as string | undefined

      if (customerId) {
        await supabaseAdmin
          .from('profiles')
          .update({ is_premium: true })
          .eq('stripe_customer_id', customerId)
      }
      break
    }

    default:
      // Unhandled event — safe to ignore
      break
  }

  return NextResponse.json({ received: true })
}
