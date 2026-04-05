import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase-server'

const ADMIN_EMAILS = ['legal@mimundomagico.es', 'javierpatoprieto@gmail.com']

async function isAdmin(req: NextRequest): Promise<boolean> {
  try {
    const authHeader = req.headers.get('x-admin-email')
    if (authHeader && ADMIN_EMAILS.includes(authHeader)) return true
    return false
  } catch {
    return false
  }
}

export async function GET(req: NextRequest) {
  const admin = await isAdmin(req)
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const supabase = createServerClient()
  const { data } = await supabase
    .from('site_settings')
    .select('*')
    .order('category')
    .order('sort_order')

  return NextResponse.json({ settings: data || [] })
}

export async function PATCH(req: NextRequest) {
  const admin = await isAdmin(req)
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { key, value } = await req.json()
  if (!key) return NextResponse.json({ error: 'key required' }, { status: 400 })

  const supabase = createServerClient()
  const { error } = await supabase
    .from('site_settings')
    .update({ value, updated_at: new Date().toISOString() })
    .eq('key', key)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
