export default function StatsCard({ title, value, icon, trend }) {
  const isUp = trend > 0;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md
                    hover:-translate-y-0.5 transition-all duration-200 p-6">

      {/* Header row */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-[11px] font-bold tracking-widest uppercase text-gray-400">
          {title}
        </span>
        {icon && (
          <div className="w-9 h-9 bg-red-50 rounded-xl flex items-center justify-center text-lg">
            {icon}
          </div>
        )}
      </div>

      {/* Value */}
      <p className="text-3xl font-extrabold text-gray-900 tracking-tight leading-none">
        {value}
      </p>

      {/* Trend badge */}
      {trend !== undefined && (
        <div
          className={`inline-flex items-center gap-1 mt-3 text-xs font-semibold px-2.5 py-1 rounded-full
                      ${isUp
                        ? "bg-green-50 text-green-700"
                        : "bg-red-50 text-red-600"
                      }`}
        >
          <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            {isUp
              ? <path d="m18 15-6-6-6 6" />
              : <path d="m6 9 6 6 6-6" />
            }
          </svg>
          {Math.abs(trend)}% from last month
        </div>
      )}
    </div>
  );
}