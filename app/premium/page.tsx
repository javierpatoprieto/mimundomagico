'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth, useProfile } from '@/lib/hooks/useAuth'
import { Navbar } from '@/components/Navbar'
import { Button } from '@/components/ui/Button'
import { FloatingStars } from '@/components/ui/Stars'
import {
  Star,
  Wand2,
  Volume2,
  BookOpen,
  Shield,
  Sparkles,
  CheckCircle,
  XCircle,
} from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'

const PREMIUM_FEATURES = [
  {
    icon: <Wand2 size={24} className="text-violet-400" />,
    title: 'Cuentos mágicos ilimitados',
    desc: 'Creamos historias únicas para tu hijo/a — con sus temas, amigos, mascota y comida favorita. Cada cuento, irrepetible.',
    emoji: '🪄',
  },
  {
    icon: <Volume2 size={24} className="text-pink-400" />,
    title: 'Narración en audio 🔊',
    desc: 'El cuento se lee solo en voz alta. Para las noches de "un cuento más, papi".',
    emoji: '🔊',
    
  },
  {
    icon: <BookOpen size={24} className="text-blue-400" />,
    title: 'Biblioteca creciente',
    desc: 'Nuevos cuentos cada semana. Tu biblioteca siempre crece.',
    emoji: '📚',
  },
  {
    icon: <Star size={24} className="text-amber-400 fill-amber-400" />,
    title: 'Personalización total',
    desc: 'El mejor amigo, la mascota, la comida favorita — todo en el cuento. Cara de sorpresa garantizada.',
    emoji: '✨',
  },
  {
    icon: <Shield size={24} className="text-green-400" />,
    title: 'Sin anuncios, siempre',
    desc: 'Experiencia mágica y limpia. Solo cuentos, nada más.',
    emoji: '🛡️',
  },
  {
    icon: <Sparkles size={24} className="text-fuchsia-400" />,
    title: 'Temas ilimitados',
    desc: 'Dinosaurios, espacio, sirenas, robots, piratas... ¡lo que quiera el/la peque!',
    emoji: '🦕',
  },
]

const COMPARISON = [
  { feature: '7 cuentos clásicos personalizados', free: true, premium: true },
  { feature: '1 cuento personalizado de regalo', free: true, premium: true },
  { feature: 'Perfil con avatar y preferencias', free: true, premium: true },
  { feature: 'Favoritos y progreso de lectura', free: true, premium: true },
  { feature: 'Modo noche y luz cálida', free: true, premium: true },
  { feature: 'Cuentos mágicos ilimitados', free: false, premium: true },
  { feature: 'Mejor amigo en la historia', free: false, premium: true },
  { feature: 'Mascota como personaje', free: false, premium: true },
  { feature: 'Comida favorita en la aventura', free: false, premium: true },
  { feature: 'Narración en audio 🔊 (Premium)', free: false, premium: true },
  { feature: 'Nuevos cuentos cada semana', free: false, premium: true },
  { feature: 'Sin publicidad nunca', free: false, premium: true },
]

function PremiumContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user } = useAuth()
  const { profile } = useProfile(user?.id)
  const [checkoutLoading, setCheckoutLoading] = useState(false)
  const [cancelled, setCancelled] = useState(false)

  useEffect(() => {
    if (searchParams.get('cancelled') === 'true') setCancelled(true)
  }, [searchParams])

  const handleCheckout = async () => {
    if (!user) return router.push('/register')
    setCheckoutLoading(true)
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, email: user.email }),
      })
      const { url } = await res.json()
      if (url) window.location.href = url
    } catch {
      setCheckoutLoading(false)
    }
  }

  const isAlreadyPremium = profile?.is_premium

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-violet-950 via-indigo-950 to-purple-950 pt-16">
        <div className="fixed inset-0 pointer-events-none">
          <FloatingStars count={40} />
        </div>

        {/* Floating emoji deco */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {['🦕', '🚀', '🧜', '🦸', '🪄', '🤖'].map((e, i) => (
            <span key={i} className="absolute text-5xl float opacity-10" style={{
              left: `${5 + i * 17}%`,
              top: `${10 + (i % 2) * 60}%`,
              animationDelay: `${i * 0.8}s`,
            }}>{e}</span>
          ))}
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 py-16">

          {cancelled && (
            <div className="glass border border-yellow-400/30 rounded-2xl px-5 py-3 mb-8 text-center text-yellow-200 text-sm font-bold">
              Pago cancelado. Sin cargos. Puedes intentarlo cuando quieras. 💛
            </div>
          )}

          {isAlreadyPremium && (
            <div className="glass border border-green-400/30 rounded-2xl px-5 py-4 mb-8 text-center">
              <CheckCircle size={28} className="text-green-400 mx-auto mb-2" />
              <p className="text-white font-black text-lg">¡Ya eres Premium! 👑</p>
              <p className="text-white/60 text-sm mt-1 font-bold">Tienes acceso a todas las funciones mágicas.</p>
              <Link href="/library" className="block mt-3">
                <Button variant="secondary" size="sm" className="font-black">Ir a mis cuentos</Button>
              </Link>
            </div>
          )}

          {/* Hero */}
          <div className="text-center mb-14">
            <div className="text-7xl float mb-5 select-none">👑</div>
            <h1 className="text-4xl md:text-6xl font-black font-display text-white mb-5 leading-tight">
              Cuentos únicos,<br />
              <span className="text-yellow-400 text-glow">creados solo para él</span>
            </h1>
            <p className="text-white/70 text-xl max-w-lg mx-auto font-bold leading-relaxed">
              Por menos de un café, aventuras infinitas cada semana para tu pequeño/a héroe. 🌟
            </p>
          </div>

          {/* Pricing card */}
          <div className="flex justify-center mb-16">
            <div className="glass rounded-3xl p-10 max-w-sm w-full text-center border border-amber-400/30 shadow-2xl shadow-amber-400/10 relative overflow-hidden">
              <div className="absolute top-4 right-4 text-3xl float">✨</div>
              <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 border border-amber-400/30 rounded-full px-5 py-2 text-sm font-black mb-6">
                <Star size={14} fill="currentColor" /> PREMIUM
              </div>
              <div className="mb-6">
                <span className="text-7xl font-black text-white font-display">$4<span className="text-4xl">,99</span></span>
                <span className="text-white/50 text-xl">/mes</span>
                <p className="text-white/40 text-sm mt-2 font-bold">Cancela cuando quieras · Sin permanencia</p>
              </div>
              {!isAlreadyPremium && (
                <Button variant="premium" size="xl" className="w-full mb-4 font-black text-lg py-5 shadow-xl shadow-amber-400/30" loading={checkoutLoading} onClick={handleCheckout}>
                  <Sparkles size={22} />
                  {user ? '¡Empezar Premium!' : 'Registrarse y empezar'}
                </Button>
              )}
              <p className="text-white/40 text-xs font-bold">Pago seguro con Stripe · SSL</p>
            </div>
          </div>

          {/* Features grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
            {PREMIUM_FEATURES.map((f) => (
              <div key={f.title} className="glass rounded-3xl p-6 hover:-translate-y-1 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{f.emoji}</span>
                    {f.icon}
                  </div>

                </div>
                <h3 className="font-black text-white font-display text-lg mb-2">{f.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed font-bold">{f.desc}</p>
              </div>
            ))}
          </div>

          {/* Comparison table */}
          <div className="glass rounded-3xl overflow-hidden mb-16">
            <div className="grid grid-cols-3 text-center text-sm font-black py-5 px-6 border-b border-white/10">
              <span className="text-white/60 text-left">Funcionalidad</span>
              <span className="text-white/60">Gratis</span>
              <span className="text-amber-300">Premium 👑</span>
            </div>
            {COMPARISON.map((row, i) => (
              <div key={row.feature} className={cn('grid grid-cols-3 items-center text-sm py-3.5 px-6', i % 2 === 0 ? 'bg-white/5' : '')}>
                <span className="text-white/80 font-bold">{row.feature}</span>
                <span className="flex justify-center">
                  {row.free ? <CheckCircle size={18} className="text-green-400" /> : <XCircle size={18} className="text-white/20" />}
                </span>
                <span className="flex justify-center">
                  <CheckCircle size={18} className="text-amber-400" />
                </span>
              </div>
            ))}
          </div>

          {/* Final CTA */}
          {!isAlreadyPremium && (
            <div className="text-center">
              <Button variant="premium" size="xl" loading={checkoutLoading} onClick={handleCheckout} className="shadow-2xl shadow-amber-400/20 font-black text-xl px-10 py-6">
                <Star size={22} fill="currentColor" />
                Empieza Premium — 2,99€/mes
              </Button>
              <p className="text-white/40 text-sm mt-4 font-bold">Sin compromiso · Cancela en 1 clic · Reembolso 7 días</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default function PremiumPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-violet-950 to-purple-950">
        <div className="text-7xl float">👑</div>
      </div>
    }>
      <PremiumContent />
    </Suspense>
  )
}
