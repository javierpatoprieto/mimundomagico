'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Lock, Heart, Clock } from 'lucide-react'
import { getIllustration } from '@/components/illustrations'

interface StoryCardProps {
  id: string
  slug: string
  title: string
  coverEmoji: string
  theme: string
  tagline?: string
  readingTime?: number
  isPremium?: boolean
  isFavorite?: boolean
  isAiGenerated?: boolean
  childName?: string
  progress?: number
  onFavoriteToggle?: (id: string) => void
  userPremium?: boolean
}

const THEME_GRADIENTS: Record<string, string> = {
  bosque: 'from-emerald-400 to-teal-500',
  construcción: 'from-orange-400 to-amber-500',
  autoestima: 'from-pink-400 to-rose-500',
  amistad: 'from-violet-400 to-purple-500',
  perseverancia: 'from-blue-400 to-cyan-500',
  dinosaurios: 'from-green-400 to-emerald-600',
  espacio: 'from-indigo-500 to-violet-700',
  sirenas: 'from-cyan-400 to-blue-500',
  superhéroes: 'from-red-400 to-orange-500',
  animales: 'from-yellow-400 to-orange-400',
  magia: 'from-purple-500 to-pink-500',
  piratas: 'from-gray-500 to-slate-700',
  hadas: 'from-pink-300 to-violet-400',
  dragones: 'from-red-500 to-orange-600',
  princesas: 'from-fuchsia-400 to-pink-500',
  océano: 'from-blue-500 to-teal-600',
  robots: 'from-slate-400 to-blue-600',
}

const THEME_TAGLINES: Record<string, string> = {
  bosque: 'Una aventura en el bosque encantado 🌲',
  construcción: '¡La casa más fuerte del mundo! 🏠',
  autoestima: 'La historia más bonita de todas 🦢',
  amistad: 'Con los mejores amigos del mundo 🍎',
  perseverancia: 'Nunca te rindas — ¡llegarás! 🐢',
  princesas: 'Un baile mágico lleno de sueños 👠',
  magia: 'Una aventura dulce y valiente 🏡',
}

export function StoryCard({
  id,
  slug,
  title,
  coverEmoji,
  theme,
  tagline,
  readingTime,
  isPremium,
  isFavorite,
  isAiGenerated,
  childName,
  progress = 0,
  onFavoriteToggle,
  userPremium,
}: StoryCardProps) {
  const gradient = THEME_GRADIENTS[theme] ?? 'from-violet-400 to-purple-500'
  const isLocked = isPremium && !userPremium
  const displayTitle = childName ? title.replace('{childName}', childName) : title
  const href = isLocked ? '/premium' : `/story/${slug}`
  const storyTagline = tagline || THEME_TAGLINES[theme]

  return (
    <Link href={href} className="group block">
      <div
        className={cn(
          'story-card relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl cursor-pointer border-2 border-white',
          isLocked && 'opacity-80'
        )}
      >
        {/* Cover */}
        <div
          className={cn(
            'relative flex items-center justify-center bg-gradient-to-br h-48 overflow-hidden',
            gradient
          )}
        >
          {/* Shimmer overlay on hover */}
          <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* SVG illustration */}
          {(() => {
            const Illustration = getIllustration(slug || theme)
            return (
              <div className="absolute inset-0 transition-transform duration-300 group-hover:scale-105">
                <Illustration className="w-full h-full object-cover" />
              </div>
            )
          })()}

          {/* Fallback emoji (hidden behind SVG but keeps aria) */}
          <span className="sr-only" aria-label={theme}>{coverEmoji}</span>

          {/* Lock badge */}
          {isLocked && (
            <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-sm text-white rounded-full p-2">
              <Lock size={14} />
            </div>
          )}

          {/* AI badge */}
          {isAiGenerated && (
            <div className="absolute top-3 left-3 bg-amber-400/90 text-amber-900 text-xs font-black px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
              ✨ IA
            </div>
          )}

          {/* FREE / PREMIUM badge */}
          {!isAiGenerated && (
            <div className={cn('absolute bottom-3 left-3', isPremium ? 'badge-premium' : 'badge-free')}>
              {isPremium ? '⭐ PREMIUM' : '🎁 GRATIS'}
            </div>
          )}

          {/* Progress bar */}
          {progress > 0 && (
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-black/20">
              <div
                className="h-full bg-white/90 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="bg-white p-4">
          <h3 className="font-black text-gray-800 text-sm leading-snug line-clamp-2 mb-1.5 font-display text-base">
            {displayTitle}
          </h3>

          {storyTagline && (
            <p className="text-xs text-gray-400 line-clamp-1 mb-2 font-bold">{storyTagline}</p>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-400 text-xs">
              {readingTime && (
                <span className="flex items-center gap-1 font-bold">
                  <Clock size={11} />
                  {readingTime} min
                </span>
              )}
            </div>

            {onFavoriteToggle && (
              <button
                onClick={(e) => {
                  e.preventDefault()
                  onFavoriteToggle(id)
                }}
                className="text-gray-300 hover:text-pink-500 transition-colors p-1.5 -m-1 tap-target"
                aria-label={isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
              >
                <Heart
                  size={18}
                  className={cn('transition-all', isFavorite && 'fill-pink-500 text-pink-500')}
                />
              </button>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
