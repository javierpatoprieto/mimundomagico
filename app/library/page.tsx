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

function LibraryContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user, loading: authLoading } = useAuth()
  const { profile } = useProfile(user?.id)
  const { profiles: childProfiles, loading: profilesLoading, refetch } = useChildProfiles(user?.id)

  const [selectedChild, setSelectedChild] = useState<string | null>(null)
  const [showCreateChild, setShowCreateChild] = useState(false)
  const [userStories, setUserStories] = useState<
    Array<{ story_id: string; is_favorite: boolean; progress: number; audio_url: string | null }>
  >([])
  const [activeTab, setActiveTab] = useState<'all' | 'favorites'>('all')
  const [premiumSuccess, setPremiumSuccess] = useState(false)

  useEffect(() => {
    if (!authLoading && !user) router.push('/login')
  }, [authLoading, user, router])

  useEffect(() => {
    if (searchParams.get('premium') === 'success') setPremiumSuccess(true)
  }, [searchParams])

  useEffect(() => {
    if (childProfiles.length > 0 && !selectedChild) {
      setSelectedChild(childProfiles[0].id)
    }
  }, [childProfiles, selectedChild])

  useEffect(() => {
    if (!user?.id || !selectedChild) return

    const fetch = async () => {
      const { data } = await supabase
        .from('user_stories')
        .select('story_id, is_favorite, progress, audio_url')
        .eq('user_id', user.id)
        .eq('child_profile_id', selectedChild)

      setUserStories(data || [])
    }

    fetch()
  }, [user?.id, selectedChild])

  const toggleFavorite = async (storyId: string) => {
    if (!user?.id || !selectedChild) return

    const existing = userStories.find((s) => s.story_id === storyId)
    const newFav = !existing?.is_favorite

    if (existing) {
      await supabase
        .from('user_stories')
        .update({ is_favorite: newFav })
        .eq('user_id', user.id)
        .eq('story_id', storyId)
        .eq('child_profile_id', selectedChild)
    } else {
      await supabase.from('user_stories').insert({
        user_id: user.id,
        child_profile_id: selectedChild,
        story_id: storyId,
        is_favorite: true,
      })
    }

    setUserStories((prev) =>
      existing
        ? prev.map((s) => (s.story_id === storyId ? { ...s, is_favorite: newFav } : s))
        : [...prev, { story_id: storyId, is_favorite: true, progress: 0, audio_url: null }]
    )
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
          {/* Floating emojis */}
          <div className="fixed inset-0 pointer-events-none overflow-hidden">
            <span className="absolute text-5xl top-20 left-8 float opacity-20">🦕</span>
            <span className="absolute text-4xl top-32 right-12 float opacity-20" style={{ animationDelay: '1s' }}>🚀</span>
            <span className="absolute text-3xl bottom-40 left-12 float opacity-20" style={{ animationDelay: '2s' }}>✨</span>
          </div>
          <div className="max-w-lg w-full relative z-10">
            <div className="text-center mb-8">
              <div className="text-6xl float mb-3 select-none">✨</div>
              <h1 className="text-3xl font-black font-display text-gray-800 mb-2">
                {childProfiles.length === 0 ? '¡Bienvenido!' : 'Añadir niño/a'}
              </h1>
              <p className="text-gray-500 text-lg">
                {childProfiles.length === 0
                  ? 'Dinos quién es el protagonista de los cuentos'
                  : 'Añade otro perfil de niño/a'}
              </p>
            </div>
            <div className="bg-white rounded-3xl shadow-2xl shadow-violet-200/50 p-8 border border-violet-100">
              <ChildProfileForm
                userId={user!.id}
                onSuccess={() => {
                  refetch()
                  setShowCreateChild(false)
                }}
              />
            </div>
            {showCreateChild && (
              <button
                onClick={() => setShowCreateChild(false)}
                className="block text-center text-sm text-gray-400 hover:text-gray-600 mt-4 mx-auto"
              >
                Cancelar
              </button>
            )}
          </div>
        </div>
      </>
    )
  }

  const filteredStories =
    activeTab === 'favorites'
      ? CLASSIC_STORIES.filter((s) => userStories.find((us) => us.story_id === s.id && us.is_favorite))
      : CLASSIC_STORIES

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
                <span
                  className="w-9 h-9 rounded-full text-xl flex items-center justify-center shadow-sm"
                  style={{ backgroundColor: child.avatar_color }}
                >
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
              {/* Background sparkles */}
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                {['🌟', '✨', '⭐', '💫', '🌟', '✨'].map((s, i) => (
                  <span key={i} className="absolute text-3xl" style={{
                    left: `${10 + i * 15}%`,
                    top: `${20 + (i % 2) * 50}%`,
                    animation: `twinkle ${3 + i}s ease-in-out ${i * 0.6}s infinite`,
                  }}>{s}</span>
                ))}
              </div>
              <div className="relative flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center text-3xl shadow-xl ring-4 ring-white/30"
                    style={{ backgroundColor: activeChild.avatar_color }}
                  >
                    {activeChild.avatar_emoji}
                  </div>
                  <div>
                    <p className="text-white/70 text-sm font-bold">Biblioteca mágica de</p>
                    <h2 className="text-3xl font-black font-display">{activeChild.name} ✨</h2>
                    {activeChild.favorite_themes && activeChild.favorite_themes.length > 0 && (
                      <p className="text-white/60 text-sm mt-1">
                        Le encanta: {activeChild.favorite_themes.slice(0, 3).join(', ')}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  {canUseAI ? (
                    <Link href="/create">
                      <Button variant="premium" size="sm" className="font-black">
                        <Wand2 size={16} />
                        {profile?.is_premium ? 'Crear cuento mágico' : '✨ Cuento personalizado gratis'}
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

          {/* Free AI Trial banner */}
          {!profile?.is_premium && !profile?.ai_trial_used && (
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 rounded-3xl p-5 mb-6 flex items-center gap-4">
              <span className="text-4xl float">🎁</span>
              <div className="flex-1">
                <p className="font-black text-gray-800 text-lg">¡Tu cuento personalizado GRATIS te espera!</p>
                <p className="text-gray-600 text-sm">Un cuento único para {activeChild?.name}, creado especialmente para él/ella — completamente gratis. ✨</p>
              </div>
              <Link href="/create">
                <Button size="sm" className="font-black bg-amber-500 hover:bg-amber-600 border-0 whitespace-nowrap">
                  ¡Crear ahora! ✨
                </Button>
              </Link>
            </div>
          )}

          {/* Tabs */}
          <div className="flex gap-3 mb-6">
            {[
              { key: 'all', label: 'Todos', icon: <BookOpen size={16} /> },
              { key: 'favorites', label: 'Favoritos ❤️', icon: <Heart size={16} /> },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as 'all' | 'favorites')}
                className={cn(
                  'flex items-center gap-2 px-5 py-3 rounded-2xl font-black text-sm transition-all tap-target',
                  activeTab === tab.key
                    ? 'bg-violet-600 text-white shadow-lg shadow-violet-300'
                    : 'bg-white text-gray-600 hover:bg-violet-50 border-2 border-gray-200'
                )}
              >
                {tab.icon}{tab.label}
              </button>
            ))}
          </div>

          {/* Classic stories grid */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-black text-gray-800 font-display text-xl flex items-center gap-2">
                <BookOpen size={20} className="text-violet-500" />
                Cuentos Clásicos
              </h3>
              <span className="text-xs text-gray-400 font-bold bg-gray-100 px-3 py-1 rounded-full">
                {CLASSIC_STORIES.length} cuentos gratis
              </span>
            </div>

            {filteredStories.length === 0 && activeTab === 'favorites' ? (
              <div className="text-center py-16 bg-white rounded-3xl border-3 border-dashed border-gray-200">
                <div className="text-6xl mb-4">💫</div>
                <p className="text-gray-600 font-black text-lg">Aún no hay favoritos</p>
                <p className="text-gray-400 text-sm mt-2">Toca el ❤️ en cualquier cuento para guardarlo aquí</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredStories.map((story) => {
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
          </div>

          {/* Premium upsell */}
          {!profile?.is_premium && (
            <div className="bg-gradient-to-br from-violet-600 via-purple-600 to-pink-500 rounded-3xl p-8 text-white text-center shadow-2xl shadow-violet-300/40 relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                {['🦕', '🚀', '🧜', '🦸', '🪄', '🏴‍☠️'].map((e, i) => (
                  <span key={i} className="absolute text-4xl float" style={{ left: `${10 + i * 16}%`, top: `${20 + (i % 2) * 50}%`, animationDelay: `${i * 0.8}s` }}>{e}</span>
                ))}
              </div>
              <div className="relative">
                <div className="text-5xl mb-4">✨</div>
                <h3 className="font-black text-white font-display text-2xl mb-3">
                  Desbloquea cuentos únicos y mágicos
                </h3>
                <p className="text-white/80 text-base mb-6 max-w-md mx-auto leading-relaxed">
                  Con Premium, crea cuentos únicos donde <strong>{activeChild?.name}</strong> es el héroe, 
                  con sus amigos, su mascota y su comida favorita. ¡Infinitas aventuras! 🌟
                </p>
                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  {['🪄 Cuentos sin límite', '🔊 Audio (Fase 2)', '✨ Solo $4,99/mes', '💫 Cancela cuando quieras'].map(f => (
                    <span key={f} className="text-sm bg-white/20 border border-white/30 px-4 py-2 rounded-full font-bold">{f}</span>
                  ))}
                </div>
                <Link href="/premium">
                  <Button className="bg-white text-violet-700 hover:bg-violet-50 font-black text-base px-8 py-4 rounded-2xl shadow-xl">
                    <Sparkles size={18} />Ver Premium — $4,99/mes
                  </Button>
                </Link>
              </div>
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
