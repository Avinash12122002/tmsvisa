export default function StatsCard({ title, value, icon, trend }) {
  return (
    <div className="stats-card">
      <div className="stats-card__header">
        {icon && <div className="stats-card__icon">{icon}</div>}
        <span className="stats-card__title">{title}</span>
      </div>
      <p className="stats-card__value">{value}</p>
      {trend && (
        <div className={`stats-card__trend ${trend > 0 ? "stats-card__trend--up" : "stats-card__trend--down"}`}>
          <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            {trend > 0
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