'use client'

export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export default function PremiumSuccessPage() {
  const router = useRouter()
  const [checking, setChecking] = useState(true)
  const [isPremium, setIsPremium] = useState(false)

  useEffect(() => {
    // Wait a bit for webhook to process, then check
    const check = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
        return
      }

      // Poll up to 10 seconds for premium to activate
      for (let i = 0; i < 5; i++) {
        await new Promise(r => setTimeout(r, 2000))
        const { data } = await supabase
          .from('profiles')
          .select('is_premium')
          .eq('id', user.id)
          .single()

        if (data?.is_premium) {
          setIsPremium(true)
          setChecking(false)
          return
        }
      }

      // Webhook may still be processing — show success anyway
      setChecking(false)
      setIsPremium(true)
    }

    check()
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-950 via-indigo-950 to-purple-950 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {checking ? (
          <>
            <div className="text-7xl mb-6 animate-bounce">👑</div>
            <h1 className="text-3xl font-black text-white mb-3">Activando Premium...</h1>
            <p className="text-white/60">Un momento, estamos preparando tu magia ✨</p>
          </>
        ) : (
          <>
            <div className="text-7xl mb-6 float">👑</div>
            <h1 className="text-4xl font-black text-white mb-3">¡Ya eres Premium!</h1>
            <p className="text-white/70 text-xl mb-8 leading-relaxed">
              Bienvenido/a al mundo de los cuentos ilimitados. 
              Ahora puedes crear historias únicas y mágicas para tus pequeños. 🌟
            </p>
            <div className="flex flex-col gap-3">
              <Link href="/create">
                <Button variant="premium" size="xl" className="w-full font-black text-lg py-5">
                  ✨ Crear mi primer cuento mágico
                </Button>
              </Link>
              <Link href="/library">
                <Button variant="secondary" size="lg" className="w-full font-black">
                  📚 Ver mi biblioteca
                </Button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
