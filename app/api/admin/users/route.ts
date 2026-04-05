import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase-server'
import { isAdminRequest } from '@/lib/auth-server'

export async function GET(req: NextRequest) {
  const admin = await isAdminRequest(req)
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const supabase = createServerClient()

  const { data: profiles } = await supabase
    .from('profiles')
    .select('id, email, is_premium, ai_trial_used, created_at, stripe_customer_id')
    .order('created_at', { ascending: false })

  const { data: children } = await supabase
    .from('child_profiles')
    .select('user_id')

  const { data: userStories } = await supabase
    .from('user_stories')
    .select('user_id')

  const childMap: Record<string, number> = {}
  for (const c of children || []) childMap[c.user_id] = (childMap[c.user_id] || 0) + 1

  const storyMap: Record<string, number> = {}
  for (const s of userStories || []) storyMap[s.user_id] = (storyMap[s.user_id] || 0) + 1

  const users = (profiles || []).map(p => ({
    ...p,
    child_count: childMap[p.id] || 0,
    stories_count: storyMap[p.id] || 0,
  }))

  return NextResponse.json({ users })
}
