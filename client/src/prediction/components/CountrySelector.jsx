import { useNavigate } from "react-router-dom";
import countryConfigs from "../data/countryConfigs";

const CARD_ACCENTS = {
  australia:  { from:"from-yellow-400", to:"to-red-500",    glow:"shadow-orange-100" },
  canada:     { from:"from-red-500",    to:"to-rose-600",   glow:"shadow-red-100"    },
  uk:         { from:"from-blue-600",   to:"to-indigo-700", glow:"shadow-blue-100"   },
  newzealand: { from:"from-teal-500",   to:"to-cyan-600",   glow:"shadow-teal-100"   },
};

const DIFFICULTY = {
  australia:  { label:"Moderate",   color:"text-amber-600   bg-amber-50   border-amber-200"   },
  canada:     { label:"Moderate",   color:"text-amber-600   bg-amber-50   border-amber-200"   },
  uk:         { label:"Strict",     color:"text-red-600     bg-red-50     border-red-200"     },
  newzealand: { label:"Accessible", color:"text-emerald-600 bg-emerald-50 border-emerald-200" },
};

export default function CountrySelector() {
  const navigate = useNavigate();

  return (
    /* 1-col on phones, 2-col on sm, 4-col on xl */
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
      {Object.entries(countryConfigs).map(([key, country]) => {
        const accent = CARD_ACCENTS[key] || CARD_ACCENTS.uk;
        const diff   = DIFFICULTY[key];

        return (
          <button
            key={key}
            onClick={() => navigate(`/prediction/${key}`)}
            className="group relative overflow-hidden bg-white rounded-2xl sm:rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 sm:hover:-translate-y-1.5 transition-all duration-300 text-left p-0 w-full"
          >
            {/* Gradient banner */}
            <div className={`h-24 sm:h-28 w-full bg-gradient-to-br ${accent.from} ${accent.to} flex items-center justify-center relative overflow-hidden`}>
              <span className="text-5xl sm:text-6xl drop-shadow-lg">{country.flag}</span>
              {/* Dot pattern */}
              <div
                className="absolute inset-0 opacity-10"
                style={{ backgroundImage:"radial-gradient(circle, white 1px, transparent 1px)", backgroundSize:"16px 16px" }}
              />
            </div>

            {/* Body */}
            <div className="p-4 sm:p-6">
              {diff && (
                <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full border mb-2 sm:mb-3 ${diff.color}`}>
                  {diff.label}
                </span>
              )}

              <h2 className="text-base sm:text-lg font-black text-gray-900 mb-1">{country.label}</h2>

              {/* Extra info row — success rate + processing */}
              <div className="flex items-center gap-3 mb-2 sm:mb-3">
                <span className="text-[10px] font-semibold text-gray-400">
                  ✅ {country.successRate}
                </span>
                <span className="text-[10px] text-gray-300">·</span>
                <span className="text-[10px] font-semibold text-gray-400">
                  ⏱ {country.processingTime}
                </span>
              </div>

              <p className="text-xs text-gray-400 leading-relaxed mb-4 sm:mb-5 hidden sm:block">
                {country.description}
              </p>

              {/* CTA */}
              <div className={`flex items-center gap-1.5 text-xs sm:text-sm font-bold bg-gradient-to-r ${accent.from} ${accent.to} bg-clip-text text-transparent`}>
                Start Prediction
                <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}