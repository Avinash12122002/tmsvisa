export default function SearchBar({ country, setCountry }) {
  return (
    <div className="relative w-full mb-6">
      {/* Left icon */}
      <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-gray-400">
        <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
      </div>

      {/* Select */}
      <select
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        className="w-full appearance-none bg-white border border-gray-200 rounded-xl pl-11 pr-10 py-3.5
                   text-sm font-medium text-gray-800 shadow-sm cursor-pointer
                   focus:outline-none focus:ring-2 focus:ring-red-500/30 focus:border-red-500
                   transition-all duration-200"
      >
        <option value="">🌍 Filter by Country</option>
        <option value="Canada">🇨🇦 Canada</option>
        <option value="Australia">🇦🇺 Australia</option>
        <option value="Germany">🇩🇪 Germany</option>
        <option value="UK">🇬🇧 United Kingdom</option>
        <option value="USA">🇺🇸 United States</option>
        <option value="France">🇫🇷 France</option>
        <option value="Sweden">🇸🇪 Sweden</option>
        <option value="NewZealand">🇳🇿 New Zealand</option>
      </select>

      {/* Right chevron */}
      <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-400">
        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
    </div>
  );
}