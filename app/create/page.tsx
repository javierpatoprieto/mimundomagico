'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth, useProfile, useChildProfiles } from '@/lib/hooks/useAuth'
import { Navbar } from '@/components/Navbar'
import { Button } from '@/components/ui/Button'
import { FloatingStars } from '@/components/ui/Stars'
import { Sparkles } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { isDemoMode, DEMO_STORY_ID } from '@/lib/demo'
import type { StoryCreationParams } from '@/lib/openai'

// ─── Step config ────────────────────────────────────────────────────────────

const STEP_CONFIG = [
  { icon: '⭐', label: 'El protagonista' },
  { icon: '🌟', label: 'Los amigos' },
  { icon: '✨', label: 'La aventura' },
  { icon: '💫', label: 'Detalles mágicos' },
]

// ─── Option sets ─────────────────────────────────────────────────────────────

const MOODS = [
  { value: 'happy', emoji: '😊', label: 'Alegre' },
  { value: 'brave', emoji: '🦸', label: 'Valiente' },
  { value: 'curious', emoji: '🔍', label: 'Curioso' },
  { value: 'magical', emoji: '🧙', label: 'Mágico' },
  { value: 'adventurous', emoji: '🗺️', label: 'Aventurero' },
]

const CHAR_ROLES = [
  { value: 'mejor amigo', label: '👫 Mejor amigo/a' },
  { value: 'mascota', label: '🐾 Mascota' },
  { value: 'ayudante mágico', label: '🪄 Ayudante mágico' },
  { value: 'familiar', label: '👨‍👩‍👧 Familiar' },
]

const TONES = [
  { value: 'funny', emoji: '😄', label: 'Divertido' },
  { value: 'exciting', emoji: '⚡', label: 'Emocionante' },
  { value: 'calm', emoji: '🌙', label: 'Tranquilo' },
  { value: 'mysterious', emoji: '🔮', label: 'Misterioso' },
  { value: 'tender', emoji: '🥰', label: 'Tierno' },
]

const LENGTHS = [
  { value: 'short' as const, label: 'Cortito', desc: '~200 palabras' },
  { value: 'normal' as const, label: 'Normal', desc: '~400 palabras' },
  { value: 'long' as const, label: 'Largo', desc: '~600 palabras' },
]

const MORALS = [
  { value: 'none', label: 'Ninguna' },
  { value: 'friendship', label: '❤️ La amistad' },
  { value: 'courage', label: '🦁 El valor' },
  { value: 'honesty', label: '🌟 La honestidad' },
  { value: 'creativity', label: '🎨 La creatividad' },
  { value: 'effort', label: '💪 El esfuerzo' },
  { value: 'kindness', label: '🌸 La bondad' },
]

// ─── Default state ────────────────────────────────────────────────────────────

function defaultParams(childName: string): StoryCreationParams {
  return {
    childName,
    childDescription: '',
    childMood: 'adventurous',
    char1Name: '',
    char1Role: 'mejor amigo',
    char1Description: '',
    char2Name: '',
    char2Description: '',
    hasVillain: false,
    villainName: '',
    villainDescription: '',
    scenario: '',
    adventure: '',
    tone: 'exciting',
    length: 'normal',
    magicElement: true,
    favoriteFood: '',
    specialObject: '',
    moral: 'friendship',
    dedication: '',
  }
}

// ─── Reusable sub-components ─────────────────────────────────────────────────

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-sm font-black text-gray-700 mb-2 uppercase tracking-wide">
      {children}
    </label>
  )
}

function MagicInput({
  value,
  onChange,
  placeholder,
  className,
}: {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  className?: string
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={cn(
        'w-full px-4 py-3 rounded-2xl border-2 border-violet-100 bg-white/80 text-gray-800 font-semibold',
        'placeholder:text-gray-400 focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all',
        className
      )}
    />
  )
}

function MagicTextarea({
  value,
  onChange,
  placeholder,
  rows = 3,
}: {
  value: string
  onChange: (v: string) => void
  placeholder?: string
  rows?: number
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className={cn(
        'w-full px-4 py-3 rounded-2xl border-2 border-violet-100 bg-white/80 text-gray-800 font-semibold resize-none',
        'placeholder:text-gray-400 focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all'
      )}
    />
  )
}

function MagicSelect({
  value,
  onChange,
  options,
}: {
  value: string
  onChange: (v: string) => void
  options: { value: string; label: string }[]
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-3 rounded-2xl border-2 border-violet-100 bg-white/80 text-gray-800 font-semibold focus:outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition-all appearance-none cursor-pointer"
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  )
}

