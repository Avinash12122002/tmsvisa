import PredictionLayout from "../layouts/PredictionLayout";
import CountrySelector from "../components/CountrySelector";
import { HomeIllustration } from "../components/Visaillustrations";

const STATS = [
  { value: "94%",  label: "Accuracy"         },
  { value: "50K+", label: "Profiles Analyzed" },
  { value: "12+",  label: "Visa Categories"   },
  { value: "4",    label: "Countries"         },
];

const HOW_IT_WORKS = [
  { step:"01", icon:"📋", title:"Fill Your Profile", desc:"Answer 20+ questions about your finances, employment, and travel history." },
  { step:"02", icon:"🤖", title:"AI Analysis",       desc:"Our engine scores your profile across 14 key visa assessment categories." },
  { step:"03", icon:"📊", title:"Get Your Report",   desc:"Receive a detailed breakdown with strengths, weaknesses, and actionable suggestions." },
];

export default function PredictionHome() {
  return (
    <PredictionLayout>

      {/* ── HERO ── */}
      <section className="relative pt-4 pb-10 sm:pt-6 sm:pb-14">
        {/* Glow blob — hidden on tiny screens to save space */}
        <div className="hidden sm:block absolute -top-10 left-1/2 -translate-x-1/2 w-[500px] lg:w-[700px] h-[250px] bg-blue-200/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">

          {/* ── Text side ── */}
          <div className="w-full text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 font-semibold text-xs mb-5 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              AI-Powered Visa Intelligence
            </div>

            {/* Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 leading-tight tracking-tight mb-4">
              Know Your Visa
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Approval Chances
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-6 max-w-lg mx-auto lg:mx-0">
              Our AI analyzes 20+ factors — financial profile, travel history, and
              employment — to predict your visa approval probability with high accuracy.
            </p>

            {/* Stats grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 max-w-sm sm:max-w-none mx-auto lg:mx-0">
              {STATS.map((s) => (
                <div key={s.label} className="bg-white rounded-2xl px-3 py-3 sm:px-4 sm:py-4 shadow-sm border border-gray-100 text-center">
                  <p className="text-lg sm:text-xl font-black text-blue-600">{s.value}</p>
                  <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5 leading-tight">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Illustration side ── */}
          {/* Hidden on very small phones, shown from sm up */}
          <div className="hidden sm:flex items-center justify-center w-full">
            <HomeIllustration className="w-full max-w-xs sm:max-w-sm lg:max-w-md xl:max-w-lg drop-shadow-sm" />
          </div>
        </div>
      </section>

      {/* ── DIVIDER ── */}
      <div className="flex items-center gap-3 mb-6 sm:mb-8">
        <div className="flex-1 h-px bg-gray-200" />
        <p className="text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">
          Select Destination
        </p>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      {/* ── COUNTRY CARDS ── */}
      <CountrySelector />

      {/* ── HOW IT WORKS ── */}
      <section className="mt-14 sm:mt-20">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-black text-gray-800">How It Works</h2>
          <p className="text-gray-400 text-xs sm:text-sm mt-1">Three simple steps to your visa prediction</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {HOW_IT_WORKS.map((item) => (
            <div
              key={item.step}
              className="bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-7 border border-gray-100 shadow-sm relative overflow-hidden"
            >
              <span className="absolute top-3 right-4 text-4xl sm:text-5xl font-black text-gray-50 select-none leading-none">
                {item.step}
              </span>
              <div className="text-2xl sm:text-3xl mb-3 sm:mb-4">{item.icon}</div>
              <h3 className="font-black text-gray-800 text-sm sm:text-base mb-1.5 sm:mb-2">{item.title}</h3>
              <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── DISCLAIMER ── */}
      <div className="mt-10 sm:mt-14 max-w-3xl mx-auto bg-amber-50 border border-amber-100 rounded-2xl sm:rounded-3xl p-5 sm:p-7 flex gap-3 sm:gap-4 items-start">
        <span className="text-xl sm:text-2xl mt-0.5 flex-shrink-0">⚠️</span>
        <div>
          <h3 className="font-bold text-amber-700 text-sm sm:text-base mb-1">Important Disclaimer</h3>
          <p className="text-xs sm:text-sm text-amber-800 leading-relaxed">
            AI prediction is an estimated analysis based on your submitted profile and does not
            guarantee visa approval. All final decisions rest solely with the respective
            immigration authorities.
          </p>
        </div>
      </div>

    </PredictionLayout>
  );
}