import { useLocation, useNavigate } from "react-router-dom";
import PredictionLayout from "../layouts/PredictionLayout";
import ScoreCircle from "../components/ScoreCircle";
import RiskMeter from "../components/RiskMeter";
import { StrengthCard, WeaknessCard, SuggestionCard } from "../components/Cards";
import AIAnalysisBox from "../components/AIAnalysisBox";
import { ResultIllustration } from "../components/Visaillustrations";

// ─────────────────────────────────────────────
// Section wrapper
// ─────────────────────────────────────────────
function Section({ title, subtitle, accent, children, isEmpty, emptyMsg }) {
  const count = Array.isArray(children) ? children.filter(Boolean).length : (children ? 1 : 0);
  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
      <div className={`px-7 py-5 border-b border-gray-100 flex items-center gap-3 ${accent.header}`}>
        <span className="text-xl">{accent.emoji}</span>
        <div>
          <h2 className={`text-base font-black ${accent.title}`}>{title}</h2>
          {subtitle && <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>}
        </div>
        {!isEmpty && (
          <span className={`ml-auto text-xs font-bold px-2.5 py-1 rounded-full ${accent.badge}`}>
            {count} items
          </span>
        )}
      </div>
      <div className="p-6">
        {isEmpty ? (
          <p className="text-sm text-gray-400 text-center py-4">{emptyMsg}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">{children}</div>
        )}
      </div>
    </div>
  );
}

function SummaryPill({ label, value }) {
  return (
    <div className="flex flex-col items-center bg-gray-50 rounded-2xl p-4 border border-gray-100">
      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">{label}</span>
      <span className="text-sm font-black text-gray-800 text-center">{value || "—"}</span>
    </div>
  );
}

export default function PredictionResult() {
  const location  = useLocation();
  const navigate  = useNavigate();
  const prediction = location.state;

  if (!prediction) {
    return (
      <PredictionLayout>
        <div className="text-center py-32">
          <div className="text-6xl mb-6">🔍</div>
          <h1 className="text-3xl font-black text-gray-700 mb-3">No Prediction Found</h1>
          <p className="text-gray-400 mb-8">Please complete the form to generate a prediction.</p>
          <button
            onClick={() => navigate("/prediction")}
            className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition"
          >
            Go Back
          </button>
        </div>
      </PredictionLayout>
    );
  }

  const {
    approvalChance, riskLevel, strengths = [], weaknesses = [],
    suggestions = [], aiAnalysis, country, firstName,
    purposeOfVisit, tripSponsor, visaDenied,
  } = prediction;

  return (
    <PredictionLayout>
      <div className="max-w-5xl mx-auto">

        {/* ── HEADER with illustration ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-center mb-10">
          {/* Text side */}
          <div className="lg:col-span-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 font-semibold text-xs mb-4">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              Analysis Complete
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">
              {firstName ? `${firstName}'s ` : ""}Visa Prediction Report
            </h1>
            <p className="text-gray-400 text-sm">
              {country ? `${country} visa` : "Visa"} — AI-powered profile analysis across 14 scoring categories
            </p>
          </div>

          {/* Illustration */}
          <div className="lg:col-span-2 flex justify-center lg:justify-end">
            <ResultIllustration
              className="w-full max-w-xs"
              score={approvalChance}
            />
          </div>
        </div>

        {/* ── TOP ROW: Score + Risk + AI ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 mb-5">
          {/* Score + Risk */}
          <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm p-7 flex flex-col items-center justify-center">
            <ScoreCircle score={approvalChance} />
            <RiskMeter risk={riskLevel} />
          </div>

          {/* AI Analysis + mini stats */}
          <div className="lg:col-span-3 flex flex-col gap-5">
            <AIAnalysisBox text={aiAnalysis} />
            <div className="grid grid-cols-3 gap-3">
              <SummaryPill label="Purpose"      value={purposeOfVisit} />
              <SummaryPill label="Sponsor"      value={tripSponsor} />
              <SummaryPill label="Visa History" value={visaDenied === "No" ? "Clean ✓" : visaDenied} />
            </div>
          </div>
        </div>

        {/* ── STRENGTHS ── */}
        <div className="mb-5">
          <Section
            title="What Helps Your Application"
            subtitle={`${strengths.length} positive factor${strengths.length !== 1 ? "s" : ""} identified`}
            isEmpty={!strengths.length} emptyMsg="No notable strengths detected."
            accent={{ header:"bg-emerald-50/60", emoji:"✅", title:"text-emerald-700", badge:"bg-emerald-100 text-emerald-700" }}
          >
            {strengths.map((item, i) => <StrengthCard key={i} text={item} />)}
          </Section>
        </div>

        {/* ── WEAKNESSES ── */}
        <div className="mb-5">
          <Section
            title="What Hurts Your Application"
            subtitle={`${weaknesses.length} risk factor${weaknesses.length !== 1 ? "s" : ""} detected`}
            isEmpty={!weaknesses.length} emptyMsg="No significant weaknesses found."
            accent={{ header:"bg-red-50/60", emoji:"⚠️", title:"text-red-700", badge:"bg-red-100 text-red-700" }}
          >
            {weaknesses.map((item, i) => <WeaknessCard key={i} text={item} />)}
          </Section>
        </div>

        {/* ── SUGGESTIONS ── */}
        <div className="mb-8">
          <Section
            title="How to Improve Your Chances"
            subtitle="Actionable steps to strengthen your application"
            isEmpty={!suggestions.length} emptyMsg="No additional suggestions."
            accent={{ header:"bg-blue-50/60", emoji:"💡", title:"text-blue-700", badge:"bg-blue-100 text-blue-700" }}
          >
            {suggestions.map((item, i) => <SuggestionCard key={i} text={item} />)}
          </Section>
        </div>

        {/* ── ACTIONS ── */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <button
            onClick={() => navigate("/prediction")}
            className="flex-1 py-3.5 rounded-2xl bg-white border border-gray-200 text-gray-700 font-bold text-sm hover:bg-gray-50 transition"
          >
            ← Try Another Country
          </button>
          <button
            onClick={() => window.print()}
            className="flex-1 py-3.5 rounded-2xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 shadow-lg shadow-blue-200 transition"
          >
            🖨 Save / Print Report
          </button>
        </div>

        {/* ── DISCLAIMER ── */}
        <div className="bg-amber-50 border border-amber-100 rounded-3xl p-6 flex gap-3 items-start">
          <span className="text-xl mt-0.5">⚠️</span>
          <div>
            <h3 className="font-bold text-amber-700 text-sm mb-1">Important Disclaimer</h3>
            <p className="text-xs text-amber-800 leading-relaxed">
              This AI prediction is an estimated analysis based on your submitted profile and does not guarantee visa approval.
              All final decisions rest solely with the respective immigration and consular authorities.
            </p>
          </div>
        </div>

      </div>
    </PredictionLayout>
  );
}