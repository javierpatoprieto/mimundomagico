'use client'

import { useEffect, useState } from 'react'
import { getSettingsClient } from '@/lib/site-settings'

export function PromoBanner() {
  const [text, setText] = useState('')
  const [color, setColor] = useState('amber')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    getSettingsClient().then(s => {
      if (s.promo_banner_enabled === 'true' && s.promo_banner_text) {
        setText(s.promo_banner_text)
        setColor(s.promo_banner_color || 'amber')
        setVisible(true)
      }
    })
  }, [])

  if (!visible) return null

  const colors: Record<string, string> = {
    amber: 'bg-amber-500 text-amber-950',
    violet: 'bg-violet-600 text-white',
    green: 'bg-green-500 text-green-950',
    red: 'bg-red-500 text-white',
  }

  return (
    <div className={`w-full py-2.5 px-4 text-center text-sm font-black ${colors[color] || colors.amber}`}>
      {text}
      <button onClick={() => setVisible(false)} className="ml-3 opacity-60 hover:opacity-100 text-lg leading-none">×</button>
    </div>
  )
}
