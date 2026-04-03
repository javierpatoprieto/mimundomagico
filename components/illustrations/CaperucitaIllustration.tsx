export function CaperucitaIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 150"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Caperucita Roja en el bosque"
    >
      {/* Sky */}
      <rect width="200" height="150" fill="#87CEEB" />
      {/* Ground */}
      <rect y="110" width="200" height="40" fill="#5D8A3C" />
      {/* Sun */}
      <circle cx="170" cy="25" r="18" fill="#FFD700" opacity="0.9" />
      {/* Trees */}
      <ellipse cx="20" cy="90" rx="18" ry="30" fill="#2D6A2D" />
      <rect x="16" y="105" width="8" height="20" fill="#7B5226" />
      <ellipse cx="180" cy="85" rx="22" ry="35" fill="#1E5C1E" />
      <rect x="176" y="100" width="8" height="25" fill="#7B5226" />
      <ellipse cx="50" cy="95" rx="14" ry="22" fill="#3A7D3A" />
      <rect x="46" y="108" width="7" height="15" fill="#7B5226" />
      <ellipse cx="155" cy="100" rx="12" ry="18" fill="#2D6A2D" />
      <rect x="151" y="110" width="7" height="12" fill="#7B5226" />
      {/* Path */}
      <ellipse cx="100" cy="130" rx="35" ry="8" fill="#C8A86B" opacity="0.6" />
      {/* Girl body */}
      <rect x="90" y="90" width="20" height="25" rx="3" fill="#FFFFFF" />
      {/* Red cape */}
      <path d="M88 88 Q100 82 112 88 L114 115 Q100 118 86 115 Z" fill="#CC2200" opacity="0.95" />
      {/* Hood */}
      <ellipse cx="100" cy="82" rx="12" ry="10" fill="#CC2200" />
      {/* Face */}
      <circle cx="100" cy="82" r="9" fill="#FFD5B0" />
      {/* Eyes */}
      <circle cx="97" cy="80" r="1.5" fill="#333" />
      <circle cx="103" cy="80" r="1.5" fill="#333" />
      {/* Smile */}
      <path d="M97 84 Q100 87 103 84" stroke="#CC5500" strokeWidth="1.2" fill="none" />
      {/* Basket */}
      <rect x="108" y="98" width="14" height="10" rx="2" fill="#C8A86B" />
      <path d="M108 98 Q115 93 122 98" stroke="#C8A86B" strokeWidth="2" fill="none" />
      {/* Flowers */}
      <circle cx="65" cy="113" r="3" fill="#FF9ED2" />
      <circle cx="75" cy="116" r="2.5" fill="#FFD700" />
      <circle cx="130" cy="115" r="2.5" fill="#FF9ED2" />
    </svg>
  )
}
