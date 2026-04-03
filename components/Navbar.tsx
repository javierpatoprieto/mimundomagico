'use client'

import Link from 'next/link'
import { useAuth, useProfile } from '@/lib/hooks/useAuth'
import { Button } from '@/components/ui/Button'
import { Star, BookOpen, Wand2, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

export function Navbar() {
  const { user, signOut } = useAuth()
  const { profile } = useProfile(user?.id)
  const [menuOpen, setMenuOpen] = useState(false)

  const canUseAI = profile?.is_premium || !profile?.ai_trial_used

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-violet-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href={user ? '/library' : '/'} className="flex items-center gap-2 group">
          <span className="text-2xl group-hover:scale-110 transition-transform select-none">🌟</span>
          <span className="font-black text-lg gradient-text font-display">Mi Mundo Mágico</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-5">
          {user ? (
            <>
              <Link
                href="/library"
                className="flex items-center gap-1.5 text-sm font-black text-gray-600 hover:text-violet-600 transition-colors"
              >
                <BookOpen size={16} />
                Mis cuentos
              </Link>
              {canUseAI ? (
                <Link
                  href="/create"
                  className="flex items-center gap-1.5 text-sm font-black text-violet-600 hover:text-violet-700 transition-colors"
                >
                  <Wand2 size={16} />
                  {profile?.is_premium ? 'Crear cuento mágico' : '✨ Cuento personalizado gratis'}
                </Link>
              ) : null}
              {!profile?.is_premium && (
                <Link href="/premium">
                  <Button variant="premium" size="sm" className="font-black">
                    <Star size={14} fill="currentColor" />
                    Premium
                  </Button>
                </Link>
              )}
              <button
                onClick={signOut}
                className="text-sm text-gray-400 hover:text-gray-600 transition-colors font-bold"
              >
                Salir
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm font-black text-gray-600 hover:text-violet-600 transition-colors">
                Entrar
              </Link>
              <Link href="/register">
                <Button size="sm" className="font-black">✨ Empezar gratis</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden p-2 rounded-xl text-gray-600 hover:bg-violet-50 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          'md:hidden border-t border-violet-100 bg-white/95 backdrop-blur-md transition-all duration-300 overflow-hidden',
          menuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="px-4 py-4 space-y-3">
          {user ? (
            <>
              <Link
                href="/library"
                className="flex items-center gap-2 py-3 text-base font-black text-gray-700"
                onClick={() => setMenuOpen(false)}
              >
                <BookOpen size={18} className="text-violet-500" /> Mis cuentos
              </Link>
              {canUseAI && (
                <Link
                  href="/create"
                  className="flex items-center gap-2 py-3 text-base font-black text-violet-600"
                  onClick={() => setMenuOpen(false)}
                >
                  <Wand2 size={18} />
                  {profile?.is_premium ? 'Crear cuento mágico' : '✨ Cuento personalizado gratis'}
                </Link>
              )}
              {!profile?.is_premium && (
                <Link href="/premium" onClick={() => setMenuOpen(false)}>
                  <Button variant="premium" size="sm" className="w-full font-black">
                    <Star size={14} fill="currentColor" />
                    Premium — $4,99/mes
                  </Button>
                </Link>
              )}
              <button
                onClick={() => { signOut(); setMenuOpen(false) }}
                className="py-3 text-sm text-gray-400 w-full text-left font-bold"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="block py-3 text-base font-black text-gray-700" onClick={() => setMenuOpen(false)}>
                Iniciar sesión
              </Link>
              <Link href="/register" onClick={() => setMenuOpen(false)}>
                <Button size="sm" className="w-full font-black">✨ Empezar gratis</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
