export function TortugaIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 150"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="La tortuga y la liebre en el camino"
    >
      {/* Sky */}
      <rect width="200" height="100" fill="#87CEEB" />
      {/* Ground */}
      <rect y="100" width="200" height="50" fill="#8BC34A" />
      {/* Path */}
      <ellipse cx="100" cy="130" rx="80" ry="12" fill="#C8A86B" opacity="0.7" />
      {/* Sun */}
      <circle cx="175" cy="22" r="16" fill="#FFD700" />
      {/* Clouds */}
      <ellipse cx="40" cy="25" rx="28" ry="12" fill="white" opacity="0.85" />
      <ellipse cx="60" cy="20" rx="20" ry="10" fill="white" opacity="0.85" />
      {/* Trees */}
      <ellipse cx="15" cy="85" rx="16" ry="25" fill="#4CAF50" />
      <rect x="11" y="100" width="7" height="18" fill="#7B5226" />
      <ellipse cx="185" cy="82" rx="18" ry="28" fill="#388E3C" />
      <rect x="181" y="97" width="7" height="20" fill="#7B5226" />
      {/* Finish line */}
      <rect x="162" y="110" width="4" height="25" fill="#555" />
      <rect x="162" y="110" width="18" height="6" fill="#CC2200" />
      <rect x="162" y="116" width="18" height="6" fill="white" />
      {/* Tortoise (left, walking steadily) */}
      {/* Shell */}
      <ellipse cx="75" cy="118" rx="20" ry="13" fill="#5D8A3C" />
      <ellipse cx="75" cy="115" rx="17" ry="10" fill="#7CB346" />
      {/* Shell pattern */}
      <line x1="68" y1="108" x2="75" y2="120" stroke="#4A7A2C" strokeWidth="1.5" />
      <line x1="75" y1="106" x2="75" y2="120" stroke="#4A7A2C" strokeWidth="1.5" />
      <line x1="82" y1="108" x2="75" y2="120" stroke="#4A7A2C" strokeWidth="1.5" />
      <line x1="64" y1="113" x2="86" y2="113" stroke="#4A7A2C" strokeWidth="1.5" />
      {/* Head */}
      <circle cx="93" cy="117" r="7" fill="#8BC34A" />
      {/* Eye */}
      <circle cx="96" cy="114" r="2" fill="#333" />
      <circle cx="96.7" cy="113.3" r="0.8" fill="white" />
      {/* Smile */}
      <path d="M91 118 Q94 121 97 118" stroke="#4A7A2C" strokeWidth="1.2" fill="none" />
      {/* Legs */}
      <ellipse cx="62" cy="127" rx="6" ry="3" fill="#8BC34A" />
      <ellipse cx="72" cy="129" rx="6" ry="3" fill="#8BC34A" />
      <ellipse cx="82" cy="129" rx="6" ry="3" fill="#8BC34A" />
      {/* Hare (right, sleeping under tree) */}
      <ellipse cx="148" cy="120" rx="14" ry="8" fill="#E8D8C0" />
      {/* Ears */}
      <ellipse cx="143" cy="108" rx="4" ry="10" fill="#E8D8C0" />
      <ellipse cx="143" cy="108" rx="2.5" ry="8" fill="#F4C0C0" />
      <ellipse cx="150" cy="107" rx="4" ry="10" fill="#E8D8C0" />
      <ellipse cx="150" cy="107" rx="2.5" ry="8" fill="#F4C0C0" />
      {/* Head */}
      <circle cx="162" cy="117" r="8" fill="#E8D8C0" />
      {/* Closed eye - sleeping */}
      <path d="M159 115 Q162 113 165 115" stroke="#333" strokeWidth="1.5" fill="none" />
      {/* ZZZ */}
      <text x="167" y="108" fontSize="8" fill="#555" fontFamily="sans-serif" fontWeight="bold">z</text>
      <text x="171" y="103" fontSize="10" fill="#555" fontFamily="sans-serif" fontWeight="bold">z</text>
    </svg>
  )
}
