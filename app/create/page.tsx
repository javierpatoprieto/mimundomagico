'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth, useProfile, useChildProfiles } from '@/lib/hooks/useAuth'
import { Navbar } from '@/components/Navbar'
import { Button } from '@/components/ui/Button'
import { FloatingStars } from '@/components/ui/Stars'
import { Wand2, Sparkles, Users } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { isDemoMode, DEMO_STORY_ID } from '@/lib/demo'

const THEMES = [
  { value: 'dinosaurios', label: 'Dinosaurios', emoji: '🦕' },
  { value: 'espacio', label: 'Espacio', emoji: '🚀' },
  { value: 'sirenas', label: 'Sirenas', emoji: '🧜' },
  { value: 'superhéroes', label: 'Superhéroes', emoji: '🦸' },
  { value: 'animales', label: 'Animales', emoji: '🐾' },
  { value: 'magia', label: 'Magia', emoji: '🪄' },
  { value: 'piratas', label: 'Piratas', emoji: '🏴‍☠️' },
  { value: 'hadas', label: 'Hadas', emoji: '🧚' },
  { value: 'robots', label: 'Robots', emoji: '🤖' },
  { value: 'princesas', label: 'Princesas', emoji: '👸' },
  { value: 'océano', label: 'Océano', emoji: '🌊' },
  { value: 'bosque', label: 'Bosque', emoji: '🌲' },
]

