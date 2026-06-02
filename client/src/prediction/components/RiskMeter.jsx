export default function RiskMeter({ risk }) {
  const levels  = ["High", "Medium", "Low"];
  const index   = levels.indexOf(risk);           // 0 | 1 | 2
  const pct     = index === 0 ? 16 : index === 1 ? 50 : 84;

  const theme = {
    High:   { color: "#ef4444", bg: "bg-red-50",    border: "border-red-100",   text: "text-red-600",    desc: "Higher scrutiny expected. Address key weaknesses before applying." },
    Medium: { color: "#f59e0b", bg: "bg-amber-50",  border: "border-amber-100", text: "text-amber-600",  desc: "Profile has room for improvement. Strengthen financial and tie documents." },
    Low:    { color: "#10b981", bg: "bg-emerald-50",border: "border-emerald-100",text: "text-emerald-600",desc: "Strong profile. Submit with complete documentation for best results." },
  }[risk];

  return (
    <div className={`w-full rounded-2xl border p-5 mt-6 ${theme.bg} ${theme.border}`}>
      {/* Label row */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Risk Level</span>
        <span className={`text-sm font-black ${theme.text}`}>{risk} Risk</span>
      </div>

      {/* Track */}
      <div className="relative h-3 rounded-full bg-gradient-to-r from-red-400 via-amber-400 to-emerald-400 mb-3">
        {/* Pointer */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-white shadow-md border-2 transition-all duration-1000"
          style={{ left: `${pct}%`, borderColor: theme.color }}
        />
      </div>

      {/* Tick labels */}
      <div className="flex justify-between text-[10px] font-semibold text-gray-400 mb-3">
        <span>High</span><span>Medium</span><span>Low</span>
      </div>

      <p className="text-xs text-gray-500 leading-relaxed">{theme.desc}</p>
    </div>
  );
}