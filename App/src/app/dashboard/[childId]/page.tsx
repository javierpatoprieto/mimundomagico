/**
 * /dashboard/[childId]
 * Individual child dashboard with story generation
 */

'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { ChildProfile, Story } from '@/types'
import { ArrowLeft, Sparkles, Loader, AlertCircle, BookOpen } from 'lucide-react'

export default function ChildDashboard() {
  const params = useParams()
  const router = useRouter()
  const childId = params.childId as string

  const [profile, setProfile] = useState<ChildProfile | null>(null)
  const [stories, setStories] = useState<Story[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [generatingStory, setGeneratingStory] = useState(false)
  const [selectedTheme, setSelectedTheme] = useState('adventure')

  const supabase = createClient()

  const themes = [
    { id: 'adventure', emoji: '🏔️', label: 'Aventura' },
    { id: 'magic', emoji: '✨', label: 'Magia' },
    { id: 'mystery', emoji: '🔍', label: 'Misterio' },
    { id: 'friendship', emoji: '👫', label: 'Amistad' },
  ]

  useEffect(() => {
    loadData()
  }, [childId])

  async function loadData() {
    try {
      setLoading(true)
      const { data: sessionData } = await supabase.auth.getSession()

      if (!sessionData.session) {
        router.push('/login')
        return
      }

      // Load profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', childId)
        .eq('user_id', sessionData.session.user.id)
        .single()

      if (profileError || !profileData) {
        setError('Perfil no encontrado')
        return
      }

      // Load stories for this profile
      const { data: storiesData, error: storiesError } = await supabase
        .from('stories')
        .select('*')
        .eq('profile_id', childId)
        .order('created_at', { ascending: false })

      if (storiesError) throw storiesError

      setProfile(profileData)
      setStories(storiesData || [])
    } catch (err) {
      console.error('Error loading child dashboard:', err)
      setError('Error al cargar los datos')
    } finally {
      setLoading(false)
    }
  }

  async function handleGenerateStory() {
    if (!profile) return

    setGeneratingStory(true)
    try {
      const response = await fetch('/api/generate-story', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          childName: profile.name,
          age: profile.age,
          interests: profile.interests,
          theme: selectedTheme,
          profileId: childId,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Error al generar cuento')
        return
      }

      // Add new story to list
      setStories([data.data, ...stories])
      setError(null)

      // Show success message
      const successDiv = document.createElement('div')
      successDiv.className =
        'fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg'
      successDiv.textContent = '¡Cuento generado exitosamente!'
      document.body.appendChild(successDiv)
      setTimeout(() => successDiv.remove(), 3000)
    } catch (err) {
      console.error('Error generating story:', err)
      setError('Error al generar cuento. Por favor, intenta de nuevo.')
    } finally {
      setGeneratingStory(false)
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader className="w-8 h-8 text-primary-600 animate-spin" />
        <p className="mt-4 text-gray-600">Cargando perfil...</p>
      </div>
    )
  }

  if (error && !profile) {
    return (
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          Volver
        </button>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <p className="text-red-700 font-medium">{error}</p>
        </div>
      </div>
    )
  }

  if (!profile) return null

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        Volver al dashboard
      </button>

      {/* Profile Card */}
      <div className="bg-gradient-to-r from-primary-500 to-pink-500 rounded-xl p-8 text-white mb-8">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-6xl mb-4">{profile.avatar_emoji}</div>
            <h1 className="text-4xl font-bold mb-2">{profile.name}</h1>
            <p className="text-lg opacity-90">{profile.age} años</p>
          </div>
          <button
            onClick={() => router.push(`/perfil/${childId}/editar`)}
            className="px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-colors"
          >
            Editar Perfil
          </button>
        </div>

        {/* Interests & Details */}
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div>
            <p className="opacity-75 text-sm">Intereses</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {profile.interests.map((interest, idx) => (
                <span key={idx} className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">
                  {interest}
                </span>
              ))}
            </div>
          </div>
          {profile.pet_name && (
            <div>
              <p className="opacity-75 text-sm">Mascota</p>
              <p className="mt-2 text-lg">🐾 {profile.pet_name}</p>
            </div>
          )}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8 flex gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* Generate Story Section */}
      <div className="bg-white rounded-xl border border-gray-200 p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Generar Nuevo Cuento</h2>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">Selecciona un tema:</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => setSelectedTheme(theme.id)}
                className={`p-4 rounded-lg border-2 transition-all text-center ${
                  selectedTheme === theme.id
                    ? 'border-primary-600 bg-primary-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="text-3xl mb-2">{theme.emoji}</div>
                <p className="font-medium text-gray-900">{theme.label}</p>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleGenerateStory}
          disabled={generatingStory}
          className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-pink-600 text-white rounded-lg hover:shadow-lg disabled:opacity-75 disabled:cursor-not-allowed transition-all font-medium"
        >
          {generatingStory ? (
            <>
              <Loader className="w-5 h-5 animate-spin" />
              Generando...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Generar Cuento
            </>
          )}
        </button>
      </div>

      {/* Stories Section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Cuentos de {profile.name}</h2>

        {stories.length === 0 ? (
          <div className="bg-gradient-to-br from-amber-50 to-pink-50 rounded-xl p-12 text-center border border-amber-200">
            <BookOpen className="w-12 h-12 text-amber-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Sin cuentos generados</h3>
            <p className="text-gray-600">
              ¡Genera el primer cuento para {profile.name} arriba!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {stories.map((story) => (
              <a
                key={story.id}
                href={`/cuento/${story.id}`}
                className="group bg-white rounded-xl p-6 border border-gray-200 hover:border-primary-300 hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="text-4xl">{story.cover_emoji}</div>
                  {story.is_premium && (
                    <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full">
                      Premium
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-gray-900 text-lg group-hover:text-primary-600 transition-colors line-clamp-2">
                  {story.title}
                </h3>
                <p className="text-sm text-gray-500 mt-2">
                  {new Date(story.created_at).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
