import { useState } from "react";

const countries = [
  { value: "Canada", label: "Canada", code: "ca" },
  { value: "Australia", label: "Australia", code: "au" },
  { value: "Germany", label: "Germany", code: "de" },
  { value: "UK", label: "United Kingdom", code: "gb" },
  { value: "USA", label: "United States", code: "us" },
  { value: "France", label: "France", code: "fr" },
  { value: "Sweden", label: "Sweden", code: "se" },
  { value: "NewZealand", label: "New Zealand", code: "nz" },
  { value: "India", label: "India", code: "in" },
  { value: "UAE", label: "UAE", code: "ae" },
];

export default function SearchBar({ country, setCountry }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const filtered = countries.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder="Filter by country..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);

          if (!e.target.value) {
            setCountry("");
          }
        }}
        onFocus={() => setOpen(true)}
        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3
                   text-sm font-medium shadow-sm
                   focus:outline-none focus:ring-2 focus:ring-red-500/30"
      />

      {open && query && (
        <div className="absolute z-50 mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg">
          {filtered.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => {
                setCountry(item.value);
                setQuery(item.label);
                setOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 text-left"
            >
              <img
                src={`https://flagcdn.com/w40/${item.code}.png`}
                alt={item.label}
                className="w-6 h-4 rounded border"
              />
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}