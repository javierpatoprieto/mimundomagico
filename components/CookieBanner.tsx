'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('mmm-cookie-consent')
    if (!consent) setVisible(true)
  }, [])

  const accept = () => {
    localStorage.setItem('mmm-cookie-consent', 'accepted')
    setVisible(false)
  }

  const reject = () => {
    localStorage.setItem('mmm-cookie-consent', 'rejected')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-2xl shadow-black/10 p-5 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-4">
        <div className="flex-1">
          <p className="font-black text-gray-900 text-sm mb-1">🍪 Usamos cookies</p>
          <p className="text-gray-500 text-xs leading-relaxed">
            Usamos cookies necesarias para que el servicio funcione correctamente (autenticación y pagos seguros).
            No usamos cookies publicitarias.{' '}
            <Link href="/legal/cookies" className="text-violet-600 hover:underline font-semibold">
              Más información
            </Link>
          </p>
        </div>
        <div className="flex gap-3 flex-shrink-0">
          <button
            onClick={reject}
            className="px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-bold text-sm hover:bg-gray-50 transition-colors"
          >
            Solo necesarias
          </button>
          <button
            onClick={accept}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-black text-sm hover:opacity-90 transition-opacity shadow-md"
          >
            Aceptar ✓
          </button>
        </div>
      </div>
    </div>
  )
}
