'use client'

export const dynamic = 'force-dynamic'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

// Dashboard now redirects to /library (the main app page)
export default function DashboardPage() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/library')
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-kids">
      <div className="text-center">
        <div className="text-6xl float mb-4">🌟</div>
        <p className="text-violet-600 font-black text-lg">Cargando...</p>
      </div>
    </div>
  )
}
