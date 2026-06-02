// ─────────────────────────────────────────────
// Shared compact row card used by all three types
// ─────────────────────────────────────────────

function ItemCard({ icon, text, theme }) {
  return (
    <div className={`flex items-start gap-3 p-4 rounded-xl border transition-all hover:shadow-sm ${theme.bg} ${theme.border}`}>
      <div className={`min-w-[28px] h-[28px] rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 ${theme.iconBg} ${theme.iconText}`}>
        {icon}
      </div>
      <p className={`text-sm leading-relaxed ${theme.text}`}>{text}</p>
    </div>
  );
}

export function StrengthCard({ text }) {
  return (
    <ItemCard
      icon="✓"
      text={text}
      theme={{
        bg: "bg-emerald-50",
        border: "border-emerald-100",
        iconBg: "bg-emerald-500",
        iconText: "text-white",
        text: "text-emerald-900",
      }}
    />
  );
}

export function WeaknessCard({ text }) {
  return (
    <ItemCard
      icon="✕"
      text={text}
      theme={{
        bg: "bg-red-50",
        border: "border-red-100",
        iconBg: "bg-red-500",
        iconText: "text-white",
        text: "text-red-900",
      }}
    />
  );
}

export function SuggestionCard({ text }) {
  return (
    <ItemCard
      icon="→"
      text={text}
      theme={{
        bg: "bg-blue-50",
        border: "border-blue-100",
        iconBg: "bg-blue-600",
        iconText: "text-white",
        text: "text-blue-900",
      }}
    />
  );
}

// Default exports for backward compat with existing imports
export default StrengthCard;