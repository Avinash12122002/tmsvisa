const countryData = {
  USA:        { code: "us", label: "United States" },
  Canada:     { code: "ca", label: "Canada" },
  Australia:  { code: "au", label: "Australia" },
  Germany:    { code: "de", label: "Germany" },
  UK:         { code: "gb", label: "United Kingdom" },
  France:     { code: "fr", label: "France" },
  Sweden:     { code: "se", label: "Sweden" },
  NewZealand: { code: "nz", label: "New Zealand" },
  India:      { code: "in", label: "India" },
  UAE:        { code: "ae", label: "UAE" },
};

export default function CountryFlag({ country }) {
  const data = countryData[country];

  if (!data) {
    return (
      <div className="flex items-center gap-2">
        <span>🌍</span>
        <span>{country}</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <img
        src={`https://flagcdn.com/w40/${data.code}.png`}
        alt={data.label}
        className="w-6 h-4 object-cover rounded-sm"
      />
      <span className="text-sm font-medium text-slate-700">
        {data.label}
      </span>
    </div>
  );
}