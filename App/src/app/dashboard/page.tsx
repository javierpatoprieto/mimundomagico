/**
 * /dashboard
 * Main dashboard showing user's children and stories
 */

'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import { ChildProfile, Story } from '@/types'
import { BookOpen, Plus, Sparkles, Loader } from 'lucide-react'

export default function DashboardPage() {
  const [profiles, setProfiles] = useState<ChildProfile[]>([])
  const [stories, setStories] = useState<Story[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    try {
      setLoading(true)
      const { data: sessionData } = await supabase.auth.getSession()

      if (!sessionData.session) {
        setError('Por favor, inicia sesión primero')
        return
      }

      // Load child profiles
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', sessionData.session.user.id)
        .order('created_at', { ascending: false })

      if (profilesError) throw profilesError

      // Load stories
      const { data: storiesData, error: storiesError } = await supabase
        .from('stories')
        .select('*')
        .eq('user_id', sessionData.session.user.id)
        .order('created_at', { ascending: false })
        .limit(10)

      if (storiesError) throw storiesError

      setProfiles(profilesData || [])
      setStories(storiesData || [])
    } catch (err) {
      console.error('Error loading dashboard:', err)
      setError('Error al cargar el dashboard')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader className="w-8 h-8 text-primary-600 animate-spin" />
        <p className="mt-4 text-gray-600">Cargando tu dashboard...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-700 font-medium">{error}</p>
          <Link href="/login" className="text-primary-600 hover:text-primary-700 mt-4 inline-block">
            Ir a iniciar sesión
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">Mi Dashboard</h1>
        <p className="text-gray-600 text-lg">
          Gestiona los perfiles de tus hijos y sus cuentos personalizados
        </p>
      </div>

      {/* Profiles Section */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Perfiles de los Niños</h2>
          <Link
            href="/perfil/nuevo"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-shadow"
          >
            <Plus className="w-5 h-5" />
            Crear Perfil
          </Link>
        </div>

        {profiles.length === 0 ? (
          <div className="bg-gradient-to-br from-primary-50 to-pink-50 rounded-xl p-12 text-center border border-primary-200">
            <div className="text-5xl mb-4">👤</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Sin perfiles creados</h3>
            <p className="text-gray-600 mb-6">
              Crea el primer perfil de tu hijo para comenzar con cuentos personalizados
            </p>
            <Link
              href="/perfil/nuevo"
              className="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Crear Primer Perfil
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {profiles.map((profile) => (
              <Link
                key={profile.id}
                href={`/dashboard/${profile.id}`}
                className="group bg-white rounded-xl p-6 border border-gray-200 hover:border-primary-300 hover:shadow-lg transition-all"
              >
                <div className="text-4xl mb-3">{profile.avatar_emoji}</div>
                <h3 className="font-bold text-gray-900 text-lg group-hover:text-primary-600 transition-colors">
                  {profile.name}
                </h3>
                <p className="text-sm text-gray-600 mb-3">{profile.age} años</p>
                <div className="flex flex-wrap gap-1">
                  {profile.interests.slice(0, 2).map((interest, idx) => (
                    <span key={idx} className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded">
                      {interest}
                    </span>
                  ))}
                  {profile.interests.length > 2 && (
                    <span className="text-xs text-gray-500">+{profile.interests.length - 2}</span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Stories Section */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Cuentos Recientes</h2>
          {profiles.length > 0 && (
            <Link
              href={`/dashboard/${profiles[0].id}/generar`}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-pink-500 text-white rounded-lg hover:shadow-lg transition-shadow"
            >
              <Sparkles className="w-5 h-5" />
              Generar Cuento
            </Link>
          )}
        </div>

        {stories.length === 0 ? (
          <div className="bg-gradient-to-br from-amber-50 to-pink-50 rounded-xl p-12 text-center border border-amber-200">
            <BookOpen className="w-12 h-12 text-amber-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Sin cuentos generados</h3>
            <p className="text-gray-600 mb-6">
              Crea un perfil y genera tu primer cuento personalizado
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {stories.map((story) => (
              <Link
                key={story.id}
                href={`/cuento/${story.id}`}
                className="group bg-white rounded-xl p-6 border border-gray-200 hover:border-primary-300 hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="text-4xl">{story.cover_emoji}</div>
                  {story.is_premium && <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full">Premium</span>}
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
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
