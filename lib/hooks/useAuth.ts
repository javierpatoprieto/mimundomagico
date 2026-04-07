'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'
import { isDemoMode, getDemoUser, getDemoChildProfile, exitDemoMode } from '@/lib/demo'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Demo mode: return mock user without hitting Supabase
    if (isDemoMode()) {
      const demoUser = getDemoUser()
      // Cast demo user as a minimal User-like object
      setUser({ id: demoUser.id, email: demoUser.email } as unknown as User)
      setLoading(false)
      return
    }

    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }

    getUser()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signOut = async () => {
    if (isDemoMode()) {
      exitDemoMode()
      window.location.href = '/'
      return
    }
    await supabase.auth.signOut()
  }

  return { user, loading, signOut }
}

export function useProfile(userId?: string) {
  const [profile, setProfile] = useState<{
    id: string
    email: string
    is_premium: boolean
    ai_trial_used: boolean
    ai_trial_used_at: string | null
    stripe_customer_id: string | null
    created_at: string
  } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userId) {
      setLoading(false)
      return
    }

    // Demo mode: return mock profile
    if (isDemoMode()) {
      setProfile(getDemoUser())
      setLoading(false)
      return
    }

    const fetchProfile = async () => {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      setProfile(data)
      setLoading(false)
    }

    fetchProfile()
  }, [userId])

  return { profile, loading }
}

export interface ChildProfile {
  id: string
  user_id: string
  name: string
  age: number | null
  avatar_emoji: string
  avatar_color: string
  gender: 'niño' | 'niña'
  favorite_themes: string[]
  favorite_colors: string[]
  best_friend_name: string | null
  pet_name: string | null
  favorite_food: string | null
  created_at: string
}

export function useChildProfiles(userId?: string) {
  const [profiles, setProfiles] = useState<ChildProfile[]>([])
  const [loading, setLoading] = useState(true)

  const fetchProfiles = async () => {
    if (!userId) {
      setLoading(false)
      return
    }

    // Demo mode: return mock child profile
    if (isDemoMode()) {
      setProfiles([getDemoChildProfile() as ChildProfile])
      setLoading(false)
      return
    }

    const { data } = await supabase
      .from('child_profiles')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: true })

    setProfiles(data || [])
    setLoading(false)
  }

  useEffect(() => {
    fetchProfiles()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId])

  return { profiles, loading, refetch: fetchProfiles }
}
