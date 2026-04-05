'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth, useProfile, useChildProfiles } from '@/lib/hooks/useAuth'
import { supabase } from '@/lib/supabase'
import { StoryCard } from '@/components/StoryCard'
import { ChildProfileForm } from '@/components/ChildProfile'
import { Navbar } from '@/components/Navbar'
import { Button } from '@/components/ui/Button'
import { CLASSIC_STORIES } from '@/lib/stories'
import { cn } from '@/lib/utils'
import { Plus, Wand2, BookOpen, Heart, Sparkles, Star } from 'lucide-react'
import Link from 'next/link'

interface UserStoryRow {
  id: string
  story_id: string
  is_favorite: boolean
  progress: number
  audio_url: string | null
}

interface AiStory {
  id: string
  title: string
  cover_emoji: string
  theme: string
  created_at: string
  userStoryId: string
  is_favorite: boolean
  progress: number
  audio_url: string | null
}

function LibraryContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user, loading: authLoading } = useAuth()
  const { profile } = useProfile(user?.id)
  const { profiles: childProfiles, loading: profilesLoading, refetch } = useChildProfiles(user?.id)

  const [selectedChild, setSelectedChild] = useState<string | null>(null)
  const [showCreateChild, setShowCreateChild] = useState(false)
  const [userStories, setUserStories] = useState<UserStoryRow[]>([])
  const [aiStories, setAiStories] = useState<AiStory[]>([])
  const [activeTab, setActiveTab] = useState<'classics' | 'personalized' | 'favorites'>('classics')
  const [premiumSuccess, setPremiumSuccess] = useState(false)

  useEffect(() => {
    if (!authLoading && !user) router.push('/login')
  }, [authLoading, user, router])

  useEffect(() => {
    try {
      if (searchParams.get('premium') === 'success') setPremiumSuccess(true)
    } catch { /* ignore */ }
  }, [searchParams])

  useEffect(() => {
    if (childProfiles.length > 0 && !selectedChild) {
      setSelectedChild(childProfiles[0].id)
    }
  }, [childProfiles, selectedChild])

  useEffect(() => {
    if (!user?.id || !selectedChild) return

    const loadStories = async () => {
      // Load classic user_stories
      const { data: us } = await supabase
        .from('user_stories')
        .select('id, story_id, is_favorite, progress, audio_url')
        .eq('user_id', user.id)
        .eq('child_profile_id', selectedChild)

      setUserStories(us || [])

      // Load AI-generated stories
      const { data: aiUs } = await supabase
        .from('user_stories')
        .select('id, story_id, is_favorite, progress, audio_url, stories(id, title, cover_emoji, theme, created_at, is_ai_generated)')
        .eq('user_id', user.id)
        .eq('child_profile_id', selectedChild)

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const aiList: AiStory[] = (aiUs || [] as any[])
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .filter((row: any) => row.stories?.is_ai_generated)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .map((row: any) => ({
          id: row.stories.id,
          title: row.stories.title,
          cover_emoji: row.stories.cover_emoji,
          theme: row.stories.theme,
          created_at: row.stories.created_at,
          userStoryId: row.id,
          is_favorite: row.is_favorite,
          progress: row.progress,
          audio_url: row.audio_url,
        }))
        .sort((a: AiStory, b: AiStory) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

      setAiStories(aiList)
    }

    loadStories()
  }, [user?.id, selectedChild])

  const toggleFavorite = async (storyId: string) => {
    if (!user?.id || !selectedChild) return
    const existing = userStories.find((s) => s.story_id === storyId)
    const newFav = !existing?.is_favorite
    if (existing) {
      await supabase.from('user_stories').update({ is_favorite: newFav }).eq('id', existing.id)
      setUserStories((prev) => prev.map((s) => s.story_id === storyId ? { ...s, is_favorite: newFav } : s))
    } else {
      await supabase.from('user_stories').insert({ user_id: user.id, child_profile_id: selectedChild, story_id: storyId, is_favorite: true })
      setUserStories((prev) => [...prev, { id: '', story_id: storyId, is_favorite: true, progress: 0, audio_url: null }])
    }
  }


  const activeChild = childProfiles.find((p) => p.id === selectedChild)
  const canUseAI = profile?.is_premium || !profile?.ai_trial_used

  if (authLoading || profilesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-kids">
        <div className="text-center">
          <div className="text-6xl float mb-4">🌟</div>
          <p className="text-violet-600 font-black text-lg">Preparando la magia...</p>
        </div>
      </div>
    )
  }

  if (childProfiles.length === 0 || showCreateChild) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-kids flex items-center justify-center px-4 pt-20">
          <div className="max-w-lg w-full relative z-10">
            <div className="text-center mb-8">
              <div className="text-6xl float mb-3 select-none">✨</div>
              <h1 className="text-3xl font-black font-display text-gray-800 mb-2">
                {childProfiles.length === 0 ? '¡Bienvenido!' : 'Añadir niño/a'}
              </h1>
              <p className="text-gray-500 text-lg">
                {childProfiles.length === 0 ? 'Dinos quién es el protagonista de los cuentos' : 'Añade otro perfil de niño/a'}
              </p>
            </div>
            <div className="bg-white rounded-3xl shadow-2xl shadow-violet-200/50 p-8 border border-violet-100">
              <ChildProfileForm userId={user!.id} onSuccess={() => { refetch(); setShowCreateChild(false) }} />
            </div>
            {showCreateChild && (
              <button onClick={() => setShowCreateChild(false)} className="block text-center text-sm text-gray-400 hover:text-gray-600 mt-4 mx-auto">Cancelar</button>
            )}
          </div>
        </div>
      </>
    )
  }

  const favoriteClassics = CLASSIC_STORIES.filter((s) => userStories.find((us) => us.story_id === s.id && us.is_favorite))
  const favoriteAi = aiStories.filter((s) => s.is_favorite)

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-kids pt-16">
        <div className="max-w-5xl mx-auto px-4 py-8">

          {premiumSuccess && (
            <div className="bg-gradient-to-r from-amber-400 to-yellow-400 text-amber-900 rounded-3xl px-6 py-4 mb-6 flex items-center gap-3 shadow-xl animate-fade-in-up">
              <span className="text-3xl">👑</span>
              <div>
                <p className="font-black text-lg">¡Bienvenido/a a Premium!</p>
                <p className="text-sm opacity-80">Ya puedes crear cuentos mágicos y personalizados ilimitados ✨</p>
              </div>
            </div>
          )}

          {/* Child selector */}
          <div className="flex items-center gap-3 mb-8 flex-wrap">
            {childProfiles.map((child) => (
              <button
                key={child.id}
                onClick={() => setSelectedChild(child.id)}
                className={cn(
                  'flex items-center gap-2 px-5 py-3 rounded-2xl border-3 transition-all tap-target',
                  selectedChild === child.id
                    ? 'border-violet-500 bg-violet-50 shadow-lg shadow-violet-200'
                    : 'border-gray-200 bg-white hover:border-violet-300'
                )}
              >
                <span className="w-9 h-9 rounded-full text-xl flex items-center justify-center shadow-sm" style={{ backgroundColor: child.avatar_color }}>
                  {child.avatar_emoji}
                </span>
                <span className={cn('font-black text-base font-display', selectedChild === child.id ? 'text-violet-700' : 'text-gray-700')}>
                  {child.name}
                </span>
              </button>
            ))}
            <button
              onClick={() => setShowCreateChild(true)}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl border-3 border-dashed border-gray-300 text-gray-400 hover:border-violet-400 hover:text-violet-500 transition-all tap-target"
            >
              <Plus size={18} />
              <span className="text-sm font-black">Añadir</span>
            </button>
          </div>

          {/* Hero greeting */}
          {activeChild && (
            <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-pink-500 rounded-3xl p-6 mb-8 text-white shadow-2xl shadow-violet-300/40 relative overflow-hidden">
              <div className="relative flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl shadow-xl ring-4 ring-white/30" style={{ backgroundColor: activeChild.avatar_color }}>
                    {activeChild.avatar_emoji}
                  </div>
                  <div>
                    <p className="text-white/70 text-sm font-bold">Biblioteca mágica de</p>
                    <h2 className="text-3xl font-black font-display">{activeChild.name} ✨</h2>
                  </div>
                </div>
                <div className="flex gap-2">
                  {canUseAI ? (
                    <Link href="/create">
                      <Button variant="premium" size="sm" className="font-black">
                        <Wand2 size={16} />
                        {profile?.is_premium ? 'Crear cuento mágico' : '✨ Cuento gratis'}
                      </Button>
                    </Link>
                  ) : (
                    <Link href="/premium">
                      <Button variant="premium" size="sm" className="font-black">
                        <Star size={14} fill="currentColor" />Hazte Premium
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Free trial banner */}
          {!profile?.is_premium && !profile?.ai_trial_used && (
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 rounded-3xl p-5 mb-6 flex items-center gap-4">
              <span className="text-4xl float">🎁</span>
              <div className="flex-1">
                <p className="font-black text-gray-800 text-lg">¡Tu cuento personalizado GRATIS te espera!</p>
                <p className="text-gray-600 text-sm">Un cuento único para {activeChild?.name} — completamente gratis. ✨</p>
              </div>
              <Link href="/create">
                <Button size="sm" className="font-black bg-amber-500 hover:bg-amber-600 border-0 whitespace-nowrap">¡Crear ahora! ✨</Button>
              </Link>
            </div>
          )}

          {/* Tabs */}
          <div className="flex gap-3 mb-6 flex-wrap">
            {[
              { key: 'classics', label: 'Clásicos', icon: <BookOpen size={16} />, count: CLASSIC_STORIES.length },
              { key: 'personalized', label: 'Personalizados', icon: <Wand2 size={16} />, count: aiStories.length },
              { key: 'favorites', label: 'Favoritos', icon: <Heart size={16} />, count: favoriteClassics.length + favoriteAi.length },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as typeof activeTab)}
                className={cn(
                  'flex items-center gap-2 px-5 py-3 rounded-2xl font-black text-sm transition-all tap-target',
                  activeTab === tab.key
                    ? 'bg-violet-600 text-white shadow-lg shadow-violet-300'
                    : 'bg-white text-gray-600 hover:bg-violet-50 border-2 border-gray-200'
                )}
              >
                {tab.icon}{tab.label}
                <span className={cn('text-xs px-2 py-0.5 rounded-full font-black', activeTab === tab.key ? 'bg-white/20' : 'bg-gray-100')}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* CLASSICS TAB */}
          {activeTab === 'classics' && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {CLASSIC_STORIES.map((story) => {
                const us = userStories.find((u) => u.story_id === story.id)
                return (
                  <StoryCard
                    key={story.id}
                    id={story.id}
                    slug={story.slug}
                    title={story.title}
                    coverEmoji={story.coverEmoji}
                    theme={story.theme}
                    readingTime={story.readingTimeMinutes}
                    isPremium={story.isPremium}
                    isFavorite={us?.is_favorite}
                    childName={activeChild?.name}
                    progress={us?.progress}
                    onFavoriteToggle={toggleFavorite}
                    userPremium={profile?.is_premium}
                  />
                )
              })}
            </div>
          )}

          {/* PERSONALIZED TAB */}
          {activeTab === 'personalized' && (
            <div>
              {aiStories.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-3xl border-3 border-dashed border-violet-200">
                  <div className="text-7xl mb-4">🪄</div>
                  <p className="text-gray-700 font-black text-xl mb-2">Aún no hay cuentos personalizados</p>
                  <p className="text-gray-400 text-sm mb-6">Crea el primero ahora — único e irrepetible para {activeChild?.name}</p>
                  {canUseAI ? (
                    <Link href="/create">
                      <Button className="font-black">
                        <Wand2 size={16} />Crear mi primer cuento
                      </Button>
                    </Link>
                  ) : (
                    <Link href="/premium">
                      <Button variant="premium" className="font-black">
                        <Star size={14} fill="currentColor" />Ver Premium
                      </Button>
                    </Link>
                  )}
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-5">
                    <p className="text-gray-500 text-sm font-bold">{aiStories.length} cuento{aiStories.length !== 1 ? 's' : ''} único{aiStories.length !== 1 ? 's' : ''} de {activeChild?.name}</p>
                    {canUseAI && (
                      <Link href="/create">
                        <Button size="sm" variant="premium" className="font-black">
                          <Wand2 size={14} />Crear otro
                        </Button>
                      </Link>
                    )}
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {aiStories.map((story) => (
                      <Link key={story.id} href={`/story/${story.id}?ai=true`}>
                        <div className="bg-white rounded-3xl overflow-hidden border-2 border-violet-100 hover:-translate-y-1 transition-all shadow-sm hover:shadow-lg group cursor-pointer">
                          <div className="bg-gradient-to-br from-violet-500 to-purple-600 h-32 flex items-center justify-center relative">
                            <span className="text-6xl">{story.cover_emoji}</span>
                            <span className="absolute top-2 right-2 bg-amber-400 text-amber-900 text-xs font-black px-2 py-0.5 rounded-full">✨ Único</span>
                            {story.audio_url && (
                              <span className="absolute bottom-2 right-2 bg-white/20 text-white text-xs font-black px-2 py-0.5 rounded-full">🔊</span>
                            )}
                            {story.progress > 0 && story.progress < 100 && (
                              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                                <div className="h-full bg-white rounded-full" style={{ width: `${story.progress}%` }} />
                              </div>
                            )}
                          </div>
                          <div className="p-3">
                            <p className="font-black text-sm text-gray-800 leading-tight line-clamp-2">{story.title}</p>
                            <p className="text-xs text-gray-400 mt-1">{story.theme} · {new Date(story.created_at).toLocaleDateString('es-ES')}</p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* FAVORITES TAB */}
          {activeTab === 'favorites' && (
            <div className="space-y-8">
              {favoriteClassics.length === 0 && favoriteAi.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-3xl border-3 border-dashed border-gray-200">
                  <div className="text-6xl mb-4">💫</div>
                  <p className="text-gray-600 font-black text-lg">Aún no hay favoritos</p>
                  <p className="text-gray-400 text-sm mt-2">Toca el ❤️ en cualquier cuento para guardarlo aquí</p>
                </div>
              ) : (
                <>
                  {favoriteClassics.length > 0 && (
                    <div>
                      <h3 className="font-black text-gray-700 mb-4 flex items-center gap-2"><BookOpen size={16} className="text-violet-500" />Clásicos favoritos</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {favoriteClassics.map((story) => {
                          const us = userStories.find((u) => u.story_id === story.id)
                          return (
                            <StoryCard key={story.id} id={story.id} slug={story.slug} title={story.title} coverEmoji={story.coverEmoji} theme={story.theme} readingTime={story.readingTimeMinutes} isPremium={story.isPremium} isFavorite={true} childName={activeChild?.name} progress={us?.progress} onFavoriteToggle={toggleFavorite} userPremium={profile?.is_premium} />
                          )
                        })}
                      </div>
                    </div>
                  )}
                  {favoriteAi.length > 0 && (
                    <div>
                      <h3 className="font-black text-gray-700 mb-4 flex items-center gap-2"><Wand2 size={16} className="text-violet-500" />Personalizados favoritos</h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {favoriteAi.map((story) => (
                          <Link key={story.id} href={`/story/${story.id}?ai=true`}>
                            <div className="bg-white rounded-3xl overflow-hidden border-2 border-violet-100 hover:-translate-y-1 transition-all shadow-sm hover:shadow-lg cursor-pointer">
                              <div className="bg-gradient-to-br from-violet-500 to-purple-600 h-32 flex items-center justify-center">
                                <span className="text-6xl">{story.cover_emoji}</span>
                              </div>
                              <div className="p-3">
                                <p className="font-black text-sm text-gray-800 leading-tight line-clamp-2">{story.title}</p>
                                <p className="text-xs text-gray-400 mt-1">{story.theme}</p>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* Premium upsell */}
          {!profile?.is_premium && activeTab !== 'personalized' && (
            <div className="mt-10 bg-gradient-to-br from-violet-600 via-purple-600 to-pink-500 rounded-3xl p-8 text-white text-center shadow-2xl shadow-violet-300/40">
              <div className="text-5xl mb-4">✨</div>
              <h3 className="font-black text-white font-display text-2xl mb-3">Desbloquea cuentos únicos para {activeChild?.name}</h3>
              <p className="text-white/80 text-base mb-6 max-w-md mx-auto leading-relaxed">
                Con Premium, crea cuentos donde <strong>{activeChild?.name}</strong> es el héroe, con sus amigos, su mascota y su comida favorita. ¡Infinitas aventuras!
              </p>
              <Link href="/premium">
                <Button className="bg-white text-violet-700 hover:bg-violet-50 font-black text-base px-8 py-4 rounded-2xl shadow-xl">
                  <Sparkles size={18} />Ver Premium — 2,99€/mes
                </Button>
              </Link>
            </div>
          )}

        </div>
      </div>
    </>
  )
}

export default function LibraryPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-kids">
        <div className="text-center">
          <div className="text-6xl float mb-4">🌟</div>
          <p className="text-violet-600 font-black text-lg">Cargando...</p>
        </div>
      </div>
    }>
      <LibraryContent />
    </Suspense>
  )
}
