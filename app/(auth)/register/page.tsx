'use client'

export const dynamic = 'force-dynamic'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { FloatingStars } from '@/components/ui/Stars'
import { Eye, EyeOff, CheckCircle } from 'lucide-react'
import { SocialLoginButtons } from '@/components/SocialLoginButtons'

export default function RegisterPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)
  const [demoToast, setDemoToast] = useState(false)

  const handleDemoToast = () => {
    setDemoToast(true)
    setTimeout(() => setDemoToast(false), 3500)
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres.')
      setLoading(false)
      return
    }

    const { data, error: signUpError } = await supabase.auth.signUp({ email, password })

    if (signUpError) {
      setError(signUpError.message)
      setLoading(false)
      return
    }

    // Create profile row
    if (data.user) {
      await supabase.from('profiles').insert({
        id: data.user.id,
        email,
        is_premium: false,
      })
    }

    // If email confirmation disabled, go straight to dashboard
    if (data.session) {
      router.push('/dashboard')
    } else {
      setDone(true)
    }

    setLoading(false)
  }

  if (done) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-violet-950 via-indigo-950 to-purple-950 flex items-center justify-center px-4">
        <div className="fixed inset-0 pointer-events-none">
          <FloatingStars count={30} />
        </div>
        <div className="relative z-10 glass rounded-3xl p-10 max-w-md w-full text-center">
          <CheckCircle size={60} className="text-green-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white font-display mb-3">¡Casi listo!</h2>
          <p className="text-white/70">
            Hemos enviado un enlace de confirmación a{' '}
            <strong className="text-violet-300">{email}</strong>.
            <br />
            Revisa tu bandeja de entrada para activar tu cuenta. ✉️
          </p>
          <Link href="/login" className="block mt-6">
            <Button variant="secondary" className="w-full">Ir a iniciar sesión</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-950 via-indigo-950 to-purple-950 flex items-center justify-center px-4 py-10">
      <div className="fixed inset-0 pointer-events-none">
        <FloatingStars count={25} />
      </div>

      {/* Demo toast */}
      {demoToast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-amber-500 text-white font-bold rounded-2xl px-6 py-3 shadow-2xl text-sm animate-bounce">
          En modo demo — regístrate para usar login social 🧙‍♂️
        </div>
      )}

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <div className="text-5xl mb-3 float select-none">🌟</div>
            <h1 className="text-2xl font-bold font-display text-white">Mi Mundo Mágico</h1>
          </Link>
          <p className="text-white/60 mt-2">Crea tu cuenta y empieza la aventura 🚀</p>
        </div>

        {/* Free tier reminder */}
        <div className="glass rounded-2xl px-4 py-3 mb-6 text-center border border-green-400/20">
          <p className="text-sm text-green-300">
            ✅ 5 cuentos personalizados <strong>completamente gratis</strong> · Sin tarjeta
          </p>
        </div>

        {/* Card */}
        <div className="glass rounded-3xl p-8 shadow-2xl">
          {/* Social register buttons */}
          <SocialLoginButtons mode="register" onDemoToast={handleDemoToast} />

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-white/15" />
            <span className="text-white/40 text-xs font-bold uppercase tracking-wider whitespace-nowrap">
              — o continúa con —
            </span>
            <div className="flex-1 h-px bg-white/15" />
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-white/80 mb-1.5">Email</label>
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
                Contraseña <span className="text-white/40 font-normal text-xs">(mín. 8 caracteres)</span>
              </label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Elige una contraseña segura"
                  required
                  minLength={8}
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
              🌟 Crear mi cuenta gratis
            </Button>

            <p className="text-center text-white/30 text-xs">
              Al registrarte aceptas nuestros términos de uso y política de privacidad.
            </p>
          </form>

          <p className="text-center text-white/50 text-sm mt-6">
            ¿Ya tienes cuenta?{' '}
            <Link href="/login" className="text-violet-300 hover:text-violet-200 font-semibold transition-colors">
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
