export interface ChildProfile {
  id: string
  user_id: string
  name: string
  age: number
  interests: string[]
  friends: string[]
  pet_name: string | null
  favorite_foods: string[]
  avatar_emoji: string
  created_at: string
  updated_at: string
}

export interface Story {
  id: string
  profile_id: string | null
  user_id: string
  title: string
  content: string | null
  is_classic: boolean
  classic_slug: string | null
  is_premium: boolean
  is_favorite: boolean
  cover_emoji: string
  created_at: string
}

export interface Subscription {
  id: string
  user_id: string
  plan: 'free' | 'premium'
  started_at: string
  expires_at: string | null
}

export interface ClassicStory {
  id: string
  slug: string
  title: string
  description: string
  emoji: string
  color: string
  readTime: string
  isPremium: boolean
}
