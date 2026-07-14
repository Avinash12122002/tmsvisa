import { useState } from "react";

const countries = [
  { value: "Afghanistan", label: "Afghanistan", code: "af" },
  { value: "Albania", label: "Albania", code: "al" },
  { value: "Algeria", label: "Algeria", code: "dz" },
  { value: "Andorra", label: "Andorra", code: "ad" },
  { value: "Angola", label: "Angola", code: "ao" },
  { value: "AntiguaAndBarbuda", label: "Antigua and Barbuda", code: "ag" },
  { value: "Argentina", label: "Argentina", code: "ar" },
  { value: "Armenia", label: "Armenia", code: "am" },
  { value: "Australia", label: "Australia", code: "au" },
  { value: "Austria", label: "Austria", code: "at" },
  { value: "Azerbaijan", label: "Azerbaijan", code: "az" },
  { value: "Bahamas", label: "Bahamas", code: "bs" },
  { value: "Bahrain", label: "Bahrain", code: "bh" },
  { value: "Bangladesh", label: "Bangladesh", code: "bd" },
  { value: "Barbados", label: "Barbados", code: "bb" },
  { value: "Belarus", label: "Belarus", code: "by" },
  { value: "Belgium", label: "Belgium", code: "be" },
  { value: "Belize", label: "Belize", code: "bz" },
  { value: "Benin", label: "Benin", code: "bj" },
  { value: "Bhutan", label: "Bhutan", code: "bt" },
  { value: "Bolivia", label: "Bolivia", code: "bo" },
  { value: "BosniaAndHerzegovina", label: "Bosnia and Herzegovina", code: "ba" },
  { value: "Botswana", label: "Botswana", code: "bw" },
  { value: "Brazil", label: "Brazil", code: "br" },
  { value: "Brunei", label: "Brunei", code: "bn" },
  { value: "Bulgaria", label: "Bulgaria", code: "bg" },
  { value: "BurkinaFaso", label: "Burkina Faso", code: "bf" },
  { value: "Burundi", label: "Burundi", code: "bi" },
  { value: "Cambodia", label: "Cambodia", code: "kh" },
  { value: "Cameroon", label: "Cameroon", code: "cm" },
  { value: "Canada", label: "Canada", code: "ca" },
  { value: "CapeVerde", label: "Cape Verde", code: "cv" },
  { value: "CentralAfricanRepublic", label: "Central African Republic", code: "cf" },
  { value: "Chad", label: "Chad", code: "td" },
  { value: "Chile", label: "Chile", code: "cl" },
  { value: "China", label: "China", code: "cn" },
  { value: "Colombia", label: "Colombia", code: "co" },
  { value: "Comoros", label: "Comoros", code: "km" },
  { value: "CostaRica", label: "Costa Rica", code: "cr" },
  { value: "Croatia", label: "Croatia", code: "hr" },
  { value: "Cuba", label: "Cuba", code: "cu" },
  { value: "Cyprus", label: "Cyprus", code: "cy" },
  { value: "CzechRepublic", label: "Czech Republic", code: "cz" },
  { value: "Denmark", label: "Denmark", code: "dk" },
  { value: "Djibouti", label: "Djibouti", code: "dj" },
  { value: "Dominica", label: "Dominica", code: "dm" },
  { value: "DominicanRepublic", label: "Dominican Republic", code: "do" },
  { value: "Ecuador", label: "Ecuador", code: "ec" },
  { value: "Egypt", label: "Egypt", code: "eg" },
  { value: "ElSalvador", label: "El Salvador", code: "sv" },
  { value: "EquatorialGuinea", label: "Equatorial Guinea", code: "gq" },
  { value: "Eritrea", label: "Eritrea", code: "er" },
  { value: "Estonia", label: "Estonia", code: "ee" },
  { value: "Eswatini", label: "Eswatini", code: "sz" },
  { value: "Ethiopia", label: "Ethiopia", code: "et" },
  { value: "Fiji", label: "Fiji", code: "fj" },
  { value: "Finland", label: "Finland", code: "fi" },
  { value: "France", label: "France", code: "fr" },
  { value: "Gabon", label: "Gabon", code: "ga" },
  { value: "Gambia", label: "Gambia", code: "gm" },
  { value: "Georgia", label: "Georgia", code: "ge" },
  { value: "Germany", label: "Germany", code: "de" },
  { value: "Ghana", label: "Ghana", code: "gh" },
  { value: "Greece", label: "Greece", code: "gr" },
  { value: "Grenada", label: "Grenada", code: "gd" },
  { value: "Guatemala", label: "Guatemala", code: "gt" },
  { value: "Guinea", label: "Guinea", code: "gn" },
  { value: "Guyana", label: "Guyana", code: "gy" },
  { value: "Haiti", label: "Haiti", code: "ht" },
  { value: "Honduras", label: "Honduras", code: "hn" },
  { value: "Hungary", label: "Hungary", code: "hu" },
  { value: "Iceland", label: "Iceland", code: "is" },
  { value: "India", label: "India", code: "in" },
  { value: "Indonesia", label: "Indonesia", code: "id" },
  { value: "Iran", label: "Iran", code: "ir" },
  { value: "Iraq", label: "Iraq", code: "iq" },
  { value: "Ireland", label: "Ireland", code: "ie" },
  { value: "Israel", label: "Israel", code: "il" },
  { value: "Italy", label: "Italy", code: "it" },
  { value: "Jamaica", label: "Jamaica", code: "jm" },
  { value: "Japan", label: "Japan", code: "jp" },
  { value: "Jordan", label: "Jordan", code: "jo" },
  { value: "Kazakhstan", label: "Kazakhstan", code: "kz" },
  { value: "Kenya", label: "Kenya", code: "ke" },
  { value: "Kuwait", label: "Kuwait", code: "kw" },
  { value: "Kyrgyzstan", label: "Kyrgyzstan", code: "kg" },
  { value: "Laos", label: "Laos", code: "la" },
  { value: "Latvia", label: "Latvia", code: "lv" },
  { value: "Lebanon", label: "Lebanon", code: "lb" },
  { value: "Liberia", label: "Liberia", code: "lr" },
  { value: "Libya", label: "Libya", code: "ly" },
  { value: "Lithuania", label: "Lithuania", code: "lt" },
  { value: "Luxembourg", label: "Luxembourg", code: "lu" },
  { value: "Madagascar", label: "Madagascar", code: "mg" },
  { value: "Malawi", label: "Malawi", code: "mw" },
  { value: "Malaysia", label: "Malaysia", code: "my" },
  { value: "Maldives", label: "Maldives", code: "mv" },
  { value: "Mali", label: "Mali", code: "ml" },
  { value: "Malta", label: "Malta", code: "mt" },
  { value: "Mauritius", label: "Mauritius", code: "mu" },
  { value: "Mexico", label: "Mexico", code: "mx" },
  { value: "Mongolia", label: "Mongolia", code: "mn" },
  { value: "Montenegro", label: "Montenegro", code: "me" },
  { value: "Morocco", label: "Morocco", code: "ma" },
  { value: "Mozambique", label: "Mozambique", code: "mz" },
  { value: "Myanmar", label: "Myanmar", code: "mm" },
  { value: "Namibia", label: "Namibia", code: "na" },
  { value: "Nepal", label: "Nepal", code: "np" },
  { value: "Netherlands", label: "Netherlands", code: "nl" },
  { value: "NewZealand", label: "New Zealand", code: "nz" },
  { value: "Nigeria", label: "Nigeria", code: "ng" },
  { value: "Norway", label: "Norway", code: "no" },
  { value: "Oman", label: "Oman", code: "om" },
  { value: "Pakistan", label: "Pakistan", code: "pk" },
  { value: "Panama", label: "Panama", code: "pa" },
  { value: "PapuaNewGuinea", label: "Papua New Guinea", code: "pg" },
  { value: "Paraguay", label: "Paraguay", code: "py" },
  { value: "Peru", label: "Peru", code: "pe" },
  { value: "Philippines", label: "Philippines", code: "ph" },
  { value: "Poland", label: "Poland", code: "pl" },
  { value: "Portugal", label: "Portugal", code: "pt" },
  { value: "Qatar", label: "Qatar", code: "qa" },
  { value: "Romania", label: "Romania", code: "ro" },
  { value: "Russia", label: "Russia", code: "ru" },
  { value: "SaudiArabia", label: "Saudi Arabia", code: "sa" },
  { value: "Serbia", label: "Serbia", code: "rs" },
  { value: "Singapore", label: "Singapore", code: "sg" },
  { value: "Slovakia", label: "Slovakia", code: "sk" },
  { value: "Slovenia", label: "Slovenia", code: "si" },
  { value: "SouthAfrica", label: "South Africa", code: "za" },
  { value: "SouthKorea", label: "South Korea", code: "kr" },
  { value: "Spain", label: "Spain", code: "es" },
  { value: "SriLanka", label: "Sri Lanka", code: "lk" },
  { value: "Sweden", label: "Sweden", code: "se" },
  { value: "Switzerland", label: "Switzerland", code: "ch" },
  { value: "Taiwan", label: "Taiwan", code: "tw" },
  { value: "Thailand", label: "Thailand", code: "th" },
  { value: "Turkey", label: "Turkey", code: "tr" },
  { value: "UAE", label: "United Arab Emirates", code: "ae" },
  { value: "UK", label: "United Kingdom", code: "gb" },
  { value: "USA", label: "United States", code: "us" },
  { value: "Uruguay", label: "Uruguay", code: "uy" },
  { value: "Uzbekistan", label: "Uzbekistan", code: "uz" },
  { value: "Venezuela", label: "Venezuela", code: "ve" },
  { value: "Vietnam", label: "Vietnam", code: "vn" },
  { value: "Yemen", label: "Yemen", code: "ye" },
  { value: "Zambia", label: "Zambia", code: "zm" },
  { value: "Zimbabwe", label: "Zimbabwe", code: "zw" }
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