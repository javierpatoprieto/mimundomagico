import { NextRequest, NextResponse } from 'next/server'
import { createCheckoutSession } from '@/lib/stripe'
import { createServerClient } from '@/lib/supabase-server'
import { getAuthenticatedUserId } from '@/lib/auth-server'

export async function POST(req: NextRequest) {
  try {
    // Verify JWT — never trust userId from body
    const authUserId = await getAuthenticatedUserId(req)
    if (!authUserId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { email } = await req.json()
    const userId = authUserId

    if (!email) {
      return NextResponse.json({ error: 'Missing email' }, { status: 400 })
    }

    const supabaseAdmin = createServerClient()
    const { data: profile } = await supabaseAdmin
      .from('profiles')
      .select('stripe_customer_id')
      .eq('id', userId)
      .single()

    const session = await createCheckoutSession({
      userId,
      email,
      customerId: profile?.stripe_customer_id ?? undefined,
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('[stripe/checkout]', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
