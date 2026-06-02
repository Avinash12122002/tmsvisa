import { useEffect, useState } from "react";

export default function ScoreCircle({ score }) {
  const [animated, setAnimated] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(score), 200);
    return () => clearTimeout(timer);
  }, [score]);

  // SVG arc math
  const radius   = 80;
  const stroke   = 14;
  const normalised = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalised;
  const offset = circumference - (animated / 100) * circumference;

  // Colour theme
  const theme =
    score >= 80
      ? { track: "#d1fae5", arc: "#10b981", text: "#059669", badge: "bg-emerald-50 text-emerald-700 border-emerald-200", label: "Strong Profile" }
      : score >= 60
      ? { track: "#fef3c7", arc: "#f59e0b", text: "#d97706", badge: "bg-amber-50 text-amber-700 border-amber-200",   label: "Moderate Profile" }
      : { track: "#fee2e2", arc: "#ef4444", text: "#dc2626", badge: "bg-red-50 text-red-700 border-red-200",         label: "Needs Improvement" };

  return (
    <div className="flex flex-col items-center gap-5">
      {/* SVG circle */}
      <div className="relative">
        <svg width="200" height="200" viewBox="0 0 200 200" className="-rotate-90">
          {/* Track */}
          <circle
            cx="100" cy="100" r={normalised}
            fill="none" stroke={theme.track} strokeWidth={stroke}
          />
          {/* Arc */}
          <circle
            cx="100" cy="100" r={normalised}
            fill="none" stroke={theme.arc} strokeWidth={stroke}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(.4,0,.2,1)" }}
          />
        </svg>

        {/* Centre text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-black tracking-tight" style={{ color: theme.text }}>
            {score}%
          </span>
          <span className="text-xs text-gray-400 font-semibold mt-0.5">Approval Chance</span>
        </div>
      </div>

      {/* Badge */}
      <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold border ${theme.badge}`}>
        <span className="w-1.5 h-1.5 rounded-full" style={{ background: theme.arc }} />
        {theme.label}
      </span>
    </div>
  );
}