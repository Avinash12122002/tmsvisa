const flags = {
  Canada: "🇨🇦",
  Australia: "🇦🇺",
  Germany: "🇩🇪",
  UK: "🇬🇧",
  USA: "🇺🇸",
};

export default function CountryFlag({
  country,
}) {
  return (
    <span>
      {flags[country] || "🌍"}{" "}
      {country}
    </span>
  );
}