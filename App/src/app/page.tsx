import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import StoryCard from '@/components/StoryCard'
import PricingTable from '@/components/PricingTable'
import { CLASSIC_STORIES } from '@/lib/classic-stories'
import { Sparkles, BookOpen, Stars, ArrowRight } from 'lucide-react'

const HOW_IT_WORKS = [
  {
    step: '01',
    emoji: '👤',
    title: 'Crea el perfil',
    description: 'Introduce el nombre, edad, intereses, amigos y mascotas de tu pequeño.',
    color: 'bg-primary-100 text-primary-700',
  },
  {
    step: '02',
    emoji: '📖',
    title: 'Elige el cuento',
    description: 'Selecciona entre 7 clásicos personalizados o genera uno único con IA.',
    color: 'bg-pink-100 text-pink-700',
  },
  {
    step: '03',
    emoji: '✨',
    title: 'La magia ocurre',
    description: 'En segundos tienes un cuento donde tu hijo es el protagonista absoluto.',
    color: 'bg-amber-100 text-amber-700',
  },
]

const TESTIMONIALS = [
  {
    name: 'María García',
    role: 'Mamá de Lucas, 5 años',
    emoji: '👩',
    text: '"Lucas se emociona cada noche. ¡Dice que él es el héroe de verdad! La plataforma es increíble."',
    stars: 5,
  },
  {
    name: 'Carlos Rodríguez',
    role: 'Papá de Sofía, 7 años',
    emoji: '👨',
    text: '"Sofía ya no quiere que le lea otros cuentos. Pide el suyo personalizado cada noche. ¡Éxito total!"',
    stars: 5,
  },
  {
    name: 'Ana Martínez',
    role: 'Mamá de Pablo, 4 años',
    emoji: '👩‍🦱',
    text: '"La narración por voz es perfecta para cuando estoy cansada. Pablo la escucha solo y se queda dormido."',
    stars: 5,
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary-50 via-white to-white pt-16 pb-24">
        {/* Background stars decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          {[
            { top: '8%', left: '5%', size: 'text-2xl', delay: '0s' },
            { top: '15%', left: '88%', size: 'text-xl', delay: '0.5s' },
            { top: '35%', left: '92%', size: 'text-3xl', delay: '1s' },
            { top: '60%', left: '3%', size: 'text-2xl', delay: '0.3s' },
            { top: '75%', left: '90%', size: 'text-xl', delay: '0.8s' },
            { top: '20%', left: '15%', size: 'text-sm', delay: '1.2s' },
            { top: '50%', left: '8%', size: 'text-lg', delay: '0.6s' },
            { top: '10%', left: '70%', size: 'text-sm', delay: '1.5s' },
          ].map((star, i) => (
            <span
              key={i}
              className="absolute animate-twinkle"
              style={{ top: star.top, left: star.left, fontSize: star.size === 'text-sm' ? '0.875rem' : star.size === 'text-lg' ? '1.125rem' : star.size === 'text-xl' ? '1.25rem' : star.size === 'text-2xl' ? '1.5rem' : '1.875rem', animationDelay: star.delay }}
            >
              ⭐
            </span>
          ))}
          {/* Magic circles */}
          <div className="absolute top-1/4 right-10 w-64 h-64 bg-primary-200/30 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-48 h-48 bg-magic-pink/20 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-bold mb-8 animate-float">
            <Sparkles className="w-4 h-4" />
            Cuentos mágicos personalizados con IA
            <Sparkles className="w-4 h-4" />
          </div>

          {/* Headline */}
          <h1 className="font-heading text-5xl md:text-7xl text-gray-900 leading-tight mb-6 text-balance">
            El cuento donde{' '}
            <span className="magic-text">[nombre]</span>{' '}
            <br className="hidden md:block" />
            es el{' '}
            <span className="relative">
              héroe
              <span className="absolute -top-2 -right-8 text-3xl animate-bounce-slow">🦸</span>
            </span>
          </h1>

          <p className="section-subtitle max-w-2xl mx-auto mb-10">
            Crea cuentos de hadas personalizados donde tu hijo o hija es el protagonista absoluto.
            Con sus intereses, amigos, mascotas y comidas favoritas. ✨ Magia a la hora de dormir.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link href="/registro" className="btn-primary text-lg px-8 py-4 w-full sm:w-auto">
              <Sparkles className="w-5 h-5" />
              Empieza gratis — ¡Es magia!
            </Link>
            <Link href="/login" className="btn-secondary text-lg px-8 py-4 w-full sm:w-auto">
              Ya tengo cuenta
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Social proof */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {['👦', '👧', '🧒', '👦', '👧'].map((emoji, i) => (
                  <span
                    key={i}
                    className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center text-base border-2 border-white"
                  >
                    {emoji}
                  </span>
                ))}
              </div>
              <span className="font-semibold">+2.500 niños leyendo</span>
            </div>
            <div className="flex items-center gap-1">
              {'⭐⭐⭐⭐⭐'.split('').map((s, i) => (
                <span key={i} className="text-amber-400">{s}</span>
              ))}
              <span className="font-semibold ml-1">4.9/5 (320 reseñas)</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CLASSIC STORIES ===== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
              <BookOpen className="w-4 h-4" />
              7 Clásicos incluidos gratis
            </div>
            <h2 className="section-title mb-4">
              Cuentos clásicos,{' '}
              <span className="magic-text">protagonistas únicos</span>
            </h2>
            <p className="section-subtitle max-w-xl mx-auto">
              Los cuentos que conoces y amas, reescritos con el nombre de tu hijo como protagonista.
              Gratis para siempre.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {CLASSIC_STORIES.map((story) => (
              <StoryCard
                key={story.id}
                story={story}
                childName="[tu hijo]"
                isClassic={true}
                isLocked={false}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section id="como-funciona" className="py-20 bg-gradient-to-b from-primary-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title mb-4">
              La magia en{' '}
              <span className="magic-text">3 pasos</span>
            </h2>
            <p className="section-subtitle max-w-xl mx-auto">
              En menos de 2 minutos tienes el cuento perfecto listo para la hora de dormir.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {HOW_IT_WORKS.map((step, idx) => (
              <div key={idx} className="relative text-center group">
                {/* Connector line */}
                {idx < HOW_IT_WORKS.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary-200 to-primary-100 -translate-y-1/2" aria-hidden="true" />
                )}

                <div className="relative z-10">
                  <div className="w-24 h-24 mx-auto mb-6 bg-white rounded-3xl shadow-card group-hover:shadow-card-hover transition-all duration-300 flex items-center justify-center group-hover:-translate-y-1">
                    <span className="text-4xl">{step.emoji}</span>
                  </div>
                  <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-3 ${step.color}`}>
                    Paso {step.step}
                  </div>
                  <h3 className="font-heading text-2xl text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/registro" className="btn-primary text-lg px-8 py-4">
              <Sparkles className="w-5 h-5" />
              Crear mi primer cuento gratis
            </Link>
          </div>
        </div>
      </section>

      {/* ===== AI FEATURE HIGHLIGHT ===== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card bg-gradient-to-br from-primary-600 to-primary-800 text-white p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 bg-white/20 text-white px-4 py-2 rounded-full text-sm font-bold mb-6">
                <Stars className="w-4 h-4" />
                Inteligencia Artificial
              </div>
              <h2 className="font-heading text-4xl md:text-5xl text-white leading-tight mb-4">
                Cuentos únicos,<br />generados al instante
              </h2>
              <p className="text-primary-100 text-lg leading-relaxed mb-6">
                Nuestra IA crea historias completamente originales donde el protagonista tiene
                el nombre de tu hijo, sus intereses favoritos, sus amigos del cole y hasta su
                mascota 🐾. Cada cuento es diferente y especial.
              </p>
              <div className="flex flex-wrap gap-3">
                {['🦕 Dinosaurios', '👸 Princesas', '🚀 Espacio', '⚽ Deportes', '🦁 Animales', '🪄 Magia'].map((tag) => (
                  <span key={tag} className="bg-white/20 text-white px-3 py-1.5 rounded-full text-sm font-semibold">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <div className="w-64 h-64 bg-white/10 rounded-3xl flex items-center justify-center">
                <span className="text-8xl animate-float">🪄</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-20 bg-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title mb-4">
              Familias que ya{' '}
              <span className="magic-text">viven la magia</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, idx) => (
              <div key={idx} className="card p-6">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <span key={i} className="text-amber-400">⭐</span>
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed mb-4 italic">{t.text}</p>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{t.emoji}</span>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                    <p className="text-gray-500 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PRICING ===== */}
      <section id="precios" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title mb-4">
              Precios{' '}
              <span className="magic-text">mágicos</span>
            </h2>
            <p className="section-subtitle max-w-xl mx-auto">
              Empieza gratis hoy mismo. Actualiza cuando quieras para desbloquear todo el potencial.
            </p>
          </div>
          <PricingTable />
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="py-20 bg-gradient-to-b from-primary-50 to-primary-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-6xl animate-float block mb-6">🌙</span>
          <h2 className="section-title mb-4">
            Esta noche,{' '}
            <span className="magic-text">la magia empieza</span>
          </h2>
          <p className="section-subtitle mb-8">
            Únete a miles de familias que hacen de la hora de dormir un momento mágico e inolvidable.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/registro" className="btn-primary text-lg px-8 py-4 w-full sm:w-auto">
              <Sparkles className="w-5 h-5" />
              Empieza gratis ahora
            </Link>
            <Link href="/cuentos" className="btn-ghost text-lg px-8 py-4 w-full sm:w-auto">
              Ver todos los cuentos
            </Link>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Sin tarjeta de crédito. Sin compromiso. Solo magia. ✨
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