export default function CreatePage() {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const { profile } = useProfile(user?.id)
  const { profiles: childProfiles } = useChildProfiles(user?.id)

  const [selectedChild, setSelectedChild] = useState<string>('')
  const [selectedTheme, setSelectedTheme] = useState<string>('')
  const [generating, setGenerating] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!authLoading && !user) router.push('/login')
    if (childProfiles.length > 0 && !selectedChild) {
      // Pre-select based on child's favorite themes
      setSelectedChild(childProfiles[0].id)
    }
  }, [authLoading, user, router, childProfiles, selectedChild])

  // Pre-select theme based on child's preferences
  useEffect(() => {
    if (!selectedChild || selectedTheme) return
    const child = childProfiles.find((c) => c.id === selectedChild)
    if (child?.favorite_themes && child.favorite_themes.length > 0) {
      const firstFav = child.favorite_themes[0]
      const matching = THEMES.find((t) => t.value === firstFav)
      if (matching) setSelectedTheme(matching.value)
    }
  }, [selectedChild, childProfiles, selectedTheme])

  const canUseAI = isDemoMode() || profile?.is_premium || !profile?.ai_trial_used
  const isTrial = isDemoMode() || (!profile?.is_premium && !profile?.ai_trial_used)

  // Paywall — redirect users who can't create
  if (!authLoading && user && profile && !canUseAI) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-b from-violet-950 via-indigo-950 to-purple-950 flex items-center justify-center px-4 pt-16">
          <div className="fixed inset-0 pointer-events-none">
            <FloatingStars count={30} />
          </div>
          <div className="relative z-10 glass rounded-3xl p-10 max-w-md w-full text-center">
            <div className="text-7xl mb-6 float">🔒</div>
            <h2 className="text-3xl font-black font-display text-white mb-4">
              ¡Ya usaste tu cuento mágico!
            </h2>
            <p className="text-white/70 mb-3 text-lg">
              Ya creaste tu cuento personalizado gratis. ¡Esperamos que a{' '}
              <strong className="text-yellow-400">
                {childProfiles[0]?.name ?? 'el/la peque'}
              </strong>{' '}
              le encantó! 🌟
            </p>
            <p className="text-white/50 mb-8">
              Hazte Premium por solo $4,99/mes para crear cuentos únicos y mágicos ilimitados, totalmente personalizados.
            </p>
            <Link href="/premium">
              <Button variant="premium" size="xl" className="w-full mb-4 font-black text-lg py-5">
                <Sparkles size={20} />
                Hazte Premium — $4,99/mes
              </Button>
            </Link>
            <Link href="/library">
              <Button variant="secondary" size="sm" className="w-full">
                Volver a mis cuentos
              </Button>
            </Link>
          </div>
        </div>
      </>
    )
  }

  const handleGenerate = async () => {
    if (!selectedTheme || !selectedChild || !user) return
    setGenerating(true)
    setError('')

    const child = childProfiles.find((c) => c.id === selectedChild)
    if (!child) return

    // Demo mode: fake loading then show pre-written story
    if (isDemoMode()) {
      await new Promise((resolve) => setTimeout(resolve, 2800))
      setGenerating(false)
      router.push(`/story/${DEMO_STORY_ID}?ai=true&demo=true`)
      return
    }

    try {
      const res = await fetch('/api/stories/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: child.name,
          age: child.age ?? 4,
          theme: selectedTheme,
          childProfileId: selectedChild,
          userId: user.id,
          favoriteColors: child.favorite_colors,
          bestFriendName: child.best_friend_name,
          petName: child.pet_name,
          favoriteFood: child.favorite_food,
        }),
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.error || 'Error generando el cuento')

      router.push(`/story/${data.storyId}?ai=true`)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Algo salió mal. Inténtalo de nuevo.')
    } finally {
      setGenerating(false)
    }
  }

  const activeChild = childProfiles.find((c) => c.id === selectedChild)

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-kids pt-16">
        <div className="max-w-2xl mx-auto px-4 py-10">

          {/* Header */}
          <div className="text-center mb-10">
            <div className="text-7xl float mb-4 select-none">🪄</div>
            <h1 className="text-4xl md:text-5xl font-black font-display text-gray-800 mb-3">
              Crea un cuento{' '}
              <span className="gradient-text">único</span>
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed">
              Cuéntanos qué le gusta a{' '}
              <strong className="text-violet-600">{activeChild?.name ?? '...'}</strong>{' '}
              y crearemos un cuento único solo para él/ella ✨
            </p>

            {isTrial && (
              <div className="mt-4 inline-flex items-center gap-2 bg-amber-100 border-2 border-amber-300 text-amber-800 px-5 py-2.5 rounded-2xl font-black text-sm">
                🎁 ¡Estás usando tu cuento personalizado GRATIS!
              </div>
            )}
          </div>

          <div className="bg-white rounded-3xl shadow-2xl shadow-violet-100 p-8 space-y-8 border border-violet-100">

            {/* Child selector */}
            {childProfiles.length > 1 && (
              <div>
                <label className="flex items-center gap-2 text-base font-black text-gray-700 mb-3">
                  <Users size={18} className="text-violet-500" />
                  ¿Para quién es el cuento?
                </label>
                <div className="flex gap-3 flex-wrap">
                  {childProfiles.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => { setSelectedChild(c.id); setSelectedTheme('') }}
                      className={cn(
                        'flex items-center gap-3 px-5 py-3 rounded-2xl border-3 font-black transition-all tap-target',
                        selectedChild === c.id
                          ? 'border-violet-500 bg-violet-50 text-violet-700 shadow-md'
                          : 'border-gray-200 text-gray-600 hover:border-violet-300'
                      )}
                    >
                      <span className="w-8 h-8 rounded-full flex items-center justify-center text-xl" style={{ backgroundColor: c.avatar_color }}>{c.avatar_emoji}</span>
                      {c.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Theme picker */}
            <div>
              <label className="flex items-center gap-2 text-base font-black text-gray-700 mb-3">
                <span className="text-xl">🎭</span>
                Elige el tema de la aventura
              </label>

              {/* Show child's favorites first */}
              {activeChild?.favorite_themes && activeChild.favorite_themes.length > 0 && (
                <div className="mb-3">
                  <p className="text-xs text-violet-500 font-black mb-2 uppercase tracking-wide">
                    ⭐ Los favoritos de {activeChild.name}
                  </p>
                  <div className="flex gap-2 flex-wrap mb-3">
                    {activeChild.favorite_themes.map((themeName) => {
                      const theme = THEMES.find((t) => t.value === themeName)
                      if (!theme) return null
                      return (
                        <button
                          key={theme.value}
                          onClick={() => setSelectedTheme(theme.value)}
                          className={cn(
                            'flex items-center gap-2 px-4 py-2.5 rounded-2xl border-3 font-black text-sm transition-all tap-target',
                            selectedTheme === theme.value
                              ? 'border-violet-500 bg-violet-50 text-violet-700 shadow-md scale-105'
                              : 'border-amber-200 bg-amber-50 text-amber-700 hover:border-violet-300'
                          )}
                        >
                          <span className="text-2xl">{theme.emoji}</span>
                          {theme.label}
                        </button>
                      )
                    })}
                  </div>
                  <p className="text-xs text-gray-400 font-bold mb-2 uppercase tracking-wide">
                    O elige otro tema
                  </p>
                </div>
              )}

              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {THEMES.filter((t) =>
                  !activeChild?.favorite_themes?.includes(t.value)
                ).map((theme) => (
                  <button
                    key={theme.value}
                    onClick={() => setSelectedTheme(theme.value)}
                    className={cn(
                      'flex flex-col items-center gap-2 py-4 rounded-2xl border-3 font-bold transition-all tap-target',
                      selectedTheme === theme.value
                        ? 'border-violet-500 bg-violet-50 text-violet-700 shadow-md scale-105'
                        : 'border-gray-200 text-gray-600 hover:border-violet-300 hover:bg-violet-50'
                    )}
                  >
                    <span className="text-4xl">{theme.emoji}</span>
                    <span className="text-xs font-black">{theme.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Personalization summary */}
            {activeChild && (activeChild.best_friend_name || activeChild.pet_name || activeChild.favorite_food) && (
              <div className="bg-violet-50 border-2 border-violet-100 rounded-2xl px-5 py-4">
                <p className="text-sm font-black text-violet-700 mb-2">✨ Incluiremos en el cuento:</p>
                <div className="flex flex-wrap gap-2">
                  {activeChild.best_friend_name && (
                    <span className="text-xs bg-pink-100 text-pink-700 px-3 py-1.5 rounded-full font-bold">
                      👫 {activeChild.best_friend_name}
                    </span>
                  )}
                  {activeChild.pet_name && (
                    <span className="text-xs bg-green-100 text-green-700 px-3 py-1.5 rounded-full font-bold">
                      🐾 {activeChild.pet_name}
                    </span>
                  )}
                  {activeChild.favorite_food && (
                    <span className="text-xs bg-orange-100 text-orange-700 px-3 py-1.5 rounded-full font-bold">
                      🍕 {activeChild.favorite_food}
                    </span>
                  )}
                </div>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border-2 border-red-200 rounded-2xl px-5 py-4 text-red-600 font-bold">
                ❌ {error}
              </div>
            )}

            <Button
              onClick={handleGenerate}
              loading={generating}
              disabled={!selectedTheme || !selectedChild}
              size="xl"
              className="w-full font-black text-lg py-5 shadow-xl shadow-violet-300/40"
            >
              {generating ? (
                <>✨ Creando la magia...</>
              ) : (
                <>
                  <Wand2 size={24} />
                  ¡Crear mi cuento mágico!
                </>
              )}
            </Button>

            {generating && (
              <div className="text-center space-y-2">
                <p className="text-violet-500 font-black text-base animate-pulse">
                  🌟 Creando una historia especial para {activeChild?.name}...
                </p>
                <p className="text-violet-400 text-sm animate-pulse" style={{ animationDelay: '0.5s' }}>
                  Tejiendo la magia con todos sus personajes favoritos ✨
                </p>
                <p className="text-violet-300 text-xs animate-pulse" style={{ animationDelay: '1s' }}>
                  Un momento, esto merece la pena 🪄
                </p>
              </div>
            )}

            {/* Audio teaser */}
            <div className="bg-pink-50 border-2 border-pink-100 rounded-2xl px-5 py-4 text-center">
              <p className="text-sm font-black text-pink-600">
                🔊 <strong>Próximamente:</strong> Los cuentos se narrarán solos en voz alta
              </p>
              <p className="text-xs text-pink-400 mt-1 font-bold">Narración de audio — Fase 2</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