function EmojiPicker<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { value: T; emoji: string; label: string }[]
  value: T
  onChange: (v: T) => void
}) {
  return (
    <div className="flex gap-2 flex-wrap">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => onChange(o.value)}
          className={cn(
            'flex flex-col items-center gap-1.5 px-4 py-3 rounded-2xl border-2 font-black transition-all tap-target min-w-[70px]',
            value === o.value
              ? 'border-violet-500 bg-violet-50 text-violet-700 shadow-md scale-105'
              : 'border-gray-200 text-gray-600 hover:border-violet-300 hover:bg-violet-50/50'
          )}
        >
          <span className="text-3xl">{o.emoji}</span>
          <span className="text-xs">{o.label}</span>
        </button>
      ))}
    </div>
  )
}

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean
  onChange: (v: boolean) => void
  label: string
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={cn(
        'flex items-center gap-3 px-5 py-3.5 rounded-2xl border-2 font-black transition-all w-full text-left',
        checked
          ? 'border-violet-500 bg-violet-50 text-violet-700 shadow-sm'
          : 'border-gray-200 text-gray-600 hover:border-violet-300'
      )}
    >
      <div
        className={cn(
          'w-12 h-6 rounded-full transition-all relative flex-shrink-0',
          checked ? 'bg-violet-500' : 'bg-gray-300'
        )}
      >
        <div
          className={cn(
            'absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all',
            checked ? 'left-7' : 'left-1'
          )}
        />
      </div>
      <span>{label}</span>
    </button>
  )
}

// ─── Summary card ─────────────────────────────────────────────────────────────

