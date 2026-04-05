'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { FloatingStars } from '@/components/ui/Stars'
import { Star, BookOpen, Wand2, Volume2, Heart, Shield, CheckCircle } from 'lucide-react'
import { useState, useEffect } from 'react'
import { getSettingsClient } from '@/lib/site-settings'
import type { ComponentType } from 'react'
import {
  CaperucitaIllustration,
  TresCerditosIllustration,
  PatitofeoIllustration,
  BlancaNievesIllustration,
  TortugaIllustration,
  CenizaIllustration,
  HanselIllustration,
  PersonalizadoIllustration,
} from '@/components/illustrations'

const DEMO_NAMES = ['Sofía', 'Lucas', 'Emma', 'Daniel', 'Valentina', 'Mateo', 'Isabela', 'Alejandro', 'Luna']

const CLASSIC_STORIES_PREVIEW: Array<{
  emoji: string
  title: string
  gradient: string
  tagline: string
  Illustration: ComponentType<{ className?: string }>
}> = [
  { emoji: '🧺', title: 'Caperucita Roja', gradient: 'from-red-400 to-rose-500', tagline: 'La aventura de {name} en el bosque', Illustration: CaperucitaIllustration },
  { emoji: '🏠', title: 'Los Tres Cerditos', gradient: 'from-orange-400 to-amber-500', tagline: '{name} y la casa más fuerte', Illustration: TresCerditosIllustration },
  { emoji: '🦢', title: 'El Patito Feo', gradient: 'from-blue-400 to-cyan-500', tagline: 'La historia mágica de {name}', Illustration: PatitofeoIllustration },
  { emoji: '🍎', title: 'Blancanieves', gradient: 'from-pink-400 to-rose-500', tagline: '{name} y los siete amigos', Illustration: BlancaNievesIllustration },
  { emoji: '🐢', title: 'La Tortuga y la Liebre', gradient: 'from-green-400 to-emerald-600', tagline: '{name} gana la gran carrera', Illustration: TortugaIllustration },
  { emoji: '👠', title: 'Cenicienta', gradient: 'from-fuchsia-400 to-pink-500', tagline: 'El baile mágico de {name}', Illustration: CenizaIllustration },
  { emoji: '🏡', title: 'Hansel y Gretel', gradient: 'from-purple-400 to-violet-600', tagline: '{name} y la casa de caramelo', Illustration: HanselIllustration },
]

const FLOATING_EMOJIS = [
  { emoji: '🦕', size: 'text-7xl', pos: 'top-20 left-[5%]', delay: '0s', duration: '7s' },
  { emoji: '🚀', size: 'text-6xl', pos: 'top-32 right-[8%]', delay: '1s', duration: '6s' },
  { emoji: '🧜', size: 'text-5xl', pos: 'top-[45%] left-[3%]', delay: '2s', duration: '8s' },
  { emoji: '🦸', size: 'text-6xl', pos: 'top-[55%] right-[5%]', delay: '0.5s', duration: '7s' },
  { emoji: '🪄', size: 'text-5xl', pos: 'bottom-[30%] left-[8%]', delay: '1.5s', duration: '9s' },
  { emoji: '🐾', size: 'text-4xl', pos: 'bottom-[20%] right-[10%]', delay: '2.5s', duration: '6s' },
  { emoji: '⭐', size: 'text-4xl', pos: 'top-[70%] left-[15%]', delay: '3s', duration: '5s' },
  { emoji: '✨', size: 'text-3xl', pos: 'top-[25%] right-[20%]', delay: '0.8s', duration: '4s' },
]

