import { createClient, type SupabaseClient } from '@supabase/supabase-js'

// Lazy singleton — deferred so Next.js build doesn't crash on missing env vars
let _client: SupabaseClient | null = null

export function getSupabaseClient(): SupabaseClient {
  if (!_client) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!url || !key || url === 'your_supabase_project_url') {
      throw new Error(
        'Supabase env vars not set. Copy .env.local and fill in NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.'
      )
    }

    _client = createClient(url, key)
  }
  return _client
}

// Convenience proxy — matches the old `supabase` export shape so existing
// imports (`supabase.from(...)`, `supabase.auth.*`) continue to work without
// any changes across the codebase.
export const supabase = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    return (getSupabaseClient() as unknown as Record<string | symbol, unknown>)[prop]
  },
})

export type Database = {
  public: {
    Tables: {
      child_profiles: {
        Row: {
          id: string
          user_id: string
          name: string
          age: number | null
          avatar_emoji: string
          avatar_color: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          age?: number | null
          avatar_emoji?: string
          avatar_color?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          age?: number | null
          avatar_emoji?: string
          avatar_color?: string
          created_at?: string
        }
      }
      stories: {
        Row: {
          id: string
          title: string
          slug: string
          content_template: string
          cover_emoji: string
          theme: string
          is_premium: boolean
          is_ai_generated: boolean
          created_at: string
        }
      }
      user_stories: {
        Row: {
          id: string
          user_id: string
          child_profile_id: string
          story_id: string
          custom_content: string | null
          audio_url: string | null
          is_favorite: boolean
          progress: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          child_profile_id: string
          story_id: string
          custom_content?: string | null
          audio_url?: string | null
          is_favorite?: boolean
          progress?: number
          created_at?: string
        }
        Update: {
          is_favorite?: boolean
          progress?: number
          custom_content?: string | null
          audio_url?: string | null
        }
      }
      profiles: {
        Row: {
          id: string
          email: string
          is_premium: boolean
          stripe_customer_id: string | null
          created_at: string
        }
        Insert: {
          id: string
          email?: string
          is_premium?: boolean
          stripe_customer_id?: string | null
          created_at?: string
        }
        Update: {
          email?: string
          is_premium?: boolean
          stripe_customer_id?: string | null
        }
      }
    }
  }
}
