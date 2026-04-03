'use client'

import { useEffect, useState } from 'react'

interface Star {
  id: number
  x: number
  y: number
  size: number
  delay: number
  duration: number
}

export function FloatingStars({ count = 20 }: { count?: number }) {
  const [stars, setStars] = useState<Star[]>([])

  useEffect(() => {
    const generated = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 16 + 8,
      delay: Math.random() * 5,
      duration: Math.random() * 4 + 4,
    }))
    setStars(generated)
  }, [count])

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {stars.map((star) => (
        <span
          key={star.id}
          className="absolute select-none"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            fontSize: `${star.size}px`,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
            animation: `twinkle ${star.duration}s ease-in-out ${star.delay}s infinite`,
            opacity: 0.6,
          }}
        >
          {star.id % 3 === 0 ? '✦' : star.id % 3 === 1 ? '✧' : '⋆'}
        </span>
      ))}
    </div>
  )
}

export function SparkleText({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-block">
      {children}
      <span className="absolute -right-4 -top-2 text-yellow-400 twinkle text-sm">✦</span>
    </span>
  )
}
