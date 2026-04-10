import Link from 'next/link'
import { Check, X, Sparkles, Star } from 'lucide-react'

interface PricingFeature {
  text: string
  free: boolean | string
  premium: boolean | string
}

const FEATURES: PricingFeature[] = [
  { text: 'Cuentos clásicos personalizados', free: '7 cuentos', premium: '7 cuentos' },
  { text: 'Nombre del niño como protagonista', free: true, premium: true },
  { text: 'Cuentos generados con IA', free: '1 cuento', premium: 'Ilimitados' },
  { text: 'Personalización completa (intereses, amigos, mascotas)', free: true, premium: true },
  { text: 'Narración por voz (text-to-speech)', free: false, premium: true },
  { text: 'Modo nocturno para leer', free: true, premium: true },
  { text: 'Guardar cuentos favoritos', free: true, premium: true },
  { text: 'Múltiples perfiles de hijos', free: '1 perfil', premium: 'Ilimitados' },
  { text: 'Sin anuncios', free: false, premium: true },
  { text: 'Descarga de cuentos en PDF', free: false, premium: true },
]

export default function PricingTable() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
      {/* Free Plan */}
      <div className="card p-6 border-2 border-gray-200">
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">🌙</span>
            <h3 className="font-heading text-2xl text-gray-900">Gratis</h3>
          </div>
          <div className="flex items-end gap-1 mb-3">
            <span className="text-4xl font-heading text-gray-900">€0</span>
            <span className="text-gray-500 mb-1">/mes</span>
          </div>
          <p className="text-gray-500 text-sm">Perfecto para descubrir la magia</p>
        </div>

        <ul className="space-y-3 mb-6">
          {FEATURES.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-3 text-sm">
              {feature.free === false ? (
                <X className="w-4 h-4 text-gray-300 flex-shrink-0 mt-0.5" />
              ) : (
                <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
              )}
              <span className={feature.free === false ? 'text-gray-400' : 'text-gray-700'}>
                {feature.text}
                {typeof feature.free === 'string' && (
                  <span className="font-bold text-primary-600 ml-1">({feature.free})</span>
                )}
              </span>
            </li>
          ))}
        </ul>

        <Link href="/registro" className="btn-secondary w-full">
          Empieza gratis
        </Link>
      </div>

      {/* Premium Plan */}
      <div className="card p-6 border-2 border-primary-500 relative">
        {/* Popular badge */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="bg-gradient-to-r from-primary-600 to-magic-pink text-white text-xs font-bold px-4 py-1.5 rounded-full flex items-center gap-1 shadow-magic">
            <Star className="w-3 h-3 fill-white" />
            MÁS POPULAR
          </span>
        </div>

        <div className="mb-6 mt-2">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">✨</span>
            <h3 className="font-heading text-2xl text-gray-900">Premium</h3>
          </div>
          <div className="flex items-end gap-1 mb-3">
            <span className="text-4xl font-heading text-gray-900">€2,99</span>
            <span className="text-gray-500 mb-1">/mes</span>
          </div>
          <p className="text-gray-500 text-sm">Magia ilimitada cada noche</p>
        </div>

        <ul className="space-y-3 mb-6">
          {FEATURES.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-3 text-sm">
              {feature.premium === false ? (
                <X className="w-4 h-4 text-gray-300 flex-shrink-0 mt-0.5" />
              ) : (
                <Check className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
              )}
              <span className={feature.premium === false ? 'text-gray-400' : 'text-gray-700'}>
                {feature.text}
                {typeof feature.premium === 'string' && (
                  <span className="font-bold text-primary-600 ml-1">({feature.premium})</span>
                )}
              </span>
            </li>
          ))}
        </ul>

        <Link href="/registro" className="btn-primary w-full">
          <Sparkles className="w-4 h-4" />
          Empezar Premium
        </Link>
        <p className="text-center text-xs text-gray-400 mt-3">Cancela cuando quieras</p>
      </div>
    </div>
  )
}
