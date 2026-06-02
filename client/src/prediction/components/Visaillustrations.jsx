// ─────────────────────────────────────────────────────────────
// Visa Illustrations — inline SVG React components
// No external dependencies, no image files needed.
// Usage:
//   import { HomeIllustration, FormIllustration, ResultIllustration } from "./VisaIllustrations";
//   <HomeIllustration className="w-full max-w-md" />
// ─────────────────────────────────────────────────────────────

// ══════════════════════════════════════════════
// HOME PAGE — Traveller at passport counter
// ══════════════════════════════════════════════
export function HomeIllustration({ className = "" }) {
  return (
    <svg
      viewBox="0 0 520 360"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Traveller presenting passport at visa counter"
    >
      {/* Background blobs */}
      <ellipse cx="260" cy="320" rx="220" ry="30" fill="#e8f0fe" opacity="0.6" />
      <circle cx="420" cy="60" r="60" fill="#dbeafe" opacity="0.5" />
      <circle cx="100" cy="80" r="40" fill="#ede9fe" opacity="0.4" />

      {/* Decorative dotted grid */}
      {[0,1,2,3,4].map(col => [0,1,2,3].map(row => (
        <circle key={`${col}-${row}`} cx={370 + col * 20} cy={30 + row * 20} r="2" fill="#93c5fd" opacity="0.4" />
      )))}

      {/* ── COUNTER DESK ── */}
      <rect x="200" y="200" width="200" height="90" rx="12" fill="#1e40af" />
      <rect x="195" y="195" width="210" height="15" rx="6" fill="#2563eb" />
      {/* Desk screen */}
      <rect x="260" y="160" width="70" height="50" rx="8" fill="#1d4ed8" />
      <rect x="265" y="165" width="60" height="38" rx="5" fill="#93c5fd" opacity="0.3" />
      <rect x="270" y="170" width="40" height="5" rx="2" fill="white" opacity="0.5" />
      <rect x="270" y="178" width="30" height="5" rx="2" fill="white" opacity="0.4" />
      <rect x="270" y="186" width="35" height="5" rx="2" fill="white" opacity="0.3" />
      {/* Screen stand */}
      <rect x="291" y="208" width="8" height="10" rx="2" fill="#1d4ed8" />
      <rect x="283" y="216" width="24" height="4" rx="2" fill="#1d4ed8" />

      {/* ── OFFICER (right side) ── */}
      {/* Body */}
      <rect x="310" y="140" width="55" height="70" rx="8" fill="#1e3a8a" />
      {/* Tie */}
      <polygon points="337,145 333,175 337,180 341,175" fill="#dc2626" />
      {/* Shirt collar */}
      <polygon points="330,140 337,150 344,140" fill="white" opacity="0.8" />
      {/* Head */}
      <circle cx="337" cy="118" r="22" fill="#fbbf24" />
      {/* Hair */}
      <ellipse cx="337" cy="97" rx="22" ry="10" fill="#92400e" />
      {/* Eyes */}
      <circle cx="330" cy="116" r="3" fill="#1e293b" />
      <circle cx="344" cy="116" r="3" fill="#1e293b" />
      {/* Smile */}
      <path d="M330 124 Q337 130 344 124" stroke="#92400e" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Arms */}
      <rect x="295" y="155" width="18" height="40" rx="8" fill="#1e3a8a" />
      <rect x="363" y="155" width="18" height="40" rx="8" fill="#1e3a8a" />
      {/* Hands */}
      <circle cx="304" cy="198" r="8" fill="#fbbf24" />
      <circle cx="372" cy="198" r="8" fill="#fbbf24" />
      {/* Stamp in hand */}
      <rect x="296" y="188" width="16" height="10" rx="3" fill="#ef4444" />
      <rect x="299" y="195" width="10" height="6" rx="2" fill="#dc2626" />

      {/* ── TRAVELLER (left side) ── */}
      {/* Suitcase */}
      <rect x="95" y="238" width="44" height="34" rx="6" fill="#fbbf24" />
      <rect x="109" y="232" width="16" height="10" rx="4" fill="none" stroke="#fbbf24" strokeWidth="3" />
      <line x1="95" y1="255" x2="139" y2="255" stroke="#f59e0b" strokeWidth="2" />
      <line x1="117" y1="238" x2="117" y2="272" stroke="#f59e0b" strokeWidth="2" />
      {/* Body */}
      <rect x="110" y="145" width="55" height="75" rx="8" fill="#4338ca" />
      {/* Lapels */}
      <polygon points="120,145 137,160 137,145" fill="#6366f1" opacity="0.6" />
      <polygon points="154,145 137,160 137,145" fill="#6366f1" opacity="0.5" />
      {/* Tie */}
      <polygon points="134,148 130,178 137,183 144,178" fill="#0ea5e9" />
      {/* Head */}
      <circle cx="137" cy="122" r="24" fill="#fed7aa" />
      {/* Hair (silver) */}
      <ellipse cx="137" cy="99" rx="23" ry="11" fill="#d1d5db" />
      {/* Eyes */}
      <circle cx="130" cy="120" r="3" fill="#1e293b" />
      <circle cx="144" cy="120" r="3" fill="#1e293b" />
      {/* Eyebrows */}
      <path d="M127 114 Q130 111 133 114" stroke="#6b7280" strokeWidth="2" fill="none" />
      <path d="M141 114 Q144 111 147 114" stroke="#6b7280" strokeWidth="2" fill="none" />
      {/* Mouth */}
      <path d="M131 128 Q137 133 143 128" stroke="#b45309" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Arms */}
      <rect x="88" y="158" width="24" height="45" rx="9" fill="#4338ca" />
      <rect x="163" y="158" width="24" height="45" rx="9" fill="#4338ca" />
      {/* Hands */}
      <circle cx="100" cy="206" r="9" fill="#fed7aa" />
      <circle cx="175" cy="206" r="9" fill="#fed7aa" />
      {/* Shoes */}
      <ellipse cx="120" cy="295" rx="14" ry="7" fill="#fbbf24" />
      <ellipse cx="154" cy="295" rx="14" ry="7" fill="#fbbf24" />

      {/* ── PASSPORT ── */}
      <rect x="158" y="155" width="50" height="66" rx="6" fill="#f59e0b" />
      <rect x="163" y="160" width="40" height="52" rx="4" fill="#fbbf24" opacity="0.6" />
      {/* Globe icon on passport */}
      <circle cx="183" cy="180" r="12" fill="none" stroke="#92400e" strokeWidth="2" />
      <ellipse cx="183" cy="180" rx="6" ry="12" fill="none" stroke="#92400e" strokeWidth="1.5" />
      <line x1="171" y1="180" x2="195" y2="180" stroke="#92400e" strokeWidth="1.5" />
      <line x1="172" y1="174" x2="194" y2="174" stroke="#92400e" strokeWidth="1" />
      <line x1="172" y1="186" x2="194" y2="186" stroke="#92400e" strokeWidth="1" />
      {/* Passport text lines */}
      <rect x="168" y="197" width="30" height="3" rx="1.5" fill="#92400e" opacity="0.5" />
      <rect x="171" y="203" width="24" height="3" rx="1.5" fill="#92400e" opacity="0.4" />

      {/* ── FLOATING BADGES ── */}
      {/* Approved badge */}
      <circle cx="390" cy="110" r="28" fill="#dcfce7" stroke="#86efac" strokeWidth="2" />
      <path d="M378 110 l8 8 l16 -16" stroke="#16a34a" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* Shield badge */}
      <path d="M80 240 l16 -8 l16 8 v20 a16 16 0 0 1 -16 12 a16 16 0 0 1 -16 -12 z" fill="#dbeafe" stroke="#93c5fd" strokeWidth="2" />
      <path d="M89 248 l4 4 l8 -8" stroke="#2563eb" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* Stars */}
      <text x="430" y="180" fontSize="16" fill="#fbbf24">★</text>
      <text x="60" y="155" fontSize="12" fill="#a78bfa">★</text>
      <text x="450" y="240" fontSize="10" fill="#93c5fd">★</text>

      {/* Dotted line between traveller and officer */}
      <line x1="180" y1="185" x2="260" y2="185" stroke="#2563eb" strokeWidth="1.5" strokeDasharray="5,4" opacity="0.5" />
    </svg>
  );
}

