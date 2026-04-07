import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// Verify the calling user owns the profile
async function verifyOwnership(profileId: string, userId: string): Promise<boolean> {
  const { data } = await supabaseAdmin
    .from('child_profiles')
    .select('id')
    .eq('id', profileId)
    .eq('user_id', userId)
    .single()
  return !!data
}

// Helper: get userId from Supabase JWT in Authorization header
async function getUserId(req: NextRequest): Promise<string | null> {
  const authHeader = req.headers.get('authorization')
  if (!authHeader?.startsWith('Bearer ')) return null
  const token = authHeader.slice(7)
  const { data: { user }, error } = await supabaseAdmin.auth.getUser(token)
  if (error || !user) return null
  return user.id
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const userId = await getUserId(req)
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const owns = await verifyOwnership(params.id, userId)
  if (!owns) {
    return NextResponse.json({ error: 'Not found or forbidden' }, { status: 403 })
  }

  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  // Only allow updating safe fields
  const allowed = ['name', 'age', 'avatar_emoji', 'avatar_color', 'gender',
    'favorite_themes', 'favorite_colors', 'best_friend_name', 'pet_name', 'favorite_food']
  const updates: Record<string, unknown> = {}
  for (const key of allowed) {
    if (key in body) updates[key] = body[key]
  }

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 })
  }

  const { data, error } = await supabaseAdmin
    .from('child_profiles')
    .update(updates)
    .eq('id', params.id)
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ profile: data })
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const userId = await getUserId(req)
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const owns = await verifyOwnership(params.id, userId)
  if (!owns) {
    return NextResponse.json({ error: 'Not found or forbidden' }, { status: 403 })
  }

  // Cascade deletes user_stories due to DB foreign key
  const { error } = await supabaseAdmin
    .from('child_profiles')
    .delete()
    .eq('id', params.id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
