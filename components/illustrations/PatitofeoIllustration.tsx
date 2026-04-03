export function PatitofeoIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 150"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="El patito feo junto al estanque"
    >
      {/* Sky */}
      <rect width="200" height="85" fill="#87CEEB" />
      {/* Ground */}
      <rect y="85" width="200" height="65" fill="#6DB36D" />
      {/* Pond */}
      <ellipse cx="105" cy="115" rx="70" ry="28" fill="#4DA6E8" />
      <ellipse cx="105" cy="115" rx="70" ry="28" fill="url(#pondGrad)" />
      <defs>
        <radialGradient id="pondGrad" cx="50%" cy="40%">
          <stop offset="0%" stopColor="#87CEEB" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#2E78C5" stopOpacity="0.3" />
        </radialGradient>
      </defs>
      {/* Reeds */}
      <line x1="40" y1="115" x2="40" y2="80" stroke="#5D7C25" strokeWidth="3" />
      <ellipse cx="40" cy="77" rx="4" ry="8" fill="#7B5226" />
      <line x1="50" y1="118" x2="50" y2="82" stroke="#5D7C25" strokeWidth="3" />
      <ellipse cx="50" cy="79" rx="4" ry="8" fill="#7B5226" />
      <line x1="168" y1="113" x2="168" y2="78" stroke="#5D7C25" strokeWidth="3" />
      <ellipse cx="168" cy="75" rx="4" ry="8" fill="#7B5226" />
      {/* Duck body */}
      <ellipse cx="100" cy="118" rx="22" ry="14" fill="#B0B8C0" />
      {/* Duck head */}
      <circle cx="120" cy="107" r="11" fill="#B0B8C0" />
      {/* Beak */}
      <polygon points="130,107 138,105 130,110" fill="#FFB347" />
      {/* Eye */}
      <circle cx="124" cy="104" r="2.5" fill="#333" />
      <circle cx="125" cy="103" r="1" fill="white" />
      {/* Wing detail */}
      <ellipse cx="92" cy="116" rx="12" ry="7" fill="#9AA3AA" opacity="0.7" />
      {/* Feet */}
      <ellipse cx="95" cy="131" rx="7" ry="3" fill="#FFB347" />
      <ellipse cx="108" cy="131" rx="7" ry="3" fill="#FFB347" />
      {/* Reflection */}
      <ellipse cx="100" cy="135" rx="18" ry="6" fill="#B0B8C0" opacity="0.2" />
      {/* White swans in background */}
      <ellipse cx="60" cy="120" rx="8" ry="5" fill="white" opacity="0.6" />
      <circle cx="66" cy="116" r="4" fill="white" opacity="0.6" />
      {/* Clouds */}
      <ellipse cx="50" cy="20" rx="25" ry="12" fill="white" opacity="0.8" />
      <ellipse cx="70" cy="16" rx="20" ry="10" fill="white" opacity="0.8" />
      <ellipse cx="150" cy="30" rx="22" ry="10" fill="white" opacity="0.7" />
      {/* Sun */}
      <circle cx="175" cy="18" r="14" fill="#FFD700" />
    </svg>
  )
}