export default function LandingPage() {
  const [nameIndex, setNameIndex] = useState(0)
  const [visible, setVisible] = useState(true)
  const [settings, setSettings] = useState<Record<string,string>>({})

  useEffect(() => {
    getSettingsClient().then(s => setSettings(s))
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setNameIndex((i) => (i + 1) % DEMO_NAMES.length)
        setVisible(true)
      }, 300)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  const currentName = DEMO_NAMES[nameIndex]

  return (
    <main className="min-h-screen bg-gradient-to-b from-violet-950 via-indigo-950 to-purple-950 text-white overflow-hidden">
      {/* Stars background */}
      <div className="fixed inset-0 pointer-events-none">
        <FloatingStars count={50} />
      </div>

      {/* Floating emoji + SVG illustration characters */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {FLOATING_EMOJIS.map((item, i) => (
          <span
            key={i}
            className={`absolute ${item.size} ${item.pos} opacity-20 select-none`}
            style={{
              animation: `float ${item.duration} ease-in-out ${item.delay} infinite`,
            }}
          >
            {item.emoji}
          </span>
        ))}
        {/* Floating SVG illustration panels */}
        <div
          className="absolute top-[18%] left-[1%] w-24 opacity-10 rounded-2xl overflow-hidden"
          style={{ animation: 'float 8s ease-in-out 0s infinite', height: '72px' }}
        >
          <CaperucitaIllustration className="w-full h-full" />
        </div>
        <div
          className="absolute top-[40%] right-[0%] w-20 opacity-10 rounded-2xl overflow-hidden"
          style={{ animation: 'float 7s ease-in-out 1.5s infinite', height: '60px' }}
        >
          <PersonalizadoIllustration className="w-full h-full" />
        </div>
        <div
          className="absolute bottom-[25%] left-[0%] w-24 opacity-10 rounded-2xl overflow-hidden"
          style={{ animation: 'float 9s ease-in-out 2s infinite', height: '72px' }}
        >
          <TortugaIllustration className="w-full h-full" />
        </div>
        <div
          className="absolute bottom-[12%] right-[1%] w-20 opacity-10 rounded-2xl overflow-hidden"
          style={{ animation: 'float 6s ease-in-out 0.8s infinite', height: '60px' }}
        >
          <CenizaIllustration className="w-full h-full" />
        </div>
      </div>

      {/* ── Nav ──────────────────────────────────────────────────────────── */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-5 max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <span className="text-3xl">🌟</span>
          <span className="font-black text-xl font-display">Mi Mundo Mágico</span>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login" className="text-sm font-black text-white/70 hover:text-white transition-colors">
            Entrar
          </Link>
          <Link href="/register">
            <Button variant="secondary" size="sm" className="font-black">Empezar gratis</Button>
          </Link>
        </div>
      </nav>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative z-10 text-center px-6 pt-16 pb-16 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-5 py-2 text-sm text-white/80 mb-8 font-bold">
          <Star size={14} className="text-yellow-400 fill-yellow-400" />
          {settings.hero_badge || '7 cuentos clásicos GRATIS · 1 cuento personalizado de regalo'}
        </div>

        <h1 className="text-5xl md:text-7xl font-black font-display leading-tight mb-6">
          El cuento donde{' '}
          <span
            className={`inline-block text-yellow-400 text-glow transition-all duration-300 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
            }`}
          >
            {currentName}
          </span>
          <br />
          <span className="gradient-text">es el héroe</span>
        </h1>

        <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed">
          {settings.hero_subtitle || 'Los 7 cuentos clásicos adaptados con el nombre de tu hijo/a como protagonista. Gratis para siempre. Y con un cuento personalizado de regalo. ✨'}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/register">
            <Button size="xl" className="shadow-2xl shadow-violet-500/40 font-black text-lg px-8 py-5">
              🌟 Empieza la aventura GRATIS
            </Button>
          </Link>
          <Link href="/login">
            <Button variant="secondary" size="xl" className="font-black">
              Ya tengo cuenta →
            </Button>
          </Link>
        </div>

        <p className="text-sm text-white/40 mt-4 font-bold">
          Sin tarjeta de crédito · 7 cuentos gratis para siempre · 1 cuento personalizado de regalo
        </p>
      </section>

      {/* ── Story cards preview ───────────────────────────────────────────── */}
      <section className="relative z-10 px-6 pb-20 max-w-6xl mx-auto">
        <h2 className="text-center text-2xl font-black font-display mb-3 text-white/90">
          Los clásicos, con{' '}
          <span className="text-yellow-400">{currentName}</span>{' '}
          como protagonista 📚
        </h2>
        <p className="text-center text-white/50 text-sm mb-8 font-bold">Todos GRATIS · Con el nombre de tu hijo/a en cada página</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-3">
          {CLASSIC_STORIES_PREVIEW.map((story, i) => (
            <div
              key={story.title}
              className="group glass-dark rounded-3xl overflow-hidden hover:-translate-y-2 transition-all duration-300 cursor-default border border-white/10"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {/* Mini cover with SVG illustration */}
              <div className={`bg-gradient-to-br ${story.gradient} h-24 relative overflow-hidden`}>
                <story.Illustration className="w-full h-full group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute bottom-2 left-2">
                  <span className="badge-free text-xs">GRATIS</span>
                </div>
              </div>
              <div className="p-3">
                <p className="text-xs font-black text-white/90 leading-tight">{story.title}</p>
                <p className="text-xs text-yellow-300/60 mt-1 leading-tight">
                  {story.tagline.replace('{name}', currentName)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Free trial AI story CTA ───────────────────────────────────────── */}
      <section className="relative z-10 px-6 pb-20 max-w-3xl mx-auto">
        <div className="glass rounded-3xl p-8 border border-amber-400/30 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <span className="absolute text-8xl top-2 left-4 float">✨</span>
            <span className="absolute text-6xl bottom-2 right-4 float" style={{ animationDelay: '1s' }}>🌟</span>
          </div>
          <div className="relative">
            <div className="text-5xl mb-4 float select-none">🎁</div>
            <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 border border-amber-400/30 rounded-full px-4 py-1.5 text-sm font-black mb-4">
              ¡REGALO DE BIENVENIDA!
            </div>
            <h2 className="text-3xl font-black font-display mb-3">
              1 cuento mágico personalizado para{' '}
              <span className="text-yellow-400">{currentName}</span>
            </h2>
            <p className="text-white/70 mb-6 leading-relaxed">
              Al registrarte, obtienes un cuento mágico creado especialmente para tu hijo/a — 
              con sus temas favoritos, su mejor amigo/a, su mascota y su comida favorita. 🌟
            </p>
            <Link href="/register">
              <Button variant="premium" size="lg" className="font-black text-lg shadow-2xl shadow-amber-400/20">
                <Star size={18} fill="currentColor" />
                ¡Reclama tu cuento gratis!
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── How it works ──────────────────────────────────────────────────── */}
      <section className="relative z-10 px-6 pb-20 max-w-4xl mx-auto">
        <h2 className="text-center text-3xl font-black font-display mb-12">
          Así de fácil ✨
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              step: '1',
              emoji: '👶',
              title: 'Crea el perfil',
              desc: 'Nombre, edad, temas favoritos, amigos, mascota... en 2 minutos.',
            },
            {
              step: '2',
              emoji: '📚',
              title: 'Elige un cuento',
              desc: '7 clásicos gratis con tu hijo/a como protagonista. ¡Al instante!',
            },
            {
              step: '3',
              emoji: '✨',
              title: '¡Magia!',
              desc: 'Su nombre aparece en cada página. Cara de sorpresa garantizada.',
            },
          ].map((item) => (
            <div key={item.step} className="glass rounded-3xl p-8 text-center hover:-translate-y-1 transition-all">
              <div className="w-12 h-12 rounded-full bg-violet-600 flex items-center justify-center font-black text-xl mx-auto mb-4">
                {item.step}
              </div>
              <div className="text-5xl mb-4">{item.emoji}</div>
              <h3 className="font-black text-xl font-display mb-2 text-white">{item.title}</h3>
              <p className="text-white/60 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features grid ─────────────────────────────────────────────────── */}
      <section className="relative z-10 px-6 pb-20 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: <BookOpen size={28} className="text-violet-300" />,
              title: '7 clásicos gratis',
              desc: 'Caperucita, Los Tres Cerditos, El Patito Feo, Blancanieves, Tortuga y Liebre, Cenicienta, Hansel y Gretel — todos con tu hijo/a de protagonista.',
            },
            {
              icon: <Wand2 size={28} className="text-amber-400" />,
              title: 'Cuentos únicos para tu peque',
              desc: 'Con Premium creamos cuentos totalmente nuevos con los temas favoritos, amigos, mascota y comida preferida de tu hijo/a. Ningún niño tiene el mismo cuento.',
              premium: true,
            },
            {
              icon: <Volume2 size={28} className="text-pink-400" />,
              title: 'Narración en voz alta 🔊',
              desc: 'El cuento se lee solo en voz alta con una voz cálida y expresiva. Para las noches de "un cuento más, papi".',
            },
            {
              icon: <Heart size={28} className="text-red-400" />,
              title: 'Totalmente personalizado',
              desc: 'Su mejor amigo, su mascota, su comida favorita — todo aparece en el cuento. Los niños se emocionan.',
            },
            {
              icon: <Star size={28} className="text-yellow-400" fill="currentColor" />,
              title: 'Diseño para niños',
              desc: 'Letras grandes, botones enormes, colores vibrantes. Pensado para que los niños interactúen solos.',
            },
            {
              icon: <Shield size={28} className="text-green-400" />,
              title: 'Seguro y sin anuncios',
              desc: 'Sin publicidad, sin rastreo, sin contenido inapropiado. Solo cuentos mágicos para tus pequeños.',
            },
          ].map((f) => (
            <div key={f.title} className="glass rounded-3xl p-6 hover:-translate-y-1 transition-all">
              <div className="mb-4 flex items-start justify-between">
                {f.icon}
                {f.premium && (
                  <span className="text-xs font-black bg-amber-400/20 text-amber-300 border border-amber-400/30 px-2 py-0.5 rounded-full">
                    Premium
                  </span>
                )}

              </div>
              <h3 className="font-black text-lg font-display mb-2 text-white">{f.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Pricing ───────────────────────────────────────────────────────── */}
      <section className="relative z-10 px-6 pb-20 max-w-4xl mx-auto">
        <h2 className="text-center text-3xl font-black font-display mb-12">
          Simple y transparente 💎
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Free tier */}
          <div className="glass rounded-3xl p-8 border border-green-400/20">
            <div className="badge-free inline-block mb-4 text-base px-4 py-1.5">GRATIS</div>
            <div className="text-5xl font-black text-white mb-1">$0</div>
            <p className="text-white/50 text-sm mb-6 font-bold">Para siempre</p>
            <ul className="space-y-3 mb-8">
              {[
                '7 cuentos clásicos personalizados',
                '1 cuento personalizado de regalo',
                'Perfil del niño con avatar',
                'Modo noche para leer',
                'Favoritos y progreso',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-white/80 font-bold">
                  <CheckCircle size={16} className="text-green-400 mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Link href="/register">
              <Button variant="secondary" size="lg" className="w-full font-black">
                ✨ Empezar gratis
              </Button>
            </Link>
          </div>

          {/* Premium tier */}
          <div className="glass rounded-3xl p-8 border border-amber-400/30 relative overflow-hidden">
            <div className="absolute top-4 right-4 text-3xl float">👑</div>
            <div className="badge-premium inline-block mb-4 text-base px-4 py-1.5">PREMIUM</div>
            <div className="text-5xl font-black text-white mb-1">2<span className="text-3xl">,99€</span></div>
            <p className="text-white/50 text-sm mb-6 font-bold">al mes · Cancela cuando quieras</p>
            <ul className="space-y-3 mb-8">
              {[
                'Todo lo de gratis +',
                'Cuentos nuevos ilimitados solo para tu hijo/a',
                'Con sus amigos, mascota y comida favorita dentro',
                'Narración en voz alta incluida 🔊',
                'Un cuento nuevo cada semana',
                'Sin anuncios nunca',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-white/80 font-bold">
                  <Star size={16} className="text-amber-400 mt-0.5 shrink-0 fill-amber-400" />
                  {item}
                </li>
              ))}
            </ul>
            <Link href="/register">
              <Button variant="premium" size="lg" className="w-full font-black shadow-xl shadow-amber-400/20">
                <Star size={18} fill="currentColor" />
                Empezar Premium
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Emotional footer ──────────────────────────────────────────────── */}
      <footer className="relative z-10 text-center px-6 py-12 border-t border-white/10">
        <p className="text-4xl mb-3">🌙</p>
        <p className="text-white/50 text-base font-bold">
          {settings.footer_tagline || 'Para todas las noches de "un cuento más, papi". Con amor.'}
        </p>
        <p className="text-white/30 text-xs mt-4 font-bold">
          © {new Date().getFullYear()} Mi Mundo Mágico · Hecho con ❤️ para padres y sus pequeños
        </p>
        <div className="flex items-center justify-center gap-4 mt-4 flex-wrap">
          <Link href="/legal/aviso-legal" className="text-white/30 hover:text-white/60 text-xs font-bold transition-colors">Aviso Legal</Link>
          <span className="text-white/20 text-xs">·</span>
          <Link href="/legal/privacidad" className="text-white/30 hover:text-white/60 text-xs font-bold transition-colors">Privacidad</Link>
          <span className="text-white/20 text-xs">·</span>
          <Link href="/legal/terminos" className="text-white/30 hover:text-white/60 text-xs font-bold transition-colors">Términos</Link>
          <span className="text-white/20 text-xs">·</span>
          <Link href="/legal/cookies" className="text-white/30 hover:text-white/60 text-xs font-bold transition-colors">Cookies</Link>
          <span className="text-white/20 text-xs">·</span>
          <a href="mailto:legal@mimundomagico.es" className="text-white/30 hover:text-white/60 text-xs font-bold transition-colors">legal@mimundomagico.es</a>
        </div>
      </footer>
    </main>
  )
}
