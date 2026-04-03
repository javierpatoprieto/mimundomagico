export function TresCerditosIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 150"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Los tres cerditos y sus casas"
    >
      {/* Sky */}
      <rect width="200" height="150" fill="#87CEEB" />
      {/* Ground */}
      <rect y="115" width="200" height="35" fill="#6DB36D" />
      {/* House 1 - Straw (left) */}
      <rect x="10" y="90" width="45" height="30" fill="#F5DEB3" />
      <polygon points="10,90 32,68 55,90" fill="#DEB887" />
      {/* House 2 - Sticks (middle) */}
      <rect x="77" y="85" width="46" height="35" fill="#8B5E3C" />
      <polygon points="77,85 100,62 123,85" fill="#6B3E1E" />
      {/* Sticks texture */}
      <line x1="85" y1="95" x2="85" y2="120" stroke="#5C3317" strokeWidth="2" />
      <line x1="94" y1="93" x2="94" y2="120" stroke="#5C3317" strokeWidth="2" />
      <line x1="103" y1="92" x2="103" y2="120" stroke="#5C3317" strokeWidth="2" />
      <line x1="112" y1="94" x2="112" y2="120" stroke="#5C3317" strokeWidth="2" />
      {/* House 3 - Bricks (right) */}
      <rect x="145" y="82" width="50" height="38" fill="#CC5533" />
      <polygon points="145,82 170,58 195,82" fill="#AA3322" />
      {/* Brick lines */}
      <line x1="145" y1="92" x2="195" y2="92" stroke="#AA3322" strokeWidth="1" />
      <line x1="145" y1="102" x2="195" y2="102" stroke="#AA3322" strokeWidth="1" />
      <line x1="145" y1="112" x2="195" y2="112" stroke="#AA3322" strokeWidth="1" />
      {/* Pig 1 */}
      <circle cx="32" cy="115" r="9" fill="#FFB6C1" />
      <circle cx="32" cy="107" r="7" fill="#FFB6C1" />
      <ellipse cx="32" cy="108" rx="3" ry="2" fill="#FF8FA3" />
      <circle cx="30" cy="105" r="1.5" fill="#333" />
      <circle cx="34" cy="105" r="1.5" fill="#333" />
      {/* Pig 2 */}
      <circle cx="100" cy="115" r="9" fill="#FFB6C1" />
      <circle cx="100" cy="107" r="7" fill="#FFB6C1" />
      <ellipse cx="100" cy="108" rx="3" ry="2" fill="#FF8FA3" />
      <circle cx="98" cy="105" r="1.5" fill="#333" />
      <circle cx="102" cy="105" r="1.5" fill="#333" />
      {/* Pig 3 */}
      <circle cx="168" cy="113" r="9" fill="#FFB6C1" />
      <circle cx="168" cy="105" r="7" fill="#FFB6C1" />
      <ellipse cx="168" cy="106" rx="3" ry="2" fill="#FF8FA3" />
      <circle cx="166" cy="103" r="1.5" fill="#333" />
      <circle cx="170" cy="103" r="1.5" fill="#333" />
      {/* Sun */}
      <circle cx="22" cy="22" r="14" fill="#FFD700" />
    </svg>
  )
}
