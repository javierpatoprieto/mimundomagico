'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('[app error]', error)
  }, [error])

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-950 to-purple-950 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-7xl mb-6">🌙</div>
        <h1 className="text-3xl font-black text-white mb-3">¡Ups! Algo salió mal</h1>
        <p className="text-white/60 mb-8 leading-relaxed">
          No te preocupes, tus cuentos están a salvo. Intenta recargar la página.
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white font-black rounded-2xl transition-colors"
          >
            Reintentar
          </button>
          <Link
            href="/library"
            className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-black rounded-2xl transition-colors"
          >
            Ir a mis cuentos
          </Link>
        </div>
      </div>
    </div>
  )
}