// ══════════════════════════════════════════════
// FORM PAGE — Person filling digital form
// ══════════════════════════════════════════════
export function FormIllustration({ className = "" }) {
  return (
    <svg
      viewBox="0 0 400 300"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Person filling visa application form on laptop"
    >
      {/* Background */}
      <ellipse cx="200" cy="270" rx="170" ry="22" fill="#dbeafe" opacity="0.5" />
      <circle cx="340" cy="50" r="45" fill="#ede9fe" opacity="0.4" />
      <circle cx="60" cy="60" r="30" fill="#dbeafe" opacity="0.4" />

      {/* Decorative dots */}
      {[0,1,2,3].map(i => (
        <circle key={i} cx={310 + i * 16} cy={30} r="3" fill="#c4b5fd" opacity="0.5" />
      ))}

      {/* ── DESK ── */}
      <rect x="60" y="210" width="280" height="18" rx="6" fill="#e2e8f0" />
      <rect x="80" y="225" width="12" height="30" rx="3" fill="#cbd5e1" />
      <rect x="308" y="225" width="12" height="30" rx="3" fill="#cbd5e1" />

      {/* ── LAPTOP ── */}
      {/* Screen */}
      <rect x="100" y="120" width="200" height="95" rx="10" fill="#1e293b" />
      <rect x="106" y="126" width="188" height="82" rx="7" fill="#0f172a" />
      {/* Screen content — form UI */}
      <rect x="114" y="133" width="80" height="6" rx="3" fill="#3b82f6" opacity="0.8" />
      <rect x="114" y="143" width="172" height="4" rx="2" fill="#334155" />
      <rect x="114" y="150" width="172" height="16" rx="4" fill="#1e293b" stroke="#3b82f6" strokeWidth="1" />
      <rect x="117" y="153" width="60" height="10" rx="2" fill="#475569" opacity="0.5" />
      <rect x="114" y="170" width="172" height="16" rx="4" fill="#1e293b" stroke="#334155" strokeWidth="1" />
      <rect x="117" y="173" width="45" height="10" rx="2" fill="#475569" opacity="0.4" />
      <rect x="114" y="190" width="80" height="10" rx="4" fill="#3b82f6" />
      <rect x="196" y="190" width="60" height="10" rx="4" fill="#334155" />
      {/* Progress bar on screen */}
      <rect x="114" y="202" width="172" height="4" rx="2" fill="#334155" />
      <rect x="114" y="202" width="100" height="4" rx="2" fill="#3b82f6" />

      {/* Laptop hinge */}
      <rect x="90" y="213" width="220" height="8" rx="4" fill="#334155" />
      {/* Keyboard base */}
      <rect x="95" y="218" width="210" height="14" rx="6" fill="#1e293b" />
      {/* Keys */}
      {[0,1,2,3,4,5,6,7,8].map(i => (
        <rect key={i} x={110 + i * 22} y={221} width="18" height="8" rx="2" fill="#334155" />
      ))}
      {/* Trackpad */}
      <rect x="172" y="232" width="56" height="0" rx="0" />

      {/* ── PERSON ── */}
      {/* Chair */}
      <rect x="168" y="255" width="64" height="10" rx="4" fill="#94a3b8" />
      <rect x="185" y="263" width="8" height="20" rx="3" fill="#94a3b8" />
      <rect x="207" y="263" width="8" height="20" rx="3" fill="#94a3b8" />
      {/* Body */}
      <rect x="165" y="175" width="70" height="65" rx="12" fill="#6366f1" />
      {/* Shirt details */}
      <polygon points="195,178 200,195 200,178" fill="#818cf8" opacity="0.5" />
      <polygon points="205,178 200,195 200,178" fill="#818cf8" opacity="0.4" />
      {/* Head */}
      <circle cx="200" cy="152" r="26" fill="#fde68a" />
      {/* Hair */}
      <ellipse cx="200" cy="127" rx="26" ry="12" fill="#1e293b" />
      {/* Eyes */}
      <circle cx="192" cy="150" r="3.5" fill="#1e293b" />
      <circle cx="208" cy="150" r="3.5" fill="#1e293b" />
      {/* Eye highlights */}
      <circle cx="193.5" cy="148.5" r="1.2" fill="white" />
      <circle cx="209.5" cy="148.5" r="1.2" fill="white" />
      {/* Smile */}
      <path d="M192 160 Q200 166 208 160" stroke="#b45309" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Arms reaching to laptop */}
      <rect x="130" y="185" width="38" height="22" rx="9" fill="#6366f1" />
      <rect x="232" y="185" width="38" height="22" rx="9" fill="#6366f1" />
      {/* Hands on keyboard */}
      <ellipse cx="148" cy="210" rx="14" ry="8" fill="#fde68a" />
      <ellipse cx="252" cy="210" rx="14" ry="8" fill="#fde68a" />

      {/* ── FLOATING ELEMENTS ── */}
      {/* Document icon top-left */}
      <rect x="30" y="90" width="44" height="54" rx="6" fill="white" stroke="#dbeafe" strokeWidth="2" filter="url(#shadow)" />
      <rect x="37" y="100" width="30" height="4" rx="2" fill="#93c5fd" />
      <rect x="37" y="108" width="24" height="3" rx="1.5" fill="#e2e8f0" />
      <rect x="37" y="114" width="27" height="3" rx="1.5" fill="#e2e8f0" />
      <rect x="37" y="120" width="20" height="3" rx="1.5" fill="#e2e8f0" />
      <rect x="37" y="128" width="26" height="3" rx="1.5" fill="#e2e8f0" />

      {/* Check mark bubble */}
      <circle cx="345" cy="135" r="22" fill="#dcfce7" stroke="#86efac" strokeWidth="2" />
      <path d="M335 135 l6 6 l14 -14" stroke="#16a34a" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />

      {/* AI sparkle */}
      <text x="42" y="74" fontSize="20" fill="#fbbf24">✦</text>
      <text x="350" y="80" fontSize="14" fill="#c4b5fd">✦</text>
      <text x="325" y="240" fontSize="10" fill="#93c5fd">✦</text>

      {/* Defs for shadow */}
      <defs>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#3b82f6" floodOpacity="0.1" />
        </filter>
      </defs>
    </svg>
  );
}

