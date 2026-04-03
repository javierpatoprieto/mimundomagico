import { createClient, type SupabaseClient } from '@supabase/supabase-js'

// Lazy singleton — deferred so Next.js build doesn't crash on missing env vars
let _client: SupabaseClient | null = null

export function getSupabaseClient(): SupabaseClient {
  if (!_client) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ptrpvghhvoaudddqgkyx.supabase.co'
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0cnB2Z2hodm9hdWRkZHFna3l4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUyNDM3OTAsImV4cCI6MjA5MDgxOTc5MH0.N_YURhFVidO7il1o-JHcnMFqf29eGsRIcKXRHVfypHI'
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
