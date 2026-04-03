'use client'

import { supabase } from '@/lib/supabase'
import { isDemoMode } from '@/lib/demo'

interface SocialLoginButtonsProps {
  mode?: 'login' | 'register'
  onDemoToast?: () => void
}

export function SocialLoginButtons({ mode = 'login', onDemoToast }: SocialLoginButtonsProps) {
  const handleOAuth = async (provider: 'google' | 'apple') => {
    if (isDemoMode()) {
      onDemoToast?.()
      return
    }
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: window.location.origin + '/auth/callback',
      },
    })
  }

  const loginLabel = mode === 'register'
    ? { google: 'Registrarse con Google', apple: 'Registrarse con Apple' }
    : { google: 'Continuar con Google', apple: 'Continuar con Apple' }

  return (
    <div className="space-y-3">
      {/* Google */}
      <button
        type="button"
        onClick={() => handleOAuth('google')}
        className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-gray-800 font-semibold text-sm rounded-xl px-4 py-3.5 border border-gray-200 shadow-sm transition-all duration-200 hover:shadow-md active:scale-[0.98]"
      >
        {/* Google SVG logo */}
        <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden="true">
          <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
          <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
          <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
          <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
        </svg>
        {loginLabel.google}
      </button>

      {/* Apple */}
      <button
        type="button"
        onClick={() => handleOAuth('apple')}
        className="w-full flex items-center justify-center gap-3 bg-black hover:bg-gray-900 text-white font-semibold text-sm rounded-xl px-4 py-3.5 shadow-sm transition-all duration-200 hover:shadow-md active:scale-[0.98]"
      >
        {/* Apple SVG logo */}
        <svg width="18" height="22" viewBox="0 0 814 1000" aria-hidden="true" fill="white">
          <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-37.8-155.5-118.3C46.3 761.3 0 651.3 0 541.3c0-187.6 122.5-286.4 243.4-286.4 73.5 0 133.9 43 176.6 43 39.5 0 109.5-45.7 193.8-45.7 31.5 0 110.2 2.6 169.3 58.3zm-195-100.4c-37.1-44.4-90.7-76.1-151.2-76.1-71.7 0-145.7 48.7-191.9 112.1 29.7 31.5 62.7 70.5 62.7 138.3 0 66.2-26.9 122.3-65.7 161.2C272 583.8 337.8 609.3 400 609.3c64.3 0 120.8-36.2 166.1-36.2 44.4 0 92.6 31.5 147.7 31.5 26.3 0 52-5.8 76.1-16.3-12.9-37.1-40.4-75.7-72.5-112.8z" />
        </svg>
        {loginLabel.apple}
      </button>
    </div>
  )
}
