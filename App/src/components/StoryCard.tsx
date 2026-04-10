import Link from 'next/link'
import { Lock, Clock, Star } from 'lucide-react'
import { ClassicStory, Story } from '@/types'
import clsx from 'clsx'

interface StoryCardProps {
  story: ClassicStory | Story
  childName?: string
  isLocked?: boolean
  isClassic?: boolean
  href?: string
}

function isClassicStory(story: ClassicStory | Story): story is ClassicStory {
  return 'slug' in story
}

export default function StoryCard({ story, childName, isLocked = false, isClassic = false, href }: StoryCardProps) {
  const classic = isClassicStory(story)
  const storyHref = href || (classic ? `/cuento/${story.slug}` : `/cuento/${story.id}`)

  const emoji = classic ? story.emoji : (story as Story).cover_emoji || '📖'
  const title = childName
    ? story.title.replace(/\[nombre\]/gi, childName)
    : story.title
  const color = classic ? story.color : 'from-primary-400 to-primary-600'
  const description = classic ? story.description : undefined
  const readTime = classic ? story.readTime : undefined

  return (
    <div className={clsx('card card-hover group relative', isLocked && 'opacity-90')}>
      {/* Lock overlay */}
      {isLocked && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/60 backdrop-blur-[2px] rounded-3xl">
          <div className="text-center p-4">
            <div className="w-12 h-12 mx-auto bg-amber-100 rounded-full flex items-center justify-center mb-2">
              <Lock className="w-6 h-6 text-amber-600" />
            </div>
            <p className="text-sm font-bold text-gray-700">Premium</p>
            <p className="text-xs text-gray-500 mt-1">€2,99/mes</p>
          </div>
        </div>
      )}

      {/* Card header with gradient */}
      <div className={clsx('h-32 bg-gradient-to-br flex items-center justify-center', color)}>
        <span className="text-5xl drop-shadow-md group-hover:scale-110 transition-transform duration-300">
          {emoji}
        </span>
      </div>

      {/* Card body */}
      <div className="p-4">
        <h3 className="font-heading text-lg text-gray-900 leading-tight mb-1">
          {title}
        </h3>
        {description && (
          <p className="text-sm text-gray-500 leading-relaxed mb-3 line-clamp-2">
            {description}
          </p>
        )}

        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-3">
            {readTime && (
              <span className="flex items-center gap-1 text-xs text-gray-400 font-medium">
                <Clock className="w-3 h-3" />
                {readTime}
              </span>
            )}
            {isClassic && (
              <span className="flex items-center gap-1 text-xs text-amber-500 font-semibold">
                <Star className="w-3 h-3 fill-amber-400 stroke-amber-500" />
                Clásico
              </span>
            )}
          </div>

          {!isLocked && (
            <Link
              href={storyHref}
              className="text-xs font-bold text-primary-600 hover:text-primary-700 flex items-center gap-1 group/link"
              aria-label={`Leer ${title}`}
            >
              Leer
              <span className="group-hover/link:translate-x-1 transition-transform inline-block">→</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
