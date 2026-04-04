'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import {
  Moon,
  Sun,
  ArrowLeft,
  Heart,
  BookOpen,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Lock,
  ChevronLeft,
  ChevronRight,
  Maximize,
  Minimize,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { FloatingStars } from '@/components/ui/Stars'
import Link from 'next/link'
import { getIllustration } from '@/components/illustrations'

// ─── Types ────────────────────────────────────────────────────────────────────

type NightMode = 'day' | 'dark' | 'warm'

interface StoryReaderProps {
  title: string
  content: string
  coverEmoji: string
  storySlug?: string
  childName: string
  isFavorite?: boolean
  isPremium?: boolean
  userPremium?: boolean
  audioUrl?: string | null
  generatingAudio?: boolean
  userStoryId?: string
  onFavoriteToggle?: () => void
  onProgressUpdate?: (progress: number) => void
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function splitIntoParagraphs(text: string): string[] {
  return text
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean)
}

function splitIntoPages(paragraphs: string[], perPage = 3): string[][] {
  const pages: string[][] = []
  for (let i = 0; i < paragraphs.length; i += perPage) {
    pages.push(paragraphs.slice(i, i + perPage))
  }
  return pages
}

// ─── Night Mode Config ────────────────────────────────────────────────────────

const NIGHT_STYLES: Record<
  NightMode,
  { bg: string; text: string; prose: string; header: string; btn: string; icon: string }
> = {
  day: {
    bg: 'bg-gradient-to-b from-violet-50 via-purple-50 to-pink-50',
    text: 'text-gray-800',
    prose: 'text-gray-700',
    header: 'bg-white/85 backdrop-blur-md border-b border-violet-100',
    btn: 'bg-violet-100 hover:bg-violet-200 text-violet-700',
    icon: 'text-violet-500',
  },
  dark: {
    bg: 'bg-gradient-to-b from-gray-950 via-indigo-950 to-gray-950',
    text: 'text-white',
    prose: 'text-indigo-100',
    header: 'bg-gray-900/85 backdrop-blur-md border-b border-white/10',
    btn: 'bg-white/10 hover:bg-white/20 text-white',
    icon: 'text-indigo-300',
  },
  warm: {
    bg: 'bg-gradient-to-b from-amber-950 via-orange-950 to-amber-950',
    text: 'text-amber-100',
    prose: 'text-amber-200',
    header: 'bg-amber-900/85 backdrop-blur-md border-b border-amber-700/30',
    btn: 'bg-amber-800/50 hover:bg-amber-700/60 text-amber-200',
    icon: 'text-amber-400',
  },
}

// ─── Audio Player (Phase 2 ready) ─────────────────────────────────────────────

