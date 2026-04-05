import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase-server'

const ADMIN_EMAILS = ['legal@mimundomagico.es', 'javierpatoprieto@gmail.com']

async function isAdmin(req: NextRequest): Promise<boolean> {
  try {
    // Check custom header (from admin panel client)
    const emailHeader = req.headers.get('x-admin-email')
    if (emailHeader && ADMIN_EMAILS.includes(emailHeader)) return true
    // Also allow service role (server-to-server)
    const authHeader = req.headers.get('authorization')
    if (authHeader?.includes('service_role')) return true
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
