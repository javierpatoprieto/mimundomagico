export function HanselIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 150"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="La casa de caramelo de Hansel y Gretel"
    >
      {/* Sky */}
      <rect width="200" height="100" fill="#87CEEB" />
      {/* Ground / forest floor */}
      <rect y="100" width="200" height="50" fill="#5D8A3C" />
      {/* Trees */}
      <ellipse cx="18" cy="80" rx="18" ry="35" fill="#2D6A2D" />
      <rect x="14" y="100" width="8" height="20" fill="#7B5226" />
      <ellipse cx="182" cy="78" rx="20" ry="38" fill="#1E5C1E" />
      <rect x="178" y="98" width="8" height="22" fill="#7B5226" />
      {/* Candy house walls */}
      <rect x="65" y="75" width="70" height="55" rx="3" fill="#FF9ED2" />
      {/* Candy bricks pattern */}
      <rect x="65" y="82" width="70" height="5" fill="#FF78BC" opacity="0.5" />
      <rect x="65" y="94" width="70" height="5" fill="#FF78BC" opacity="0.5" />
      <rect x="65" y="106" width="70" height="5" fill="#FF78BC" opacity="0.5" />
      <rect x="65" y="118" width="70" height="5" fill="#FF78BC" opacity="0.5" />
      {/* Candy roof */}
      <polygon points="55,78 100,45 145,78" fill="#CC5599" />
      {/* Roof candy decorations */}
      <circle cx="72" cy="70" r="6" fill="#FF4444" />
      <circle cx="85" cy="58" r="6" fill="#FFD700" />
      <circle cx="100" cy="50" r="6" fill="#44CCFF" />
      <circle cx="115" cy="58" r="6" fill="#FF9900" />
      <circle cx="128" cy="70" r="6" fill="#FF4444" />
      {/* Chimney */}
      <rect x="112" y="43" width="16" height="22" fill="#CC5599" />
      {/* Candy cane chimney stripe */}
      <line x1="112" y1="48" x2="128" y2="48" stroke="white" strokeWidth="3" />
      <line x1="112" y1="56" x2="128" y2="56" stroke="white" strokeWidth="3" />
      {/* Door */}
      <rect x="88" y="105" width="24" height="25" rx="12" fill="#C8A86B" />
      <rect x="90" y="107" width="20" height="21" rx="10" fill="#E8C88B" />
      <circle cx="109" cy="118" r="2" fill="#FFD700" />
      {/* Window left */}
      <rect x="72" y="83" width="18" height="16" rx="4" fill="#B8D4FF" />
      <line x1="81" y1="83" x2="81" y2="99" stroke="#FFD700" strokeWidth="1.5" />
      <line x1="72" y1="91" x2="90" y2="91" stroke="#FFD700" strokeWidth="1.5" />
      {/* Window right */}
      <rect x="110" y="83" width="18" height="16" rx="4" fill="#B8D4FF" />
      <line x1="119" y1="83" x2="119" y2="99" stroke="#FFD700" strokeWidth="1.5" />
      <line x1="110" y1="91" x2="128" y2="91" stroke="#FFD700" strokeWidth="1.5" />
      {/* Kids */}
      {/* Hansel */}
      <rect x="40" y="103" width="14" height="22" rx="3" fill="#4472C4" />
      <circle cx="47" cy="97" r="9" fill="#FFD5B0" />
      <rect x="40" y="90" width="14" height="10" rx="4" fill="#8B5E3C" />
      {/* Gretel */}
      <rect x="147" y="103" width="14" height="22" rx="3" fill="#CC4488" />
      <circle cx="154" cy="97" r="9" fill="#FFD5B0" />
      {/* Gretel hair */}
      <path d="M145 93 Q154 85 163 93 L164 102 Q154 100 144 102 Z" fill="#8B5E3C" />
      {/* Candy on ground */}
      <circle cx="55" cy="125" r="5" fill="#FF4444" />
      <rect x="53" y="120" width="2" height="8" fill="white" />
      <circle cx="148" cy="128" r="5" fill="#FFD700" />
    </svg>
  )
}
