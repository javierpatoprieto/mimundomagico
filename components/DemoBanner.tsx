'use client'

import { useState, useEffect } from 'react'
import { isDemoMode, exitDemoMode } from '@/lib/demo'
import { useRouter } from 'next/navigation'
import { X } from 'lucide-react'

export function DemoBanner() {
  const router = useRouter()
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    setVisible(isDemoMode() && !dismissed)
  }, [dismissed])

  if (!visible) return null

  const handleRegister = () => {
    exitDemoMode()
    router.push('/register')
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] bg-gradient-to-r from-purple-600 to-amber-500 text-white px-4 py-2.5 flex items-center justify-between shadow-lg">
      <div className="flex items-center gap-2 text-sm font-bold flex-1 justify-center">
        <span>🎭</span>
        <span>Modo Demo —</span>
        <button
          onClick={handleRegister}
          className="underline hover:no-underline font-black"
        >
          Regístrate para guardar tu progreso 💫
        </button>
      </div>
      <button
        onClick={() => setDismissed(true)}
        className="ml-3 p-1 rounded-full hover:bg-white/20 transition-colors shrink-0"
        aria-label="Cerrar"
      >
        <X size={16} />
      </button>
    </div>
  )
}
