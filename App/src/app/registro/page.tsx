'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, Sparkles, ArrowLeft } from 'lucide-react'
import { getSupabaseClient } from '@/lib/supabase'

export default function RegistroPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden')
      return
    }
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres')
      return
    }

    setLoading(true)
    try {
      const supabase = getSupabaseClient()
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
        },
      })

      if (signUpError) {
        if (signUpError.message.includes('already registered')) {
          setError('Este email ya está registrado. ¿Quieres iniciar sesión?')
        } else {
          setError(signUpError.message)
        }
        return
      }

      setSuccess(true)
    } catch {
      setError('Ocurrió un error inesperado. Inténtalo de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white flex items-center justify-center px-4">
        <div className="card max-w-md w-full p-8 text-center">
          <span className="text-6xl block mb-4 animate-bounce-slow">✉️</span>
          <h2 className="font-heading text-3xl text-gray-900 mb-3">¡Revisa tu email!</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Te hemos enviado un enlace mágico a <strong>{email}</strong>.
            Haz clic en él para confirmar tu cuenta y empezar la aventura.
          </p>
          <Link href="/login" className="btn-primary w-full">
            <Sparkles className="w-4 h-4" />
            Ir a iniciar sesión
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Back link */}
        <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary-600 font-medium mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Volver al inicio
        </Link>

        <div className="card p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <span className="text-3xl">🌟</span>
              <span className="font-heading text-2xl text-primary-600">MiMundoMagico</span>
            </Link>
            <h1 className="font-heading text-3xl text-gray-900 mb-2">Crea tu cuenta</h1>
            <p className="text-gray-500">Empieza gratis. No se requiere tarjeta.</p>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-2xl px-4 py-3 mb-6 text-sm font-medium">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="label">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="tu@email.com"
                required
                autoComplete="email"
              />
            </div>

            <div>
              <label htmlFor="password" className="label">Contraseña</label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pr-12"
                  placeholder="Mínimo 6 caracteres"
                  required
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="label">Confirmar contraseña</label>
              <input
                id="confirmPassword"
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input-field"
                placeholder="Repite tu contraseña"
                required
                autoComplete="new-password"
              />
            </div>

            <button type="submit" className="btn-primary w-full text-base py-3.5" disabled={loading}>
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creando cuenta...
                </span>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Crear cuenta gratis
                </>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            ¿Ya tienes cuenta?{' '}
            <Link href="/login" className="text-primary-600 font-bold hover:text-primary-700">
              Inicia sesión
            </Link>
          </p>

          <p className="text-center text-xs text-gray-400 mt-4 leading-relaxed">
            Al registrarte aceptas nuestros{' '}
            <Link href="/terminos" className="underline hover:text-gray-600">Términos de uso</Link>
            {' '}y{' '}
            <Link href="/privacidad" className="underline hover:text-gray-600">Política de privacidad</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
