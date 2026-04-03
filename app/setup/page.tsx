'use client'

export const dynamic = 'force-dynamic'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/hooks/useAuth'
import { ChildProfileForm } from '@/components/ChildProfile'

export default function SetupPage() {
  const router = useRouter()
  const { user, loading } = useAuth()

  useEffect(() => {
    if (!loading && !user) router.push('/login')
  }, [loading, user, router])

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-kids">
        <div className="text-center">
          <div className="text-6xl float mb-4">🌟</div>
          <p className="text-violet-600 font-black text-lg">Preparando la magia...</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-kids overflow-hidden">
      {/* Floating decoration emojis */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <span className="absolute text-6xl top-10 left-8 float opacity-20" style={{ animationDelay: '0s' }}>🦕</span>
        <span className="absolute text-5xl top-20 right-12 float opacity-20" style={{ animationDelay: '1s' }}>🚀</span>
        <span className="absolute text-4xl bottom-20 left-16 float opacity-20" style={{ animationDelay: '2s' }}>🧜</span>
        <span className="absolute text-5xl bottom-32 right-8 float opacity-20" style={{ animationDelay: '0.5s' }}>🦸</span>
        <span className="absolute text-4xl top-1/2 left-4 float opacity-15" style={{ animationDelay: '1.5s' }}>⭐</span>
        <span className="absolute text-3xl top-1/3 right-4 float opacity-15" style={{ animationDelay: '2.5s' }}>✨</span>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-7xl float mb-4 select-none">✨</div>
          <h1 className="text-4xl md:text-5xl font-black text-gray-800 mb-3 font-display">
            ¡Bienvenido a{' '}
            <span className="gradient-text">Mi Mundo Mágico</span>!
          </h1>
          <p className="text-gray-600 text-lg max-w-md mx-auto leading-relaxed">
            Cuéntanos sobre el pequeño/a protagonista y crearemos cuentos{' '}
            <strong className="text-violet-600">totalmente personalizados</strong> para él/ella 🌟
          </p>
        </div>

        {/* Form card */}
        <div className="w-full max-w-lg">
          <div className="bg-white rounded-3xl shadow-2xl shadow-violet-200/50 p-8 border border-violet-100">
            <ChildProfileForm
              userId={user.id}
              onSuccess={() => router.push('/library')}
            />
          </div>
        </div>
      </div>
    </main>
  )
}
