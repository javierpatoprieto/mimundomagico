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

        // Pre-generate audio for classic stories in background (fire and forget)
        preGenerateClassicAudio(userId, supabaseAdmin).catch(console.error)
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

// Pre-generate audio for all classic stories when user goes Premium
async function preGenerateClassicAudio(
  userId: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  supabaseAdmin: any
) {
  const CLASSIC_STORY_IDS = [
    '00000000-0000-0000-0000-000000000001',
    '00000000-0000-0000-0000-000000000002',
    '00000000-0000-0000-0000-000000000003',
    '00000000-0000-0000-0000-000000000004',
    '00000000-0000-0000-0000-000000000005',
    '00000000-0000-0000-0000-000000000006',
    '00000000-0000-0000-0000-000000000007',
  ]

  // Get child profile
  const { data: childProfiles } = await supabaseAdmin
    .from('child_profiles')
    .select('id, name')
    .eq('user_id', userId)
    .limit(1)

  if (!childProfiles?.length) return
  const child = childProfiles[0]

  for (const storyId of CLASSIC_STORY_IDS) {
    try {
      // Get or create user_story
      const { data: existing } = await supabaseAdmin
        .from('user_stories')
        .select('id, audio_url')
        .eq('user_id', userId)
        .eq('story_id', storyId)
        .maybeSingle()

      if (existing?.audio_url) continue // already has audio

      let userStoryId = existing?.id

      if (!userStoryId) {
        const { data: story } = await supabaseAdmin
          .from('stories')
          .select('content_template')
          .eq('id', storyId)
          .single()

        const { data: created } = await supabaseAdmin
          .from('user_stories')
          .insert({
            user_id: userId,
            child_profile_id: child.id,
            story_id: storyId,
            custom_content: (story?.content_template || '').replace(/\{childName\}/g, child.name),
          })
          .select('id')
          .single()

        userStoryId = created?.id
      }

      if (!userStoryId) continue

      // Call narrate API
      const { data: story } = await supabaseAdmin
        .from('stories')
        .select('content_template')
        .eq('id', storyId)
        .single()

      if (!story?.content_template) continue

      const text = story.content_template
        .replace(/\{childName\}/g, child.name)
        .replace(/[^\x00-\xFF]/g, '')
        .substring(0, 4500)

      const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://mimundomagico.es'
      await fetch(`${appUrl}/api/stories/narrate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userStoryId, text }),
      })

      // Small delay between requests to avoid rate limits
      await new Promise(r => setTimeout(r, 2000))
    } catch (err) {
      console.error(`[webhook] audio pre-gen error for story ${storyId}:`, err)
    }
  }
}
