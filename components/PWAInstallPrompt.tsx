'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

function isIOS() {
  if (typeof navigator === 'undefined') return false
  return /iphone|ipad|ipod/i.test(navigator.userAgent)
}

function isInStandaloneMode() {
  if (typeof window === 'undefined') return false
  return ('standalone' in window.navigator) && (window.navigator as Navigator & { standalone?: boolean }).standalone
}

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [visible, setVisible] = useState(false)
  const [ios, setIos] = useState(false)

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(console.error)
    }

    const dismissed = localStorage.getItem('mmm-pwa-dismissed')
    if (dismissed) return
    if (isInStandaloneMode()) return

    if (isIOS()) {
      setIos(true)
      setVisible(true)
      return
    }

    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      setVisible(true)
    }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return
    await deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted') setVisible(false)
    setDeferredPrompt(null)
  }

  const handleDismiss = () => {
    localStorage.setItem('mmm-pwa-dismissed', '1')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-20 left-4 right-4 md:left-auto md:right-6 md:w-80 z-50">
      <div className="bg-gradient-to-br from-violet-700 to-purple-800 rounded-2xl shadow-2xl p-4 text-white relative">
        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 text-white/60 hover:text-white text-lg leading-none"
          aria-label="Cerrar"
        >
          ×
        </button>
        <div className="flex items-center gap-3 mb-3">
          <Image src="/icons/icon-192.png" alt="Mi Mundo Mágico" width={48} height={48} className="rounded-xl" />
          <div>
            <p className="font-black text-sm">¡Instala la app! 📲</p>
            <p className="text-white/70 text-xs">Acceso rápido desde tu móvil</p>
          </div>
        </div>
        {ios ? (
          <div className="bg-white/10 rounded-xl p-3 text-xs text-white/90 leading-relaxed">
            <p className="font-black mb-1">En Safari:</p>
            <p>1. Pulsa el botón “Compartir” 👇</p>
            <p>2. Selecciona <strong>“Añadir a pantalla de inicio”</strong></p>
            <p className="mt-2 text-white/50">*(Abre esta página en Safari si usas Chrome)</p>
          </div>
        ) : (
          <button
            onClick={handleInstall}
            className="w-full bg-white text-violet-700 font-black text-sm py-2.5 rounded-xl hover:bg-violet-50 transition-colors"
          >
            Añadir a pantalla de inicio
          </button>
        )}
      </div>
    </div>
  )
}