// ══════════════════════════════════════════════
// RESULT PAGE — Person receiving approved stamp
// ══════════════════════════════════════════════
export function ResultIllustration({ className = "", score = 80 }) {
  const isGood = score >= 70;
  const accentColor = score >= 80 ? "#16a34a" : score >= 60 ? "#d97706" : "#dc2626";
  const accentLight = score >= 80 ? "#dcfce7" : score >= 60 ? "#fef3c7" : "#fee2e2";
  const stampText   = score >= 80 ? "APPROVED" : score >= 60 ? "REVIEW" : "DECLINED";
  const stampColor  = score >= 80 ? "#16a34a" : score >= 60 ? "#d97706" : "#dc2626";

  return (
    <svg
      viewBox="0 0 440 320"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Visa approval result certificate"
    >
      {/* Background */}
      <ellipse cx="220" cy="295" rx="190" ry="22" fill="#dbeafe" opacity="0.4" />
      <circle cx="380" cy="55" r="50" fill={accentLight} opacity="0.5" />
      <circle cx="60" cy="70" r="35" fill="#dbeafe" opacity="0.4" />

      {/* ── LARGE CERTIFICATE / DOCUMENT ── */}
      <rect x="110" y="50" width="220" height="200" rx="14" fill="white" stroke="#e2e8f0" strokeWidth="2" />
      {/* Certificate header band */}
      <rect x="110" y="50" width="220" height="40" rx="14" fill={accentColor} opacity="0.12" />
      <rect x="110" y="76" width="220" height="14" rx="0" fill={accentColor} opacity="0.08" />
      {/* Header text */}
      <rect x="145" y="62" width="110" height="8" rx="4" fill={accentColor} opacity="0.6" />
      <rect x="165" y="73" width="70" height="5" rx="2.5" fill={accentColor} opacity="0.3" />

      {/* Photo box */}
      <rect x="128" y="100" width="50" height="60" rx="6" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="1.5" />
      {/* Person silhouette in photo */}
      <circle cx="153" cy="118" r="12" fill="#cbd5e1" />
      <ellipse cx="153" cy="145" rx="16" ry="14" fill="#cbd5e1" />

      {/* Info lines right of photo */}
      <rect x="188" y="105" width="120" height="6" rx="3" fill="#1e293b" opacity="0.7" />
      <rect x="188" y="115" width="90" height="5" rx="2.5" fill="#64748b" opacity="0.5" />
      <rect x="188" y="125" width="100" height="5" rx="2.5" fill="#64748b" opacity="0.4" />
      <rect x="188" y="135" width="75" height="5" rx="2.5" fill="#64748b" opacity="0.4" />
      <rect x="188" y="145" width="110" height="5" rx="2.5" fill="#64748b" opacity="0.3" />

      {/* Divider */}
      <line x1="128" y1="172" x2="312" y2="172" stroke="#e2e8f0" strokeWidth="1.5" />

      {/* Bottom detail lines */}
      <rect x="128" y="182" width="160" height="5" rx="2.5" fill="#e2e8f0" />
      <rect x="128" y="191" width="130" height="5" rx="2.5" fill="#e2e8f0" />
      <rect x="128" y="200" width="145" height="5" rx="2.5" fill="#e2e8f0" />
      <rect x="128" y="209" width="100" height="5" rx="2.5" fill="#e2e8f0" />

      {/* Barcode */}
      {[0,1,2,3,4,5,6,7,8,9,10,11].map(i => (
        <rect key={i} x={128 + i * 8} y={224} width={i%3===0?3:2} height="16" rx="0.5" fill="#94a3b8" opacity="0.7" />
      ))}

      {/* ── STAMP ── */}
      <g transform="translate(230, 170) rotate(-18)">
        <circle cx="0" cy="0" r="44" fill="none" stroke={stampColor} strokeWidth="4" opacity="0.85" />
        <circle cx="0" cy="0" r="38" fill="none" stroke={stampColor} strokeWidth="1.5" opacity="0.4" />
        <text
          x="0" y="6"
          textAnchor="middle"
          fontSize="11"
          fontWeight="900"
          fontFamily="Arial, sans-serif"
          letterSpacing="2"
          fill={stampColor}
          opacity="0.85"
        >{stampText}</text>
        <text x="0" y="-16" textAnchor="middle" fontSize="7" fontFamily="Arial, sans-serif" letterSpacing="1" fill={stampColor} opacity="0.6">VISA</text>
        <text x="0" y="22" textAnchor="middle" fontSize="7" fontFamily="Arial, sans-serif" letterSpacing="1" fill={stampColor} opacity="0.6">2026</text>
      </g>

      {/* ── PERSON HOLDING DOCUMENT ── */}
      {/* Body */}
      <rect x="320" y="160" width="60" height="80" rx="10" fill="#1e3a8a" />
      {/* Tie */}
      <polygon points="348,163 344,190 350,195 356,190" fill="#ef4444" />
      {/* Shirt collar */}
      <polygon points="340,163 350,175 350,163" fill="white" opacity="0.7" />
      <polygon points="360,163 350,175 350,163" fill="white" opacity="0.6" />
      {/* Head */}
      <circle cx="350" cy="138" r="24" fill="#fed7aa" />
      {/* Hair */}
      <ellipse cx="350" cy="116" rx="23" ry="10" fill="#92400e" />
      {/* Eyes — happy */}
      <path d="M342 135 Q344 132 346 135" stroke="#1e293b" strokeWidth="2" fill="none" />
      <path d="M354 135 Q356 132 358 135" stroke="#1e293b" strokeWidth="2" fill="none" />
      {/* Big smile */}
      <path d="M342 146 Q350 154 358 146" stroke="#b45309" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* Arm holding certificate */}
      <rect x="290" y="170" width="32" height="22" rx="9" fill="#1e3a8a" />
      <circle cx="295" cy="195" r="9" fill="#fed7aa" />
      {/* Other arm */}
      <rect x="378" y="170" width="25" height="22" rx="9" fill="#1e3a8a" />
      <circle cx="395" cy="192" r="8" fill="#fed7aa" />
      {/* Legs */}
      <rect x="328" y="238" width="18" height="35" rx="6" fill="#1e3a8a" />
      <rect x="354" y="238" width="18" height="35" rx="6" fill="#1e3a8a" />
      {/* Shoes */}
      <ellipse cx="337" cy="276" rx="14" ry="7" fill="#1e293b" />
      <ellipse cx="363" cy="276" rx="14" ry="7" fill="#1e293b" />

      {/* ── FLOATING STARS / CONFETTI ── */}
      {isGood && (
        <>
          <circle cx="75" cy="160" r="6" fill="#fbbf24" opacity="0.8" />
          <circle cx="55" cy="200" r="4" fill="#34d399" opacity="0.7" />
          <circle cx="90" cy="230" r="5" fill="#818cf8" opacity="0.6" />
          <circle cx="410" cy="140" r="5" fill="#f472b6" opacity="0.6" />
          <circle cx="425" cy="200" r="4" fill="#fbbf24" opacity="0.7" />
          <text x="60" y="130" fontSize="20" fill="#fbbf24">🎉</text>
          <text x="390" y="110" fontSize="16" fill="#34d399">✦</text>
        </>
      )}

      {/* Score ring */}
      <circle cx="76" cy="200" r="34" fill="white" stroke="#e2e8f0" strokeWidth="2" />
      <circle cx="76" cy="200" r="34" fill="none" stroke={accentColor} strokeWidth="5" strokeDasharray={`${score * 2.13} 213`} strokeDashoffset="53" strokeLinecap="round" transform="rotate(-90 76 200)" />
      <text x="76" y="197" textAnchor="middle" fontSize="12" fontWeight="900" fontFamily="Arial, sans-serif" fill={accentColor}>{score}%</text>
      <text x="76" y="209" textAnchor="middle" fontSize="6" fontFamily="Arial, sans-serif" fill="#94a3b8">SCORE</text>

      {/* AI badge */}
      <rect x="355" y="240" width="60" height="26" rx="13" fill="#1e293b" />
      <text x="385" y="257" textAnchor="middle" fontSize="9" fontFamily="Arial, sans-serif" fontWeight="700" fill="white" letterSpacing="0.5">🤖 AI</text>
    </svg>
  );
}