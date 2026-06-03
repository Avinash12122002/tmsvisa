const countryData = {
  USA:       { flag: "🇺🇸", label: "United States" },
  Canada:    { flag: "🇨🇦", label: "Canada" },
  Australia: { flag: "🇦🇺", label: "Australia" },
  Germany:   { flag: "🇩🇪", label: "Germany" },
  UK:        { flag: "🇬🇧", label: "United Kingdom" },
  France:    { flag: "🇫🇷", label: "France" },
  Sweden:    { flag: "🇸🇪", label: "Sweden" },
  NewZealand:{ flag: "🇳🇿", label: "New Zealand" },
  India:     { flag: "🇮🇳", label: "India" },
  UAE:       { flag: "🇦🇪", label: "UAE" },
};

export default function CountryFlag({ country }) {
  const data = countryData[country] || { flag: "🌍", label: country };

  return (
    <div className="flex items-center gap-2">
      <span className="text-xl leading-none">{data.flag}</span>
      <span className="text-sm font-medium text-slate-700 leading-tight">
        {data.label}
      </span>
    </div>
  );
}