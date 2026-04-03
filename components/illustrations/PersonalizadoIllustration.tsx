export function PersonalizadoIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 150"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Libro mágico con destellos"
    >
      {/* Magic background */}
      <rect width="200" height="150" fill="#1A0A3A" />
      {/* Stars scattered */}
      {[
        [20, 15], [50, 8], [80, 20], [120, 12], [150, 25],
        [180, 10], [170, 40], [35, 40], [165, 70], [25, 80],
        [190, 85], [10, 50],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 1.5 : 1} fill={i % 2 === 0 ? '#FFD700' : 'white'} opacity="0.8" />
      ))}
      {/* Magic aura */}
      <ellipse cx="100" cy="100" rx="60" ry="45" fill="#6B21A8" opacity="0.4" />
      <ellipse cx="100" cy="100" rx="45" ry="33" fill="#7C3AED" opacity="0.3" />
      {/* Book */}
      <rect x="58" y="68" width="84" height="64" rx="5" fill="#4C1D95" />
      {/* Book spine */}
      <rect x="58" y="68" width="10" height="64" rx="3" fill="#3B0764" />
      {/* Book cover decoration */}
      <rect x="72" y="74" width="64" height="52" rx="3" fill="#6D28D9" />
      {/* Star on cover */}
      <path
        d="M100 82 L103 92 L113 92 L105 98 L108 108 L100 102 L92 108 L95 98 L87 92 L97 92 Z"
        fill="#FFD700"
      />
      {/* Book pages side */}
      <rect x="68" y="72" width="6" height="58" fill="#FFF8DC" opacity="0.8" />
      {/* Big sparkles around the book */}
      {/* Top left sparkle */}
      <path d="M48 52 L50 44 L52 52 L48 52 Z" fill="#FFD700" />
      <path d="M46 48 L54 48" stroke="#FFD700" strokeWidth="1.5" />
      {/* Top right sparkle */}
      <path d="M148 45 L151 36 L154 45 L148 45 Z" fill="#C8A0FF" />
      <path d="M146 40 L156 40" stroke="#C8A0FF" strokeWidth="1.5" />
      {/* Bottom left sparkle */}
      <path d="M38 118 L41 110 L44 118 L38 118 Z" fill="#C8A0FF" />
      {/* Bottom right sparkle */}
      <path d="M158 120 L161 112 L164 120 L158 120 Z" fill="#FFD700" />
      {/* Right side sparkle */}
      <path d="M165 85 L168 77 L171 85 L165 85 Z" fill="#FFD700" />
      <path d="M163 81 L173 81" stroke="#FFD700" strokeWidth="1.5" />
      {/* Floating letters */}
      <text x="60" y="50" fontSize="12" fill="#FFD700" fontFamily="serif" opacity="0.7">✨</text>
      <text x="145" y="65" fontSize="10" fill="#C8A0FF" fontFamily="serif" opacity="0.7">★</text>
      <text x="30" y="100" fontSize="10" fill="#FFD700" fontFamily="serif" opacity="0.6">✦</text>
      <text x="168" y="105" fontSize="10" fill="#C8A0FF" fontFamily="serif" opacity="0.6">✦</text>
      {/* Magic ribbon */}
      <path d="M58 90 Q40 80 35 100 Q40 120 58 110" stroke="#FFD700" strokeWidth="1.5" fill="none" opacity="0.5" />
      <path d="M142 90 Q160 80 165 100 Q160 120 142 110" stroke="#FFD700" strokeWidth="1.5" fill="none" opacity="0.5" />
    </svg>
  )
}
