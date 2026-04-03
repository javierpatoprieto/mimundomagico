export function BlancaNievesIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 150"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Blancanieves con la manzana en el bosque mágico"
    >
      {/* Sky */}
      <rect width="200" height="150" fill="#2D1B5E" />
      {/* Magic sparkles background */}
      <circle cx="30" cy="20" r="2" fill="#FFD700" opacity="0.8" />
      <circle cx="170" cy="15" r="2.5" fill="#FFD700" opacity="0.7" />
      <circle cx="80" cy="10" r="1.5" fill="#FFD700" opacity="0.9" />
      <circle cx="140" cy="30" r="2" fill="#C8A0FF" opacity="0.8" />
      <circle cx="60" cy="35" r="1.5" fill="#C8A0FF" opacity="0.7" />
      {/* Trees (dark magical forest) */}
      <ellipse cx="15" cy="85" rx="20" ry="40" fill="#1A3A1A" />
      <rect x="11" y="105" width="8" height="30" fill="#5C3317" />
      <ellipse cx="185" cy="80" rx="22" ry="45" fill="#0F2B0F" />
      <rect x="181" y="100" width="8" height="35" fill="#5C3317" />
      <ellipse cx="45" cy="95" rx="14" ry="28" fill="#1A3A1A" />
      <ellipse cx="155" cy="90" rx="18" ry="35" fill="#0F2B0F" />
      {/* Ground */}
      <rect y="120" width="200" height="30" fill="#2A5C2A" />
      {/* Girl */}
      {/* Dress - yellow/blue */}
      <path d="M88 90 Q100 82 112 90 L118 130 H82 Z" fill="#FFD700" />
      <path d="M88 90 Q100 82 112 90 L109 130 H91 Z" fill="#4472C4" />
      {/* Cape/collar */}
      <path d="M86 88 Q100 80 114 88 L112 96 Q100 100 88 96 Z" fill="#FFFFFF" />
      {/* Neck + head */}
      <rect x="96" y="72" width="8" height="12" fill="#FFD5B0" />
      <circle cx="100" cy="68" r="13" fill="#FFD5B0" />
      {/* Hair */}
      <path d="M87 64 Q100 52 113 64 L115 78 Q100 76 85 78 Z" fill="#1A1A1A" />
      {/* Hairband */}
      <rect x="87" y="68" width="26" height="3" rx="1.5" fill="#CC2200" />
      {/* Eyes */}
      <circle cx="96" cy="66" r="2" fill="#333" />
      <circle cx="104" cy="66" r="2" fill="#333" />
      <circle cx="96.8" cy="65.2" r="0.8" fill="white" />
      <circle cx="104.8" cy="65.2" r="0.8" fill="white" />
      {/* Smile */}
      <path d="M96 71 Q100 74 104 71" stroke="#CC5500" strokeWidth="1" fill="none" />
      {/* Red apple */}
      <circle cx="118" cy="105" r="9" fill="#CC2200" />
      <path d="M118 96 Q122 92 120 96" stroke="#5D8A3C" strokeWidth="2" fill="none" />
      <ellipse cx="115" cy="103" rx="3" ry="4" fill="#FF4444" opacity="0.4" />
      {/* Magic sparkles around */}
      <path d="M130 80 L133 74 L136 80 L130 80 Z" fill="#FFD700" />
      <path d="M70 75 L73 69 L76 75 L70 75 Z" fill="#C8A0FF" />
      <path d="M145 95 L147 90 L149 95 L145 95 Z" fill="#FFD700" />
    </svg>
  )
}
