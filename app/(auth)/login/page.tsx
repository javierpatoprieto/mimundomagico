'use client'
// v2

export const dynamic = 'force-dynamic'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { FloatingStars } from '@/components/ui/Stars'
import { Eye, EyeOff } from 'lucide-react'
import { enterDemoMode } from '@/lib/demo'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleDemo = () => {
    enterDemoMode()
    router.push('/library')
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError('Email o contraseña incorrectos. ¿Ya tienes cuenta?')
    } else {
      router.push('/dashboard')
      router.refresh()
    }

    setLoading(false)
  }


  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-950 via-indigo-950 to-purple-950 flex items-center justify-center px-4">
      <div className="fixed inset-0 pointer-events-none">
        <FloatingStars count={25} />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <div className="text-5xl mb-3 float select-none">🌟</div>
            <h1 className="text-2xl font-bold font-display text-white">Mi Mundo Mágico</h1>
          </Link>
          <p className="text-white/60 mt-2">Entra de nuevo al mundo de los cuentos ✨</p>
        </div>

        {/* Card */}
        <div className="glass rounded-3xl p-8 shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-white/80 mb-1.5">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                required
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/30 focus:outline-none focus:border-violet-400 focus:bg-white/15 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-white/80 mb-1.5">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full px-4 py-3 pr-12 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/30 focus:outline-none focus:border-violet-400 focus:bg-white/15 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-400/30 rounded-xl px-4 py-2.5 text-red-200 text-sm">
                {error}
              </div>
            )}

            <Button type="submit" loading={loading} size="lg" className="w-full">
              🌟 Entrar
            </Button>
          </form>

          <div className="mt-6 pt-5 border-t border-white/10 space-y-3">
            <p className="text-center text-white/40 text-xs font-bold uppercase tracking-wide">o explora sin registrarte</p>
            <Button
              type="button"
              onClick={handleDemo}
              variant="secondary"
              size="lg"
              className="w-full font-black"
            >
              🎭 Probar Demo
            </Button>
            <p className="text-center text-white/30 text-xs">
              Sin cuenta · Sin datos · Solo magia
            </p>
          </div>

          <p className="text-center text-white/50 text-sm mt-4">
            ¿Aún no tienes cuenta?{' '}
            <Link href="/register" className="text-violet-300 hover:text-violet-200 font-semibold transition-colors">
              Empieza gratis ✨
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
