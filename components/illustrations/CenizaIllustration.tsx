export function CenizaIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 150"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="La carroza de calabaza de Cenicienta"
    >
      {/* Night sky */}
      <rect width="200" height="150" fill="#1A0A3A" />
      {/* Stars */}
      <circle cx="20" cy="15" r="1.5" fill="#FFD700" />
      <circle cx="50" cy="8" r="1" fill="white" />
      <circle cx="80" cy="20" r="1.5" fill="white" />
      <circle cx="120" cy="12" r="1" fill="#FFD700" />
      <circle cx="150" cy="25" r="1.5" fill="white" />
      <circle cx="180" cy="10" r="1" fill="white" />
      <circle cx="170" cy="35" r="1.5" fill="#FFD700" />
      <circle cx="35" cy="40" r="1" fill="white" />
      {/* Road */}
      <ellipse cx="100" cy="140" rx="85" ry="12" fill="#2A1A5A" />
      {/* Castle in background */}
      <rect x="155" y="50" width="30" height="60" fill="#4A3580" opacity="0.5" />
      <rect x="148" y="40" width="10" height="30" fill="#4A3580" opacity="0.5" />
      <rect x="172" y="42" width="10" height="28" fill="#4A3580" opacity="0.5" />
      <polygon points="148,40 153,30 158,40" fill="#CC2200" opacity="0.4" />
      <polygon points="172,42 177,32 182,42" fill="#CC2200" opacity="0.4" />
      {/* Pumpkin carriage */}
      {/* Main pumpkin body */}
      <ellipse cx="100" cy="115" rx="38" ry="30" fill="#FF8C00" />
      <ellipse cx="82" cy="112" rx="14" ry="22" fill="#FFA500" opacity="0.7" />
      <ellipse cx="100" cy="110" rx="14" ry="24" fill="#FF9500" opacity="0.6" />
      <ellipse cx="118" cy="112" rx="14" ry="22" fill="#FFA500" opacity="0.7" />
      {/* Pumpkin lines */}
      <line x1="82" y1="88" x2="82" y2="140" stroke="#CC6600" strokeWidth="2" opacity="0.5" />
      <line x1="100" y1="86" x2="100" y2="140" stroke="#CC6600" strokeWidth="2" opacity="0.5" />
      <line x1="118" y1="88" x2="118" y2="140" stroke="#CC6600" strokeWidth="2" opacity="0.5" />
      {/* Carriage window */}
      <ellipse cx="100" cy="110" rx="16" ry="14" fill="#B8D4FF" opacity="0.8" />
      <ellipse cx="100" cy="110" rx="13" ry="11" fill="#D4E8FF" opacity="0.9" />
      {/* Window gold trim */}
      <ellipse cx="100" cy="110" rx="16" ry="14" fill="none" stroke="#FFD700" strokeWidth="2" />
      {/* Girl silhouette in window */}
      <circle cx="100" cy="106" r="5" fill="#FFD5B0" opacity="0.8" />
      <path d="M93 118 Q100 110 107 118" fill="#4472C4" opacity="0.8" />
      {/* Pumpkin stem on top */}
      <rect x="97" y="82" width="6" height="10" rx="3" fill="#5D8A3C" />
      <path d="M100 84 Q108 78 112 84" stroke="#5D8A3C" strokeWidth="2" fill="none" />
      {/* Wheels */}
      <circle cx="65" cy="133" r="14" fill="none" stroke="#FFD700" strokeWidth="4" />
      <circle cx="65" cy="133" r="3" fill="#FFD700" />
      <line x1="65" y1="119" x2="65" y2="147" stroke="#FFD700" strokeWidth="2.5" />
      <line x1="51" y1="133" x2="79" y2="133" stroke="#FFD700" strokeWidth="2.5" />
      <circle cx="135" cy="133" r="14" fill="none" stroke="#FFD700" strokeWidth="4" />
      <circle cx="135" cy="133" r="3" fill="#FFD700" />
      <line x1="135" y1="119" x2="135" y2="147" stroke="#FFD700" strokeWidth="2.5" />
      <line x1="121" y1="133" x2="149" y2="133" stroke="#FFD700" strokeWidth="2.5" />
      {/* Magic sparkles */}
      <path d="M45 90 L47 84 L49 90 L45 90 Z" fill="#FFD700" opacity="0.9" />
      <path d="M155 85 L157 79 L159 85 L155 85 Z" fill="#FFD700" opacity="0.9" />
      <path d="M30 100 L32 95 L34 100 L30 100 Z" fill="#C8A0FF" opacity="0.9" />
      {/* Moon */}
      <circle cx="25" cy="28" r="16" fill="#FFD700" opacity="0.9" />
      <circle cx="32" cy="22" r="13" fill="#1A0A3A" />
    </svg>
  )
}
