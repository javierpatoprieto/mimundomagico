import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-03-25.dahlia' as const,
})

export const PREMIUM_PRICE_ID = process.env.STRIPE_PREMIUM_PRICE_ID!

export async function createCheckoutSession({
  userId,
  email,
  customerId,
}: {
  userId: string
  email: string
  customerId?: string
}) {
  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    customer_email: customerId ? undefined : email,
    payment_method_types: ['card'],
    line_items: [
      {
        price: PREMIUM_PRICE_ID,
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/library?premium=success`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/premium?cancelled=true`,
    metadata: {
      userId,
    },
    subscription_data: {
      metadata: {
        userId,
      },
    },
  })

  return session
}

export async function createPortalSession(customerId: string) {
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
  })
  return session
}
