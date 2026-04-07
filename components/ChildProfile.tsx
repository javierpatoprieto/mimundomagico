'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import type { ChildProfile } from '@/lib/hooks/useAuth'
import { Pencil, Trash2 } from 'lucide-react'

const AVATAR_EMOJIS = ['⭐', '🌙', '🦄', '🐻', '🐰', '🦊', '🐼', '🦁', '🐶', '🐱', '🐸', '🦋', '🌈', '🍄', '🌸', '🚀']
const AVATAR_COLORS = [
  { value: '#FFD700', label: 'Dorado' },
  { value: '#FF6B9D', label: 'Rosa' },
  { value: '#7C3AED', label: 'Morado' },
  { value: '#3B82F6', label: 'Azul' },
  { value: '#10B981', label: 'Verde' },
  { value: '#F59E0B', label: 'Naranja' },
  { value: '#EF4444', label: 'Rojo' },
  { value: '#EC4899', label: 'Rosa fuerte' },
  { value: '#06B6D4', label: 'Cian' },
  { value: '#8B5CF6', label: 'Violeta' },
]

const THEME_OPTIONS = [
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
]

const STEP_LABELS = ['¿Quién es?', 'Sus favoritos', '¡Sus amigos!']

type Gender = 'niño' | 'niña'

const GENDER_OPTIONS: { value: Gender; label: string; emoji: string }[] = [
  { value: 'niño', label: 'Niño', emoji: '👦' },
  { value: 'niña', label: 'Niña', emoji: '👧' },
]

interface ChildProfileFormProps {
  userId: string
  onSuccess: () => void
  /** Pre-fill form for editing an existing profile */
  editProfile?: ChildProfile
}

