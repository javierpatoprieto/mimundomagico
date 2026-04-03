'use client'

export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useAuth, useProfile, useChildProfiles } from '@/lib/hooks/useAuth'
import { supabase } from '@/lib/supabase'
import { StoryReader } from '@/components/StoryReader'
import { getStoryBySlug, personalizeStory } from '@/lib/stories'
import { Suspense } from 'react'
import { isDemoMode, getDemoPersonalizedStory, DEMO_STORY_ID, getDemoChildProfile } from '@/lib/demo'

function StoryContent() {
  const { id } = useParams<{ id: string }>()
  const searchParams = useSearchParams()
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const { profile } = useProfile(user?.id)
  const { profiles: childProfiles } = useChildProfiles(user?.id)

  const [isFavorite, setIsFavorite] = useState(false)
  const [userStoryId, setUserStoryId] = useState<string | null>(null)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [aiContent, setAiContent] = useState<string | null>(null)
  const [aiTitle, setAiTitle] = useState<string | null>(null)
  const [aiEmoji, setAiEmoji] = useState<string | null>(null)
  const [loadingAi, setLoadingAi] = useState(false)

  const isAiStory = searchParams.get('ai') === 'true'
  const isDemoStory = isDemoMode() && id === DEMO_STORY_ID
  const story = !isAiStory ? getStoryBySlug(id as string) : null
  const activeChild = isDemoMode() ? getDemoChildProfile() : childProfiles[0]

  useEffect(() => {
    if (!authLoading && !user) router.push('/login')
  }, [authLoading, user, router])

  // Load AI story content from DB (or demo)
  useEffect(() => {
    if (!isAiStory || !id) return

    // Demo story: use pre-written content
    if (isDemoStory) {
      const demo = getDemoPersonalizedStory()
      setAiContent(demo.content)
      setAiTitle(demo.title)
      setAiEmoji(demo.coverEmoji)
      return
    }

    if (!user?.id) return
    if (!id.match(/^[0-9a-f-]+$/i)) return // not a UUID

    setLoadingAi(true)
    supabase
      .from('stories')
      .select('title, content_template, cover_emoji')
      .eq('id', id)
      .single()
      .then(({ data }) => {
        if (data) {
          setAiContent(data.content_template)
          setAiTitle(data.title)
          setAiEmoji(data.cover_emoji)
        }
        setLoadingAi(false)
      })
  }, [isAiStory, isDemoStory, user?.id, id])

  useEffect(() => {
    // Demo mode: skip all Supabase calls for story progress
    if (isDemoMode()) return

    if (!user?.id || !activeChild) return

    // For classic stories
    if (story) {
      const fetchOrCreate = async () => {
        const { data: existing } = await supabase
          .from('user_stories')
          .select('id, is_favorite, audio_url')
          .eq('user_id', user.id)
          .eq('story_id', story.id)
          .eq('child_profile_id', activeChild.id)
          .single()

        if (existing) {
          setIsFavorite(existing.is_favorite)
          setUserStoryId(existing.id)
          setAudioUrl(existing.audio_url)
        } else {
          const { data: created } = await supabase
            .from('user_stories')
            .insert({
              user_id: user.id,
              child_profile_id: activeChild.id,
              story_id: story.id,
              custom_content: personalizeStory(story.template, activeChild.name),
            })
            .select('id')
            .single()

          if (created) setUserStoryId(created.id)
        }
      }

      fetchOrCreate()
    }

    // For AI stories
    if (isAiStory && id) {
      supabase
        .from('user_stories')
        .select('id, is_favorite, audio_url')
        .eq('user_id', user.id)
        .eq('story_id', id)
        .single()
        .then(({ data }) => {
          if (data) {
            setIsFavorite(data.is_favorite)
            setUserStoryId(data.id)
            setAudioUrl(data.audio_url)
          }
        })
    }
  }, [user?.id, activeChild, story, isAiStory, id])

  const handleFavoriteToggle = async () => {
    if (!user?.id || !userStoryId) return
    const newFav = !isFavorite
    setIsFavorite(newFav)
    await supabase
      .from('user_stories')
      .update({ is_favorite: newFav })
      .eq('id', userStoryId)
  }

  const handleProgressUpdate = async (progress: number) => {
    if (!userStoryId) return
    await supabase
      .from('user_stories')
      .update({ progress })
      .eq('id', userStoryId)
  }

  const isLoading = authLoading || loadingAi || (!story && isAiStory && !aiContent) || !activeChild

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-kids">
        <div className="text-center">
          <div className="text-7xl float mb-6">📖</div>
          <p className="text-violet-600 font-black text-xl">Abriendo el libro mágico...</p>
          {isAiStory && (
            <p className="text-violet-400 text-base mt-2 animate-pulse font-bold">
              Preparando tu cuento especial ✨
            </p>
          )}
        </div>
      </div>
    )
  }

  if (isAiStory) {
    if (!aiContent || !aiTitle || !aiEmoji || !activeChild) return null

    return (
      <StoryReader
        title={aiTitle}
        content={aiContent}
        coverEmoji={aiEmoji}
        storySlug="personalizado"
        childName={activeChild.name}
        isFavorite={isFavorite}
        isPremium={true}
        userPremium={profile?.is_premium}
        audioUrl={audioUrl}
        userStoryId={userStoryId ?? undefined}
        onFavoriteToggle={handleFavoriteToggle}
        onProgressUpdate={handleProgressUpdate}
      />
    )
  }

  if (!story || !activeChild) return null

  const personalizedContent = personalizeStory(story.template, activeChild.name)
  const personalizedTitle = story.title.replace('{childName}', activeChild.name)

  return (
    <StoryReader
      title={personalizedTitle}
      content={personalizedContent}
      coverEmoji={story.coverEmoji}
      storySlug={story.slug}
      childName={activeChild.name}
      isFavorite={isFavorite}
      isPremium={story.isPremium}
      userPremium={profile?.is_premium}
      audioUrl={audioUrl}
      userStoryId={userStoryId ?? undefined}
      onFavoriteToggle={handleFavoriteToggle}
      onProgressUpdate={handleProgressUpdate}
    />
  )
}

export default function StoryPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-kids">
        <div className="text-center">
          <div className="text-7xl float mb-6">📖</div>
          <p className="text-violet-600 font-black text-xl">Abriendo el libro...</p>
        </div>
      </div>
    }>
      <StoryContent />
    </Suspense>
  )
}
