export default function LeadStatusBadge({
  status,
}) {
  const colors = {
    New:
      "bg-yellow-100 text-yellow-700",

    Contacted:
      "bg-blue-100 text-blue-700",

    Converted:
      "bg-green-100 text-green-700",
  };

  return (
    <span
      className={`
        px-3
        py-1
        rounded-full
        text-xs
        font-semibold
        ${colors[status]}
      `}
    >
      {status}
    </span>
  );
}