import { NextRequest } from 'next/server'
import { createClient } from '@supabase/supabase-js'

/**
 * Verify the Supabase JWT from the Authorization header.
 * Returns the authenticated user ID or null.
 */
export async function getAuthenticatedUserId(req: NextRequest): Promise<string | null> {
  try {
    const authHeader = req.headers.get('authorization')
    if (!authHeader?.startsWith('Bearer ')) return null

    const token = authHeader.slice(7)

    // Use Supabase to verify the JWT
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const { data: { user }, error } = await supabase.auth.getUser(token)
    if (error || !user) return null

    return user.id
  } catch {
    return null
  }
}

/**
 * Verify admin access using Supabase JWT + email whitelist.
 * Much more secure than trusting a header.
 */
const ADMIN_EMAILS = ['legal@mimundomagico.es', 'javierpatoprieto@gmail.com']

export async function isAdminRequest(req: NextRequest): Promise<boolean> {
  try {
    const authHeader = req.headers.get('authorization')
    if (!authHeader?.startsWith('Bearer ')) return false

    const token = authHeader.slice(7)
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )

    const { data: { user }, error } = await supabase.auth.getUser(token)
    if (error || !user?.email) return false

    return ADMIN_EMAILS.includes(user.email)
  } catch {
    return false
  }
}
