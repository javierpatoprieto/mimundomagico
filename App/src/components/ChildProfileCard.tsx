import Link from 'next/link'
import { Pencil, BookOpen } from 'lucide-react'
import { ChildProfile } from '@/types'

interface ChildProfileCardProps {
  profile: ChildProfile
}

const AGE_LABELS: Record<number, string> = {
  2: '2 años', 3: '3 años', 4: '4 años', 5: '5 años',
  6: '6 años', 7: '7 años', 8: '8 años', 9: '9 años', 10: '10 años',
}

export default function ChildProfileCard({ profile }: ChildProfileCardProps) {
  return (
    <div className="card p-5 flex flex-col gap-4">
      {/* Avatar & name */}
      <div className="flex items-center gap-3">
        <div className="w-14 h-14 bg-gradient-to-br from-primary-100 to-magic-pink/20 rounded-2xl flex items-center justify-center text-3xl shadow-sm flex-shrink-0">
          {profile.avatar_emoji || '🧒'}
        </div>
        <div className="min-w-0">
          <h3 className="font-heading text-xl text-gray-900 truncate">{profile.name}</h3>
          <p className="text-sm text-gray-500 font-medium">
            {AGE_LABELS[profile.age] || `${profile.age} años`}
          </p>
        </div>
      </div>

      {/* Interests */}
      {profile.interests && profile.interests.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {profile.interests.slice(0, 4).map((interest) => (
            <span
              key={interest}
              className="chip-active text-xs py-1 px-2.5"
            >
              {interest}
            </span>
          ))}
          {profile.interests.length > 4 && (
            <span className="chip-inactive text-xs py-1 px-2.5">
              +{profile.interests.length - 4}
            </span>
          )}
        </div>
      )}

      {/* Pet & food info */}
      <div className="flex gap-3 text-xs text-gray-500">
        {profile.pet_name && (
          <span className="flex items-center gap-1">
            🐾 {profile.pet_name}
          </span>
        )}
        {profile.favorite_foods && profile.favorite_foods.length > 0 && (
          <span className="flex items-center gap-1">
            🍽️ {profile.favorite_foods[0]}
            {profile.favorite_foods.length > 1 && ` +${profile.favorite_foods.length - 1}`}
          </span>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-1 border-t border-gray-100">
        <Link
          href={`/cuentos?perfil=${profile.id}`}
          className="flex-1 btn-primary text-sm py-2 px-3"
        >
          <BookOpen className="w-4 h-4" />
          Ver cuentos
        </Link>
        <Link
          href={`/perfil/${profile.id}/editar`}
          className="btn-secondary text-sm py-2 px-3"
          aria-label={`Editar perfil de ${profile.name}`}
        >
          <Pencil className="w-4 h-4" />
        </Link>
      </div>
    </div>
  )
}