function SummaryCard({ params }: { params: StoryCreationParams }) {
  const moodLabel = MOODS.find((m) => m.value === params.childMood)?.emoji ?? '✨'
  const toneLabel = TONES.find((t) => t.value === params.tone)?.emoji ?? '⚡'
  const lengthLabel = LENGTHS.find((l) => l.value === params.length)?.label ?? 'Normal'

  return (
    <div className="bg-gradient-to-br from-violet-50 to-purple-50 border-2 border-violet-200 rounded-3xl p-6 space-y-4">
      <h3 className="text-base font-black text-violet-700 uppercase tracking-wide">
        ✨ Resumen de tu cuento
      </h3>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="bg-white rounded-2xl px-3 py-2.5 border border-violet-100">
          <div className="text-xs text-gray-400 font-bold uppercase mb-1">Protagonista</div>
          <div className="font-black text-gray-700">
            {moodLabel} {params.childName}
          </div>
          {params.childDescription && (
            <div className="text-xs text-gray-500 mt-0.5 line-clamp-2">{params.childDescription}</div>
          )}
        </div>

        {params.char1Name && (
          <div className="bg-white rounded-2xl px-3 py-2.5 border border-violet-100">
            <div className="text-xs text-gray-400 font-bold uppercase mb-1">Amigo/a</div>
            <div className="font-black text-gray-700">👫 {params.char1Name}</div>
            <div className="text-xs text-gray-500 mt-0.5">{params.char1Role}</div>
          </div>
        )}

        {params.hasVillain && params.villainName && (
          <div className="bg-white rounded-2xl px-3 py-2.5 border border-red-100">
            <div className="text-xs text-gray-400 font-bold uppercase mb-1">Villano</div>
            <div className="font-black text-gray-700">😈 {params.villainName}</div>
          </div>
        )}

        <div className="bg-white rounded-2xl px-3 py-2.5 border border-violet-100">
          <div className="text-xs text-gray-400 font-bold uppercase mb-1">Tono</div>
          <div className="font-black text-gray-700">
            {toneLabel} {TONES.find((t) => t.value === params.tone)?.label}
          </div>
        </div>

        <div className="bg-white rounded-2xl px-3 py-2.5 border border-violet-100">
          <div className="text-xs text-gray-400 font-bold uppercase mb-1">Longitud</div>
          <div className="font-black text-gray-700">📄 {lengthLabel}</div>
        </div>

        {params.magicElement && (
          <div className="bg-white rounded-2xl px-3 py-2.5 border border-amber-100">
            <div className="font-black text-amber-600 text-xs">✨ Elemento mágico sorpresa</div>
          </div>
        )}
      </div>

      {params.scenario && (
        <div className="bg-white rounded-2xl px-3 py-2.5 border border-violet-100">
          <div className="text-xs text-gray-400 font-bold uppercase mb-1">🗺️ Escenario</div>
          <div className="text-sm font-semibold text-gray-700 line-clamp-2">{params.scenario}</div>
        </div>
      )}

      {params.moral && params.moral !== 'none' && (
        <div className="bg-white rounded-2xl px-3 py-2.5 border border-violet-100">
          <div className="text-xs text-gray-400 font-bold uppercase mb-1">Moraleja</div>
          <div className="text-sm font-black text-gray-700">
            {MORALS.find((m) => m.value === params.moral)?.label}
          </div>
        </div>
      )}

      {params.dedication && (
        <div className="bg-pink-50 rounded-2xl px-3 py-2.5 border border-pink-100 text-center">
          <div className="text-xs text-pink-500 font-bold uppercase mb-1">Dedicado a</div>
          <div className="text-sm font-black text-pink-700">💌 {params.dedication}</div>
        </div>
      )}
    </div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function CreatePage() {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const { profile } = useProfile(user?.id)
  const { profiles: childProfiles } = useChildProfiles(user?.id)

  const [step, setStep] = useState(0)
  const [direction, setDirection] = useState<'forward' | 'back'>('forward')
  const [animating, setAnimating] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [error, setError] = useState('')
  const [selectedChildId, setSelectedChildId] = useState<string>('')
  const [params, setParams] = useState<StoryCreationParams>(defaultParams(''))
  const [hasChar2, setHasChar2] = useState(false)

  const contentRef = useRef<HTMLDivElement>(null)

  // Auth redirect
  useEffect(() => {
    if (!authLoading && !user) router.push('/login')
  }, [authLoading, user, router])

  // Pre-fill child name
  useEffect(() => {
    if (childProfiles.length > 0 && !selectedChildId) {
      const child = childProfiles[0]
      setSelectedChildId(child.id)
      setParams(() => ({
        ...defaultParams(child.name),
        favoriteFood: child.favorite_food ?? '',
        char1Name: child.best_friend_name ?? '',
        char1Role: child.best_friend_name ? 'mejor amigo' : 'mejor amigo',
      }))
    }
  }, [childProfiles, selectedChildId])

  const update = (patch: Partial<StoryCreationParams>) =>
    setParams((prev) => ({ ...prev, ...patch }))

  const goTo = (next: number) => {
    if (animating) return
    setDirection(next > step ? 'forward' : 'back')
    setAnimating(true)
    setTimeout(() => {
      setStep(next)
      setAnimating(false)
      contentRef.current?.scrollTo({ top: 0 })
    }, 220)
  }

  const canUseAI = isDemoMode() || profile?.is_premium || !profile?.ai_trial_used
  const isTrial = isDemoMode() || (!profile?.is_premium && !profile?.ai_trial_used)

  // Paywall
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
              Hazte Premium por solo $4,99/mes para crear cuentos únicos y mágicos ilimitados.
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
    setGenerating(true)
    setError('')

    if (isDemoMode()) {
      await new Promise((resolve) => setTimeout(resolve, 2500))
      setGenerating(false)
      router.push(`/story/${DEMO_STORY_ID}?ai=true&demo=true`)
      return
    }

    try {
      const res = await fetch('/api/stories/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...params,
          userId: user?.id,
          childProfileId: selectedChildId,
          // legacy shape also included for compatibility
          name: params.childName,
          age: childProfiles.find((c) => c.id === selectedChildId)?.age ?? 4,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Error generando el cuento')
      router.push(`/story/${data.storyId}?ai=true`)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Algo salió mal. Inténtalo de nuevo.')
      setGenerating(false)
    }
  }

  // Animation classes
  const slideClass = animating
    ? direction === 'forward'
      ? 'opacity-0 translate-x-4'
      : 'opacity-0 -translate-x-4'
    : 'opacity-100 translate-x-0'

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-kids pt-16">
        <div className="max-w-2xl mx-auto px-4 py-8">

          {/* Header */}
          <div className="text-center mb-6">
            <div className="text-6xl float mb-3 select-none">🪄</div>
            <h1 className="text-3xl md:text-4xl font-black font-display text-gray-800 mb-2">
              Crea un cuento{' '}
              <span className="gradient-text">mágico</span>
            </h1>
            {isTrial && (
              <div className="mt-3 inline-flex items-center gap-2 bg-amber-100 border-2 border-amber-300 text-amber-800 px-5 py-2 rounded-2xl font-black text-sm">
                🎁 ¡Estás usando tu cuento personalizado GRATIS!
              </div>
            )}
          </div>

          {/* Step indicator */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {STEP_CONFIG.map((s, i) => (
              <div key={i} className="flex items-center gap-2">
                <button
                  onClick={() => i < step && goTo(i)}
                  className={cn(
                    'flex flex-col items-center gap-1 transition-all',
                    i < step ? 'cursor-pointer' : 'cursor-default'
                  )}
                >
                  <div
                    className={cn(
                      'w-10 h-10 rounded-full flex items-center justify-center text-lg font-black border-2 transition-all',
                      i === step
                        ? 'border-violet-500 bg-violet-500 text-white shadow-lg scale-110'
                        : i < step
                        ? 'border-violet-300 bg-violet-100 text-violet-600'
                        : 'border-gray-200 bg-white text-gray-400'
                    )}
                  >
                    {i < step ? '✓' : s.icon}
                  </div>
                  <span
                    className={cn(
                      'text-xs font-black hidden sm:block',
                      i === step ? 'text-violet-600' : 'text-gray-400'
                    )}
                  >
                    {s.label}
                  </span>
                </button>
                {i < STEP_CONFIG.length - 1 && (
                  <div
                    className={cn(
                      'w-8 h-0.5 rounded transition-all',
                      i < step ? 'bg-violet-400' : 'bg-gray-200'
                    )}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Card */}
          <div className="bg-white rounded-3xl shadow-2xl shadow-violet-100 border border-violet-100 overflow-hidden">
            <div
              ref={contentRef}
              className={cn(
                'p-6 sm:p-8 space-y-6 transition-all duration-200',
                slideClass
              )}
            >
              {/* ── Step 0: El protagonista ── */}
              {step === 0 && (
                <>
                  <div>
                    <h2 className="text-2xl font-black text-gray-800 mb-1">
                      ⭐ El protagonista
                    </h2>
                    <p className="text-gray-500 text-sm">Cuéntanos sobre el héroe de la historia</p>
                  </div>

                  {/* Child selector */}
                  {childProfiles.length > 1 && (
                    <div>
                      <Label>¿Para quién es el cuento?</Label>
                      <div className="flex gap-3 flex-wrap">
                        {childProfiles.map((c) => (
                          <button
                            key={c.id}
                            onClick={() => {
                              setSelectedChildId(c.id)
                              update({ childName: c.name, favoriteFood: c.favorite_food ?? '' })
                            }}
                            className={cn(
                              'flex items-center gap-2 px-4 py-2.5 rounded-2xl border-2 font-black transition-all tap-target',
                              selectedChildId === c.id
                                ? 'border-violet-500 bg-violet-50 text-violet-700 shadow-md'
                                : 'border-gray-200 text-gray-600 hover:border-violet-300'
                            )}
                          >
                            <span
                              className="w-7 h-7 rounded-full flex items-center justify-center text-lg"
                              style={{ backgroundColor: c.avatar_color }}
                            >
                              {c.avatar_emoji}
                            </span>
                            {c.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <Label>Nombre del protagonista</Label>
                    <MagicInput
                      value={params.childName}
                      onChange={(v) => update({ childName: v })}
                      placeholder="Nombre del peque..."
                    />
                  </div>

                  <div>
                    <Label>¿Cómo es {params.childName || 'el protagonista'}? Descríbelo</Label>
                    <MagicTextarea
                      value={params.childDescription}
                      onChange={(v) => update({ childDescription: v })}
                      placeholder="Es muy valiente, le encantan los dinosaurios, tiene el pelo rizado..."
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label>¿Cómo está hoy?</Label>
                    <EmojiPicker
                      options={MOODS}
                      value={params.childMood}
                      onChange={(v) => update({ childMood: v })}
                    />
                  </div>
                </>
              )}

              {/* ── Step 1: Los amigos ── */}
              {step === 1 && (
                <>
                  <div>
                    <h2 className="text-2xl font-black text-gray-800 mb-1">
                      🌟 Los amigos
                    </h2>
                    <p className="text-gray-500 text-sm">¿Quién acompaña a {params.childName} en la aventura?</p>
                  </div>

                  {/* Char 1 */}
                  <div className="bg-violet-50 rounded-2xl p-5 space-y-3 border-2 border-violet-100">
                    <Label>👫 Personaje 1</Label>
                    <MagicInput
                      value={params.char1Name ?? ''}
                      onChange={(v) => update({ char1Name: v })}
                      placeholder="Nombre del amigo/personaje..."
                    />
                    <MagicSelect
                      value={params.char1Role ?? 'mejor amigo'}
                      onChange={(v) => update({ char1Role: v })}
                      options={CHAR_ROLES}
                    />
                    <MagicTextarea
                      value={params.char1Description ?? ''}
                      onChange={(v) => update({ char1Description: v })}
                      placeholder="Descríbelo: es travieso, lleva una capa azul, sabe volar..."
                      rows={2}
                    />
                  </div>

                  {/* Char 2 toggle */}
                  <Toggle
                    checked={hasChar2}
                    onChange={setHasChar2}
                    label="➕ Añadir un segundo personaje (opcional)"
                  />

                  {hasChar2 && (
                    <div className="bg-pink-50 rounded-2xl p-5 space-y-3 border-2 border-pink-100">
                      <Label>👥 Personaje 2</Label>
                      <MagicInput
                        value={params.char2Name ?? ''}
                        onChange={(v) => update({ char2Name: v })}
                        placeholder="Nombre del segundo personaje..."
                      />
                      <MagicTextarea
                        value={params.char2Description ?? ''}
                        onChange={(v) => update({ char2Description: v })}
                        placeholder="Descríbelo brevemente..."
                        rows={2}
                      />
                    </div>
                  )}

                  {/* Villain */}
                  <Toggle
                    checked={params.hasVillain}
                    onChange={(v) => update({ hasVillain: v })}
                    label="😈 ¿Hay un villano?"
                  />

                  {params.hasVillain && (
                    <div className="bg-red-50 rounded-2xl p-5 space-y-3 border-2 border-red-100">
                      <Label>😈 El villano</Label>
                      <MagicInput
                        value={params.villainName ?? ''}
                        onChange={(v) => update({ villainName: v })}
                        placeholder="Nombre del villano..."
                      />
                      <MagicTextarea
                        value={params.villainDescription ?? ''}
                        onChange={(v) => update({ villainDescription: v })}
                        placeholder="Descríbelo: es un dragón refunfuñón, una bruja olvidadiza, un robot averiado..."
                        rows={2}
                      />
                    </div>
                  )}
                </>
              )}

              {/* ── Step 2: La aventura ── */}
              {step === 2 && (
                <>
                  <div>
                    <h2 className="text-2xl font-black text-gray-800 mb-1">
                      ✨ La aventura
                    </h2>
                    <p className="text-gray-500 text-sm">Diseña la historia que vivirá {params.childName}</p>
                  </div>

                  <div>
                    <Label>🗺️ ¿Dónde ocurre la historia?</Label>
                    <MagicTextarea
                      value={params.scenario}
                      onChange={(v) => update({ scenario: v })}
                      placeholder="En un Starbucks mágico en la cima de una montaña, en el espacio, en una ciudad submarina..."
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label>🌟 ¿Qué aventura vive {params.childName || 'el protagonista'}?</Label>
                    <MagicTextarea
                      value={params.adventure}
                      onChange={(v) => update({ adventure: v })}
                      placeholder="Descubre un mapa del tesoro, encuentra un dragón bebé perdido, tiene que salvar a sus amigos..."
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label>¿Qué tono tiene la historia?</Label>
                    <EmojiPicker
                      options={TONES}
                      value={params.tone}
                      onChange={(v) => update({ tone: v })}
                    />
                  </div>

                  <div>
                    <Label>📄 Longitud del cuento</Label>
                    <div className="flex gap-3">
                      {LENGTHS.map((l) => (
                        <button
                          key={l.value}
                          onClick={() => update({ length: l.value })}
                          className={cn(
                            'flex-1 flex flex-col items-center gap-1 py-3 rounded-2xl border-2 font-black transition-all tap-target',
                            params.length === l.value
                              ? 'border-violet-500 bg-violet-50 text-violet-700 shadow-md'
                              : 'border-gray-200 text-gray-600 hover:border-violet-300'
                          )}
                        >
                          <span className="text-sm font-black">{l.label}</span>
                          <span className="text-xs text-gray-400 font-semibold">{l.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <Toggle
                    checked={params.magicElement}
                    onChange={(v) => update({ magicElement: v })}
                    label="✨ Añadir un elemento mágico sorpresa"
                  />
                </>
              )}

              {/* ── Step 3: Detalles mágicos ── */}
              {step === 3 && (
                <>
                  <div>
                    <h2 className="text-2xl font-black text-gray-800 mb-1">
                      💫 Detalles mágicos
                    </h2>
                    <p className="text-gray-500 text-sm">Los últimos toques especiales para hacer la historia única</p>
                  </div>

                  <div>
                    <Label>🍕 Comida favorita de {params.childName || 'el protagonista'}</Label>
                    <MagicInput
                      value={params.favoriteFood ?? ''}
                      onChange={(v) => update({ favoriteFood: v })}
                      placeholder="Pizza, macarrones, fresas..."
                    />
                  </div>

                  <div>
                    <Label>🪄 ¿Tiene algún objeto especial?</Label>
                    <MagicInput
                      value={params.specialObject ?? ''}
                      onChange={(v) => update({ specialObject: v })}
                      placeholder="Una varita, una mochila mágica, un peluche, unas zapatillas..."
                    />
                  </div>

                  <div>
                    <Label>📖 Moraleja de la historia</Label>
                    <MagicSelect
                      value={params.moral ?? 'none'}
                      onChange={(v) => update({ moral: v })}
                      options={MORALS}
                    />
                  </div>

                  <div>
                    <Label>💌 Dedicatoria (opcional)</Label>
                    <MagicInput
                      value={params.dedication ?? ''}
                      onChange={(v) => update({ dedication: v })}
                      placeholder="Este cuento es para..."
                    />
                  </div>

                  {/* Summary */}
                  <SummaryCard params={params} />

                  {error && (
                    <div className="bg-red-50 border-2 border-red-200 rounded-2xl px-5 py-4 text-red-600 font-bold">
                      ❌ {error}
                    </div>
                  )}

                  {/* Big magic button */}
                  <button
                    onClick={handleGenerate}
                    disabled={generating || !params.childName}
                    className={cn(
                      'w-full relative overflow-hidden rounded-3xl py-5 px-8 text-xl font-black text-white transition-all duration-300',
                      'bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500',
                      'shadow-xl shadow-violet-400/40 hover:shadow-2xl hover:shadow-violet-500/50',
                      'hover:-translate-y-1 active:translate-y-0',
                      'disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none',
                      'focus:outline-none focus:ring-4 focus:ring-violet-300'
                    )}
                  >
                    {/* Sparkle shimmer */}
                    {!generating && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2.5s_infinite] pointer-events-none" />
                    )}
                    <span className="relative flex items-center justify-center gap-3">
                      {generating ? (
                        <>
                          <svg className="animate-spin h-6 w-6" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Creando tu cuento mágico... ✨
                        </>
                      ) : (
                        <>
                          ✨ Crear mi cuento mágico
                        </>
                      )}
                    </span>
                  </button>

                  {generating && (
                    <div className="text-center space-y-2">
                      <p className="text-violet-500 font-black text-base animate-pulse">
                        🌟 Creando una historia especial para {params.childName}...
                      </p>
                      <p className="text-violet-400 text-sm animate-pulse" style={{ animationDelay: '0.5s' }}>
                        Tejiendo la magia con todos los personajes ✨
                      </p>
                      <p className="text-violet-300 text-xs animate-pulse" style={{ animationDelay: '1s' }}>
                        Un momento, esto merece la pena 🪄
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Navigation footer */}
            <div className="px-6 sm:px-8 pb-6 flex items-center justify-between gap-4">
              {step > 0 ? (
                <button
                  onClick={() => goTo(step - 1)}
                  className="flex items-center gap-2 px-5 py-3 rounded-2xl border-2 border-gray-200 font-black text-gray-600 hover:border-violet-300 hover:text-violet-600 transition-all"
                >
                  ← Anterior
                </button>
              ) : (
                <div />
              )}

              {step < STEP_CONFIG.length - 1 && (
                <button
                  onClick={() => goTo(step + 1)}
                  disabled={!params.childName}
                  className={cn(
                    'flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-white transition-all',
                    'bg-gradient-to-r from-violet-500 to-purple-500 shadow-lg shadow-violet-300/40',
                    'hover:shadow-xl hover:-translate-y-0.5',
                    'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'
                  )}
                >
                  Siguiente →
                </button>
              )}
            </div>
          </div>

          {/* Step counter pill */}
          <div className="text-center mt-4">
            <span className="text-xs text-gray-400 font-bold">
              Paso {step + 1} de {STEP_CONFIG.length} — {STEP_CONFIG[step].label}
            </span>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </>
  )
}