function AudioControls({
  audioUrl,
  isPremium,
  userPremium,
  nightMode,
  generatingAudio,
}: {
  audioUrl?: string | null
  isPremium?: boolean
  userPremium?: boolean
  nightMode: NightMode
  generatingAudio?: boolean
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const s = NIGHT_STYLES[nightMode]

  const hasAudio = Boolean(audioUrl)
  const locked = isPremium ? !userPremium : false
  const isGenerating = generatingAudio && !hasAudio

  const toggle = useCallback(() => {
    if (!audioRef.current || !hasAudio) return
    if (playing) {
      audioRef.current.pause()
      setPlaying(false)
    } else {
      audioRef.current.play()
      setPlaying(true)
    }
  }, [playing, hasAudio])

  const toggleMute = useCallback(() => {
    if (!audioRef.current) return
    audioRef.current.muted = !muted
    setMuted(!muted)
  }, [muted])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    const onTime = () => setCurrentTime(audio.currentTime)
    const onLoad = () => setDuration(audio.duration)
    const onEnd = () => setPlaying(false)
    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('loadedmetadata', onLoad)
    audio.addEventListener('ended', onEnd)
    return () => {
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('loadedmetadata', onLoad)
      audio.removeEventListener('ended', onEnd)
    }
  }, [])

  const fmtTime = (t: number) =>
    `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, '0')}`

  return (
    <div
      className={cn(
        'flex items-center gap-3 px-5 py-4 rounded-3xl transition-all',
        s.btn,
        locked && 'opacity-60'
      )}
    >
      {hasAudio && (
        <audio ref={audioRef} src={audioUrl!} preload="metadata" className="hidden" />
      )}

      <button
        onClick={locked ? undefined : toggle}
        title={
          locked
            ? 'Narración disponible con Premium 🔊'
            : hasAudio
            ? playing
              ? 'Pausar'
              : 'Escuchar cuento'
            : 'Narración — Próximamente 🔊'
        }
        className={cn(
          'w-12 h-12 rounded-full flex items-center justify-center transition-all flex-shrink-0',
          'bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-lg',
          locked || !hasAudio ? 'opacity-60 cursor-not-allowed' : 'hover:scale-110 active:scale-95'
        )}
        disabled={locked || !hasAudio}
        aria-label={playing ? 'Pausar narración' : 'Reproducir narración'}
      >
        {locked ? (
          <Lock size={18} />
        ) : playing ? (
          <Pause size={18} fill="white" />
        ) : (
          <Play size={18} fill="white" className="translate-x-0.5" />
        )}
      </button>

      <div className="flex-1 min-w-0">
        {hasAudio && !locked ? (
          <div className="space-y-1.5">
            <div className="h-2 rounded-full bg-white/20 overflow-hidden">
              <div
                className="h-full bg-violet-400 rounded-full transition-all"
                style={{ width: duration ? `${(currentTime / duration) * 100}%` : '0%' }}
              />
            </div>
            <p className="text-xs opacity-60 tabular-nums font-bold">
              {fmtTime(currentTime)} / {fmtTime(duration)}
            </p>
          </div>
        ) : (
          <div>
            <p className="text-sm font-black opacity-80">
              {locked ? '🔒 Narración Premium' : isGenerating ? '🎙️ Generando audio...' : '🔊 Narración de voz'}
            </p>
            <p className="text-xs opacity-50 leading-tight font-bold">
              {locked ? 'Hazte Premium para escuchar' : isGenerating ? 'ElevenLabs está narrando el cuento ✨' : 'Se generará automáticamente'}
            </p>
          </div>
        )}
      </div>

      {hasAudio && !locked && (
        <button
          onClick={toggleMute}
          className="p-2 rounded-xl opacity-60 hover:opacity-100 transition-opacity"
          aria-label={muted ? 'Activar sonido' : 'Silenciar'}
        >
          {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
      )}
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export function StoryReader({
  title,
  content,
  coverEmoji,
  storySlug,
  childName,
  isFavorite = false,
  isPremium,
  userPremium,
  audioUrl,
  generatingAudio,
  onFavoriteToggle,
  onProgressUpdate,
}: StoryReaderProps) {
  const paragraphs = splitIntoParagraphs(content)
  const pages = splitIntoPages(paragraphs, 3)
  const totalPages = pages.length

  const [page, setPage] = useState(0)
  const [nightMode, setNightMode] = useState<NightMode>('day')
  const [fullscreen, setFullscreen] = useState(false)
  const [fontSize, setFontSize] = useState<'md' | 'lg' | 'xl'>('lg')
  const containerRef = useRef<HTMLDivElement>(null)

  const s = NIGHT_STYLES[nightMode]
  const progress = Math.round(((page + 1) / totalPages) * 100)

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') nextPage()
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') prevPage()
      if (e.key === 'Escape') setFullscreen(false)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  useEffect(() => {
    onProgressUpdate?.(progress)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress])

  const nextPage = () => setPage((p) => Math.min(p + 1, totalPages - 1))
  const prevPage = () => setPage((p) => Math.max(p - 1, 0))

  const cycleNight = () => {
    setNightMode((m) => (m === 'day' ? 'dark' : m === 'dark' ? 'warm' : 'day'))
  }

  const toggleFullscreen = () => {
    setFullscreen((f) => !f)
    if (!fullscreen && containerRef.current?.requestFullscreen) {
      containerRef.current.requestFullscreen().catch(() => {})
    } else if (document.exitFullscreen) {
      document.exitFullscreen().catch(() => {})
    }
  }

  // font-story text-2xl+ for reader  
  const fontSizes = { md: 'text-xl leading-9', lg: 'text-2xl leading-10', xl: 'text-3xl leading-11' }
  const titleSizes = { md: 'text-3xl', lg: 'text-4xl', xl: 'text-5xl' }

  return (
    <div
      ref={containerRef}
      className={cn(
        'min-h-screen flex flex-col transition-colors duration-500',
        s.bg,
        fullscreen && 'fixed inset-0 z-50'
      )}
    >
      {/* Stars for dark/warm modes */}
      {nightMode !== 'day' && (
        <div className="pointer-events-none fixed inset-0">
          <FloatingStars count={30} />
        </div>
      )}

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <header className={cn('sticky top-0 z-40 px-4 py-4 flex items-center gap-3', s.header)}>
        <Link href="/library" className={cn('p-3 rounded-2xl transition-colors tap-target flex items-center justify-center', s.btn)}>
          <ArrowLeft size={20} />
        </Link>

        <div className="flex-1 min-w-0">
          <p className={cn('text-xs font-black uppercase tracking-widest opacity-50', s.text)}>
            Leyendo para
          </p>
          <p className={cn('font-black text-base truncate', s.text)}>{childName} 🌟</p>
        </div>

        <div className="flex items-center gap-2">
          {/* Font size toggle */}
          <button
            onClick={() =>
              setFontSize((f) => (f === 'md' ? 'lg' : f === 'lg' ? 'xl' : 'md'))
            }
            className={cn('px-3 py-2 rounded-xl text-sm font-black transition-colors tap-target', s.btn)}
            title="Cambiar tamaño de letra"
          >
            <span className={s.icon}>Aa</span>
          </button>

          {/* Night mode cycle */}
          <button
            onClick={cycleNight}
            className={cn('p-3 rounded-2xl transition-colors tap-target', s.btn)}
            title={
              nightMode === 'day'
                ? 'Modo noche'
                : nightMode === 'dark'
                ? 'Modo cálido'
                : 'Modo día'
            }
          >
            {nightMode === 'day' ? (
              <Moon size={20} className={s.icon} />
            ) : nightMode === 'dark' ? (
              <span className="text-xl">🕯️</span>
            ) : (
              <Sun size={20} className={s.icon} />
            )}
          </button>

          {/* Favorite */}
          {onFavoriteToggle && (
            <button
              onClick={onFavoriteToggle}
              className={cn('p-3 rounded-2xl transition-colors tap-target', s.btn)}
              title={isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
            >
              <Heart
                size={20}
                className={cn(
                  'transition-all',
                  isFavorite ? 'fill-pink-500 text-pink-500' : s.icon
                )}
              />
            </button>
          )}

          {/* Fullscreen */}
          <button
            onClick={toggleFullscreen}
            className={cn('p-3 rounded-2xl transition-colors hidden sm:flex tap-target', s.btn)}
            title={fullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'}
          >
            {fullscreen ? (
              <Minimize size={20} className={s.icon} />
            ) : (
              <Maximize size={20} className={s.icon} />
            )}
          </button>
        </div>
      </header>

      {/* ── Progress bar ────────────────────────────────────────────────────── */}
      <div className="h-2 bg-white/10">
        <div
          className="h-full bg-gradient-to-r from-violet-500 to-pink-500 transition-all duration-700"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* ── Story content ────────────────────────────────────────────────────── */}
      <main className="flex-1 flex flex-col max-w-2xl mx-auto w-full px-6 py-10">
        {/* Cover section — page 0 only */}
        {page === 0 && (
          <div className="text-center mb-12 animate-fade-in-up">
            {/* Illustration header banner */}
            {(() => {
              const Illustration = getIllustration(storySlug ?? coverEmoji)
              return (
                <div className="relative w-full rounded-3xl overflow-hidden mb-8 shadow-2xl" style={{ height: '200px' }}>
                  <Illustration className="w-full h-full" />
                  {/* Gradient overlay at bottom for text readability */}
                  <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
              )
            })()}
            <h1 className={cn('font-black font-display mb-3', titleSizes[fontSize], s.text)}>
              {title.replace('{childName}', childName)}
            </h1>
            <p className={cn('text-sm opacity-50 font-bold', s.text)}>
              <BookOpen size={13} className="inline mr-1" />
              Página {page + 1} de {totalPages}
            </p>
          </div>
        )}

        {/* Page indicator for non-cover pages */}
        {page > 0 && (
          <p className={cn('text-center text-xs opacity-40 mb-8 font-black font-display', s.text)}>
            Página {page + 1} de {totalPages}
          </p>
        )}

        {/* Paragraphs — minimum text-2xl */}
        <div className="flex-1 space-y-8">
          {pages[page]?.map((paragraph, i) => (
            <p
              key={i}
              className={cn(
                'font-story transition-all duration-300 font-semibold',
                fontSizes[fontSize],
                s.prose,
                'animate-fade-in-up'
              )}
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* Last page celebration */}
        {page === totalPages - 1 && (
          <div className="text-center mt-12 animate-fade-in-up">
            <div className="text-7xl mb-4 float">🌟</div>
            <p className={cn('text-2xl font-black font-display', s.text)}>¡FIN!</p>
            <p className={cn('text-lg opacity-60 mt-2 font-bold', s.text)}>
              ¡Qué cuento tan bonito, {childName}! 💫
            </p>
          </div>
        )}
      </main>

      {/* ── Audio player ────────────────────────────────────────────────────── */}
      <div className="max-w-2xl mx-auto w-full px-6 pb-4">
        <AudioControls
          audioUrl={audioUrl}
          isPremium={isPremium}
          userPremium={userPremium}
          nightMode={nightMode}
          generatingAudio={generatingAudio}
        />
      </div>

      {/* ── Page navigation ──────────────────────────────────────────────────── */}
      <nav className={cn('sticky bottom-0 border-t px-6 py-5', s.header)}>
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-4">
          <button
            onClick={prevPage}
            disabled={page === 0}
            className={cn(
              'flex items-center gap-2 px-6 py-4 rounded-2xl font-black text-base transition-all tap-target',
              s.btn,
              page === 0 && 'opacity-30 cursor-not-allowed'
            )}
          >
            <ChevronLeft size={20} />
            Anterior
          </button>

          {/* Dot indicators */}
          <div className="flex items-center gap-2">
            {pages.map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={cn(
                  'rounded-full transition-all duration-300',
                  i === page
                    ? 'w-8 h-3 bg-violet-500'
                    : 'w-3 h-3 bg-violet-300/40 hover:bg-violet-300/70'
                )}
                aria-label={`Ir a página ${i + 1}`}
              />
            ))}
          </div>

          {page < totalPages - 1 ? (
            <button
              onClick={nextPage}
              className="flex items-center gap-2 px-6 py-4 rounded-2xl font-black text-base transition-all bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 tap-target"
            >
              Siguiente
              <ChevronRight size={20} />
            </button>
          ) : (
            <Link
              href="/library"
              className="flex items-center gap-2 px-6 py-4 rounded-2xl font-black text-base bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all tap-target"
            >
              🏠 Volver
            </Link>
          )}
        </div>
      </nav>
    </div>
  )
}
