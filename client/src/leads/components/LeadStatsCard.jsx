export default function LeadStatsCard({
  title,
  value,
  color,
}) {
  return (
    <div
      className={`
        rounded-2xl
        shadow
        text-white
        p-6
        ${color}
      `}
    >
      <h3 className="text-sm opacity-90">
        {title}
      </h3>

      <h2 className="text-4xl font-bold mt-2">
        {value}
      </h2>
    </div>
  );
}