export function ChildProfileForm({ userId, onSuccess, editProfile }: ChildProfileFormProps) {
  const isEditing = !!editProfile

  const [step, setStep] = useState(0)
  const [name, setName] = useState(editProfile?.name ?? '')
  const [age, setAge] = useState<number>(editProfile?.age ?? 4)
  const [gender, setGender] = useState<Gender>((editProfile?.gender as Gender) ?? 'niño')
  const [avatarEmoji, setAvatarEmoji] = useState(editProfile?.avatar_emoji ?? '⭐')
  const [avatarColor, setAvatarColor] = useState(editProfile?.avatar_color ?? '#FFD700')
  const [selectedThemes, setSelectedThemes] = useState<string[]>(editProfile?.favorite_themes ?? [])
  const [favoriteColors, setFavoriteColors] = useState<string[]>(editProfile?.favorite_colors ?? [])
  const [bestFriendName, setBestFriendName] = useState(editProfile?.best_friend_name ?? '')
  const [petName, setPetName] = useState(editProfile?.pet_name ?? '')
  const [favoriteFood, setFavoriteFood] = useState(editProfile?.favorite_food ?? '')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const toggleTheme = (theme: string) => {
    setSelectedThemes((prev) =>
      prev.includes(theme) ? prev.filter((t) => t !== theme) : [...prev, theme]
    )
  }

  const toggleFavColor = (color: string) => {
    setFavoriteColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    )
  }

  const handleNext = () => {
    if (step === 0 && !name.trim()) {
      setError('Por favor, escribe el nombre del niño/a ✨')
      return
    }
    setError('')
    setStep((s) => s + 1)
  }

  const handleSubmit = async () => {
    if (!name.trim()) return setError('Por favor, introduce el nombre del niño/a')

    setLoading(true)
    setError('')

    const payload = {
      user_id: userId,
      name: name.trim(),
      age,
      gender,
      avatar_emoji: avatarEmoji,
      avatar_color: avatarColor,
      favorite_themes: selectedThemes,
      favorite_colors: favoriteColors,
      best_friend_name: bestFriendName.trim() || null,
      pet_name: petName.trim() || null,
      favorite_food: favoriteFood.trim() || null,
    }

    let dbError
    if (isEditing) {
      const { error: e } = await supabase
        .from('child_profiles')
        .update(payload)
        .eq('id', editProfile.id)
      dbError = e
    } else {
      const { error: e } = await supabase.from('child_profiles').insert(payload)
      dbError = e
    }

    if (dbError) {
      setError('Algo salió mal. Inténtalo de nuevo.')
    } else {
      onSuccess()
    }

    setLoading(false)
  }

  return (
    <div>
      {/* Step indicator */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {STEP_LABELS.map((label, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className={cn(
              'flex items-center justify-center w-8 h-8 rounded-full text-sm font-black transition-all',
              i === step
                ? 'bg-violet-600 text-white shadow-lg shadow-violet-300 scale-110'
                : i < step
                ? 'bg-green-500 text-white'
                : 'bg-gray-100 text-gray-400'
            )}>
              {i < step ? '✓' : i + 1}
            </div>
            {i < STEP_LABELS.length - 1 && (
              <div className={cn('w-8 h-1 rounded-full transition-all', i < step ? 'bg-green-400' : 'bg-gray-100')} />
            )}
          </div>
        ))}
      </div>

      {/* STEP 0: Name, gender, age, avatar */}
      {step === 0 && (
        <div className="space-y-6">
          {/* Avatar preview */}
          <div className="flex justify-center">
            <div
              className="w-28 h-28 rounded-full flex items-center justify-center text-6xl shadow-xl transition-all duration-300 ring-4 ring-white ring-offset-4"
              style={{ backgroundColor: avatarColor }}
            >
              {avatarEmoji}
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="block text-base font-black text-gray-700 mb-2">
              ¿Cómo se llama? ✨
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => { setName(e.target.value); setError('') }}
              placeholder="Escribe su nombre..."
              maxLength={30}
              className="w-full px-5 py-4 rounded-2xl border-3 border-violet-200 focus:border-violet-500 focus:outline-none text-xl font-black font-display transition-colors bg-violet-50/50"
              style={{ fontSize: '1.25rem' }}
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-base font-black text-gray-700 mb-3">
              ¿Es un niño o una niña? 🌟
            </label>
            <div className="flex gap-4">
              {GENDER_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setGender(opt.value)}
                  className={cn(
                    'flex-1 flex flex-col items-center gap-2 py-4 rounded-2xl border-3 font-black text-sm transition-all tap-target',
                    gender === opt.value
                      ? 'border-violet-500 bg-violet-50 shadow-lg shadow-violet-200 scale-105 text-violet-700'
                      : 'border-gray-200 bg-white hover:border-violet-300 text-gray-600'
                  )}
                >
                  <span className="text-4xl">{opt.emoji}</span>
                  <span>{opt.label}</span>
                  {gender === opt.value && (
                    <span className="text-xs bg-violet-600 text-white rounded-full px-2 py-0.5">✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Age */}
          <div>
            <label className="block text-base font-black text-gray-700 mb-3">
              ¿Cuántos años tiene? 🎂
            </label>
            <div className="flex gap-2 flex-wrap">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setAge(n)}
                  className={cn(
                    'w-12 h-12 rounded-2xl text-base font-black transition-all tap-target flex items-center justify-center',
                    age === n
                      ? 'bg-violet-600 text-white shadow-lg shadow-violet-300 scale-110'
                      : 'bg-violet-50 text-violet-600 hover:bg-violet-100 border-2 border-violet-100'
                  )}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          {/* Emoji picker */}
          <div>
            <label className="block text-base font-black text-gray-700 mb-2">
              Elige un avatar 🎭
            </label>
            <div className="flex flex-wrap gap-2">
              {AVATAR_EMOJIS.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setAvatarEmoji(emoji)}
                  className={cn(
                    'w-12 h-12 rounded-2xl text-2xl flex items-center justify-center transition-all tap-target',
                    avatarEmoji === emoji
                      ? 'bg-violet-100 ring-3 ring-violet-500 scale-115 shadow-md'
                      : 'bg-gray-50 hover:bg-violet-50 border-2 border-transparent'
                  )}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Color picker */}
          <div>
            <label className="block text-base font-black text-gray-700 mb-2">
              Color del avatar 🎨
            </label>
            <div className="flex gap-3 flex-wrap">
              {AVATAR_COLORS.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => setAvatarColor(c.value)}
                  title={c.label}
                  className={cn(
                    'w-10 h-10 rounded-full transition-all tap-target',
                    avatarColor === c.value ? 'ring-4 ring-offset-2 ring-violet-500 scale-115' : 'hover:scale-110 border-2 border-white shadow-sm'
                  )}
                  style={{ backgroundColor: c.value }}
                />
              ))}
            </div>
          </div>

          {error && <p className="text-red-500 text-sm bg-red-50 px-4 py-3 rounded-2xl font-bold">{error}</p>}

          <Button type="button" onClick={handleNext} size="lg" className="w-full text-lg font-black py-5">
            Siguiente →
          </Button>
        </div>
      )}

      {/* STEP 1: Favorite themes */}
      {step === 1 && (
        <div className="space-y-6">
          <div className="text-center mb-4">
            <div className="text-5xl mb-2">🌟</div>
            <h3 className="text-xl font-black text-gray-800">¿Qué le encanta a <span className="text-violet-600">{name}</span>?</h3>
            <p className="text-gray-500 text-sm mt-1">Toca para seleccionar (puede elegir varios)</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {THEME_OPTIONS.map((theme) => {
              const selected = selectedThemes.includes(theme.value)
              return (
                <button
                  key={theme.value}
                  type="button"
                  onClick={() => toggleTheme(theme.value)}
                  className={cn(
                    'flex flex-col items-center gap-2 py-5 px-3 rounded-3xl border-3 transition-all tap-target',
                    selected
                      ? 'border-violet-500 bg-violet-50 shadow-lg shadow-violet-200 scale-105'
                      : 'border-gray-200 bg-white hover:border-violet-300 hover:bg-violet-50/50'
                  )}
                >
                  <span className={cn('text-4xl transition-all', selected && 'animate-bounce-emoji')}>{theme.emoji}</span>
                  <span className={cn('text-xs font-black', selected ? 'text-violet-700' : 'text-gray-600')}>{theme.label}</span>
                  {selected && <span className="text-xs bg-violet-600 text-white rounded-full px-2 py-0.5 font-bold">✓</span>}
                </button>
              )
            })}
          </div>

          {/* Favorite colors */}
          <div>
            <label className="block text-base font-black text-gray-700 mb-2">
              ¿Cuáles son sus colores favoritos? 🎨
            </label>
            <div className="flex gap-3 flex-wrap">
              {AVATAR_COLORS.map((c) => (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => toggleFavColor(c.label)}
                  title={c.label}
                  className={cn(
                    'w-10 h-10 rounded-full transition-all flex items-center justify-center text-white text-xs font-black',
                    favoriteColors.includes(c.label)
                      ? 'ring-4 ring-offset-2 ring-violet-500 scale-115 shadow-lg'
                      : 'hover:scale-110 border-2 border-white shadow-sm'
                  )}
                  style={{ backgroundColor: c.value }}
                >
                  {favoriteColors.includes(c.label) && '✓'}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <Button type="button" variant="secondary" onClick={() => setStep(0)} size="lg" className="flex-1">
              ← Atrás
            </Button>
            <Button type="button" onClick={handleNext} size="lg" className="flex-1 font-black">
              Siguiente →
            </Button>
          </div>
        </div>
      )}

      {/* STEP 2: Friends & personal details */}
      {step === 2 && (
        <div className="space-y-5">
          <div className="text-center mb-4">
            <div className="text-5xl mb-2">👫</div>
            <h3 className="text-xl font-black text-gray-800">Los personajes especiales de <span className="text-violet-600">{name}</span></h3>
            <p className="text-gray-500 text-sm mt-1">Opcional, pero hace los cuentos mucho más mágicos ✨</p>
          </div>

          <div>
            <label className="block text-sm font-black text-gray-700 mb-2">
              👫 Mejor amigo/a
            </label>
            <input
              type="text"
              value={bestFriendName}
              onChange={(e) => setBestFriendName(e.target.value)}
              placeholder="Ej: Lucas, Sofía..."
              className="w-full px-4 py-3.5 rounded-2xl border-2 border-violet-200 focus:border-violet-500 focus:outline-none font-bold text-gray-700 transition-colors bg-violet-50/30"
            />
            <p className="text-xs text-gray-400 mt-1.5">¡Aparecerá como personaje en las aventuras de IA!</p>
          </div>

          <div>
            <label className="block text-sm font-black text-gray-700 mb-2">
              🐾 Mascota
            </label>
            <input
              type="text"
              value={petName}
              onChange={(e) => setPetName(e.target.value)}
              placeholder="Ej: Max, Luna, Pelusa..."
              className="w-full px-4 py-3.5 rounded-2xl border-2 border-violet-200 focus:border-violet-500 focus:outline-none font-bold text-gray-700 transition-colors bg-violet-50/30"
            />
          </div>

          <div>
            <label className="block text-sm font-black text-gray-700 mb-2">
              🍕 Comida favorita
            </label>
            <input
              type="text"
              value={favoriteFood}
              onChange={(e) => setFavoriteFood(e.target.value)}
              placeholder="Ej: pizza, macarrones, helado..."
              className="w-full px-4 py-3.5 rounded-2xl border-2 border-violet-200 focus:border-violet-500 focus:outline-none font-bold text-gray-700 transition-colors bg-violet-50/30"
            />
            <p className="text-xs text-gray-400 mt-1.5">¡Aparecerá de forma divertida en la historia! ✨</p>
          </div>

          {error && <p className="text-red-500 text-sm bg-red-50 px-4 py-3 rounded-2xl font-bold">{error}</p>}

          <div className="flex gap-3">
            <Button type="button" variant="secondary" onClick={() => setStep(1)} size="lg" className="flex-1">
              ← Atrás
            </Button>
            <Button type="button" onClick={handleSubmit} loading={loading} size="lg" className="flex-1 font-black text-base py-4">
              {isEditing ? '✅ Guardar cambios' : '🌟 ¡Empezar la magia!'}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── ChildProfileCard — shows a profile chip with edit/delete buttons ─────────

interface ChildProfileCardProps {
  child: ChildProfile
  isSelected: boolean
  onSelect: () => void
  onEdit: () => void
  onDelete: () => void
}

export function ChildProfileCard({ child, isSelected, onSelect, onEdit, onDelete }: ChildProfileCardProps) {
  const genderEmoji = child.gender === 'niña' ? '👧' : '👦'

  return (
    <div className={cn(
      'flex items-center gap-2 px-4 py-2.5 rounded-2xl border-3 transition-all',
      isSelected
        ? 'border-violet-500 bg-violet-50 shadow-lg shadow-violet-200'
        : 'border-gray-200 bg-white hover:border-violet-300'
    )}>
      {/* Main clickable area — select child */}
      <button
        onClick={onSelect}
        className="flex items-center gap-2 flex-1 tap-target text-left"
        aria-label={`Seleccionar perfil de ${child.name}`}
      >
        <span
          className="w-9 h-9 rounded-full text-xl flex items-center justify-center shadow-sm flex-shrink-0"
          style={{ backgroundColor: child.avatar_color }}
        >
          {child.avatar_emoji}
        </span>
        <span className={cn('font-black text-base font-display', isSelected ? 'text-violet-700' : 'text-gray-700')}>
          {genderEmoji} {child.name}
        </span>
      </button>

      {/* Edit / Delete buttons */}
      <button
        onClick={(e) => { e.stopPropagation(); onEdit() }}
        className="p-1.5 rounded-xl text-gray-400 hover:text-violet-600 hover:bg-violet-100 transition-colors"
        aria-label={`Editar perfil de ${child.name}`}
        title="Editar"
      >
        <Pencil size={14} />
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onDelete() }}
        className="p-1.5 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
        aria-label={`Eliminar perfil de ${child.name}`}
        title="Eliminar"
      >
        <Trash2 size={14} />
      </button>
    </div>
  )
}

// ─── DeleteConfirmDialog ──────────────────────────────────────────────────────

interface DeleteConfirmDialogProps {
  childName: string
  onConfirm: () => void
  onCancel: () => void
  loading?: boolean
}

export function DeleteConfirmDialog({ childName, onConfirm, onCancel, loading }: DeleteConfirmDialogProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onCancel} />
      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full border border-red-100 animate-fade-in-up">
        <div className="text-5xl text-center mb-4">🗑️</div>
        <h3 className="text-xl font-black text-gray-800 text-center mb-3">¿Eliminar perfil?</h3>
        <p className="text-gray-600 text-center text-sm leading-relaxed mb-6">
          ¿Seguro que quieres eliminar el perfil de{' '}
          <strong className="text-violet-700">{childName}</strong>?{' '}
          Esta acción no se puede deshacer.
        </p>
        <div className="flex gap-3">
          <Button type="button" variant="secondary" onClick={onCancel} className="flex-1" disabled={loading}>
            Cancelar
          </Button>
          <Button
            type="button"
            onClick={onConfirm}
            loading={loading}
            className="flex-1 bg-red-500 hover:bg-red-600 border-red-500 font-black"
          >
            Sí, eliminar
          </Button>
        </div>
      </div>
    </div>
  )
}

// ─── ChildAvatar (unchanged, kept for backward compatibility) ─────────────────

interface ChildAvatarProps {
  name: string
  emoji: string
  color: string
  size?: 'sm' | 'md' | 'lg'
}

export function ChildAvatar({ name, emoji, color, size = 'md' }: ChildAvatarProps) {
  const sizes = { sm: 'w-8 h-8 text-lg', md: 'w-12 h-12 text-2xl', lg: 'w-16 h-16 text-3xl' }

  return (
    <div className="flex items-center gap-3">
      <div
        className={cn('rounded-full flex items-center justify-center flex-shrink-0 shadow-md', sizes[size])}
        style={{ backgroundColor: color }}
      >
        {emoji}
      </div>
      <span className="font-black text-gray-800 font-display">{name}</span>
    </div>
  )
}
