import { createServerClient } from '@/lib/supabase-server'
import { createClient } from '@supabase/supabase-js'

export interface SiteSetting {
  key: string
  value: string
  label: string
  description: string
  type: 'text' | 'textarea' | 'boolean' | 'number'
  category: string
  sort_order: number
}

// Server-side: read all settings
export async function getAllSettings(): Promise<Record<string, string>> {
  try {
    const supabase = createServerClient()
    const { data } = await supabase.from('site_settings').select('key, value')
    const map: Record<string, string> = {}
    for (const row of data || []) map[row.key] = row.value
    return map
  } catch {
    return {}
  }
}

// Server-side: get single setting
export async function getSetting(key: string, fallback = ''): Promise<string> {
  const all = await getAllSettings()
  return all[key] ?? fallback
}

// Client-side: read settings (public)
export async function getSettingsClient(): Promise<Record<string, string>> {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    const { data } = await supabase.from('site_settings').select('key, value')
    const map: Record<string, string> = {}
    for (const row of data || []) map[row.key] = row.value
    return map
  } catch {
    return {}
  }
}

// Admin: update setting (uses service role)
export async function updateSetting(key: string, value: string): Promise<void> {
  const supabase = createServerClient()
  await supabase
    .from('site_settings')
    .update({ value, updated_at: new Date().toISOString() })
    .eq('key', key)
}
