'use client'

import { useState, useEffect } from 'react'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Register service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').catch(console.error)
    }

    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      // Only show if not dismissed before
      const dismissed = localStorage.getItem('mmm-pwa-dismissed')
      if (!dismissed) setVisible(true)
    }

    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return
    await deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted') {
      setVisible(false)
    }
    setDeferredPrompt(null)
  }

  const handleDismiss = () => {
    localStorage.setItem('mmm-pwa-dismissed', '1')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-20 left-4 right-4 md:left-auto md:right-6 md:w-80 z-50">
      <div className="bg-gradient-to-br from-violet-700 to-purple-800 rounded-2xl shadow-2xl p-4 text-white">
        <button
          onClick={handleDismiss}
          className="absolute top-3 right-3 text-white/60 hover:text-white text-lg leading-none"
          aria-label="Cerrar"
        >
          ×
        </button>
        <div className="flex items-center gap-3 mb-3">
          <img src="/icons/icon-192.png" alt="Mi Mundo Mágico" className="w-12 h-12 rounded-xl" />
          <div>
            <p className="font-black text-sm">¡Instala la app! 📲</p>
            <p className="text-white/70 text-xs">Acceso rápido desde tu móvil</p>
          </div>
        </div>
        <button
          onClick={handleInstall}
          className="w-full bg-white text-violet-700 font-black text-sm py-2.5 rounded-xl hover:bg-violet-50 transition-colors"
        >
          Añadir a pantalla de inicio
        </button>
      </div>
    </div>
  )
}
