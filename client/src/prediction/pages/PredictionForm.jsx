import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import predictionQuestions from "../data/predictionQuestions";
import { createPrediction } from "../services/predictionService";
import PredictionQuestions from "../components/PredictionQuestions";
import PredictionLayout from "../layouts/PredictionLayout";
import countryConfigs from "../data/countryConfigs";
import { FormIllustration } from "../components/Visaillustrations";

// ─────────────────────────────────────────────
// STEPS CONFIG
// ─────────────────────────────────────────────
const STEPS = [
  { id:"firstName", title:"What's your first name?", subtitle:"Let's start with the basics.", icon:"👤", type:"text", name:"firstName", placeholder:"e.g. Avinash" },
  { id:"lastName", title:"And your last name?", subtitle:"As it appears on your passport.", icon:"📋", type:"text", name:"lastName", placeholder:"e.g. Kumar" },
  { id:"age", title:"How old are you?", subtitle:"Age affects visa eligibility for many countries.", icon:"🎂", type:"number", name:"age", placeholder:"e.g. 23", min:18, max:80 },
  { id:"sex", title:"What is your gender?", subtitle:"Required for official visa documentation.", icon:"🪪", type:"dropdown", name:"sex", options:[{label:"Male",value:"Male"},{label:"Female",value:"Female"},{label:"Other / Prefer not to say",value:"Other"}] },
  { id:"maritalStatus", title:"What is your marital status?", subtitle:"Married applicants may need additional documents.", icon:"💍", type:"dropdown", name:"maritalStatus", options:[{label:"Single",value:"Single"},{label:"Married",value:"Married"},{label:"Divorced",value:"Divorced"},{label:"Widowed",value:"Widowed"}] },
  { id:"occupation", title:"What is your current occupation?", subtitle:"Be specific — e.g. 'Software Engineer', 'Doctor'.", icon:"💼", type:"text", name:"occupation", placeholder:"e.g. Software Engineer" },
  { id:"isEmployee", title:"Are you currently employed?", subtitle:"Employment strengthens your financial ties to your home country.", icon:"🏢", type:"dropdown", name:"isEmployee", options:[{label:"Yes, I am employed",value:"Yes"},{label:"No, I am not employed",value:"No"}] },
  { id:"employeeType", title:"What type of employment are you in?", subtitle:"Government jobs and formal employment boost approval chances.", icon:"🏛️", type:"dropdown", name:"employeeType", showIf:{field:"isEmployee",value:"Yes"}, options:[{label:"Government / Public sector",value:"Government"},{label:"Private sector (company employee)",value:"Private"},{label:"Business owner",value:"Business"},{label:"Self-employed / Freelancer",value:"Self Employed"}] },
  { id:"isStudent", title:"Are you currently a student?", subtitle:"Student status and enrollment letters matter for study visas.", icon:"🎓", type:"dropdown", name:"isStudent", options:[{label:"Yes, I am a student",value:"Yes"},{label:"No",value:"No"}] },
  { id:"isRetired", title:"Are you retired?", subtitle:"Retirees with pension income often have strong financial profiles.", icon:"🌅", type:"dropdown", name:"isRetired", options:[{label:"Yes, I am retired",value:"Yes"},{label:"No",value:"No"}] },
  { id:"monthlyIncome", title:"What is your monthly income?", subtitle:"Higher income significantly improves visa approval odds.", icon:"💰", type:"combo", name:"monthlyIncome", prefix:"₹", ranges:[{label:"Less than ₹25,000",value:"20000"},{label:"₹25,000 – ₹50,000",value:"37500"},{label:"₹50,000 – ₹1,00,000",value:"75000"},{label:"₹1,00,000 – ₹2,00,000",value:"150000"},{label:"Above ₹2,00,000",value:"250000"}], placeholder:"Enter exact monthly income" },
  { id:"bankBalance", title:"What is your current bank balance?", subtitle:"Embassies require 3–6 months of bank statements. A healthy balance shows financial stability.", icon:"🏦", type:"combo", name:"bankBalance", prefix:"₹", ranges:[{label:"Less than ₹50,000",value:"30000"},{label:"₹50,000 – ₹2,00,000",value:"125000"},{label:"₹2,00,000 – ₹5,00,000",value:"350000"},{label:"₹5,00,000 – ₹10,00,000",value:"750000"},{label:"Above ₹10,00,000",value:"1200000"}], placeholder:"Enter exact bank balance" },
  { id:"fileIncomeTax", title:"Do you file Income Tax Returns (ITR)?", subtitle:"ITR filings are proof of financial compliance and a strong positive signal for visa officers.", icon:"📊", type:"dropdown", name:"fileIncomeTax", options:[{label:"Yes, I file ITR regularly",value:"Yes"},{label:"No, I do not file ITR",value:"No"}] },
  { id:"passportNumber", title:"What is your passport number?", subtitle:"Enter exactly as printed on your passport. This stays confidential.", icon:"🛂", type:"text", name:"passportNumber", placeholder:"e.g. A1234567" },
  { id:"passportDateOfExpiry", title:"When does your passport expire?", subtitle:"Most countries require at least 6 months of validity beyond your intended stay.", icon:"📅", type:"date", name:"passportDateOfExpiry" },
  { id:"purposeOfVisit", title:"What is the purpose of your visit?", subtitle:"The purpose determines the visa category and required documents.", icon:"✈️", type:"dropdown", name:"purposeOfVisit", options:[{label:"Tourism / Leisure",value:"Tourism"},{label:"Business / Conference",value:"Business"},{label:"Higher Education / Study",value:"Study"},{label:"Work / Employment",value:"Work"},{label:"Medical Treatment",value:"Medical"},{label:"Family Visit",value:"Family Visit"},{label:"Transit",value:"Transit"}] },
  { id:"travelHistoryLast5Years", title:"How many countries have you visited in the last 5 years?", subtitle:"Strong travel history (especially Schengen, US, UK) greatly boosts approval chances.", icon:"🌍", type:"combo", name:"travelHistoryLast5Years", prefix:"", unit:" countries", ranges:[{label:"None — first international trip",value:"0"},{label:"1–2 countries",value:"1"},{label:"3–5 countries",value:"3"},{label:"6–10 countries",value:"6"},{label:"More than 10 countries",value:"11"}], placeholder:"Enter number of countries visited" },
  { id:"visaDenied", title:"Have you ever had a visa refused or denied?", subtitle:"Prior refusals must be disclosed honestly — concealment can cause permanent bans.", icon:"🚫", type:"dropdown", name:"visaDenied", options:[{label:"No, I have never been refused",value:"No"},{label:"Yes, I was refused once",value:"Yes - Once"},{label:"Yes, I was refused multiple times",value:"Yes - Multiple"}] },
  { id:"tripSponsor", title:"Who will be sponsoring your trip?", subtitle:"Financial sponsorship affects the documents you need to submit.", icon:"💳", type:"dropdown", name:"tripSponsor", options:[{label:"Self-funded",value:"Self"},{label:"Parents / Family",value:"Parents"},{label:"Spouse",value:"Spouse"},{label:"Employer / Company",value:"Company"},{label:"Relative abroad",value:"Relative"},{label:"Friend",value:"Friend"},{label:"Scholarship / Grant",value:"Scholarship"}] },
  { id:"familyTravelling", title:"Will family members be travelling with you?", subtitle:"Travelling with family strengthens tourist visa applications.", icon:"👨‍👩‍👧", type:"dropdown", name:"familyTravelling", options:[{label:"Yes, family is travelling with me",value:"Yes"},{label:"No, I am travelling alone",value:"No"}] },
  { id:"friendsRelativesInCountry", title:"Do you have friends or relatives in the destination country?", subtitle:"Ties abroad can be seen as an immigration risk. Be honest — visa officers verify this.", icon:"🤝", type:"dropdown", name:"friendsRelativesInCountry", options:[{label:"No, I do not",value:"No"},{label:"Yes, I have friends there",value:"Yes - Friends"},{label:"Yes, I have relatives there",value:"Yes - Relatives"},{label:"Yes, both friends and relatives",value:"Yes - Both"}] },
  { id:"questions", title:"A few more targeted questions", subtitle:"These questions help AI deeply analyze your specific profile.", icon:"🤖", type:"ai-questions" },
  { id:"submit", title:"You're all set!", subtitle:"Review your profile and generate your AI visa prediction.", icon:"🚀", type:"submit" },
];

// Section labels shown on the left panel
const SECTION_MAP = {
  firstName:"Personal", lastName:"Personal", age:"Personal", sex:"Personal", maritalStatus:"Personal",
  occupation:"Employment", isEmployee:"Employment", employeeType:"Employment", isStudent:"Employment", isRetired:"Employment",
  monthlyIncome:"Financial", bankBalance:"Financial", fileIncomeTax:"Financial",
  passportNumber:"Passport", passportDateOfExpiry:"Passport",
  purposeOfVisit:"Travel", travelHistoryLast5Years:"Travel", visaDenied:"Travel",
  tripSponsor:"Sponsorship", familyTravelling:"Sponsorship", friendsRelativesInCountry:"Sponsorship",
  questions:"AI Questions", submit:"Submit",
};

const SECTIONS = [
  { key:"Personal",    icon:"👤", color:"blue"    },
  { key:"Employment",  icon:"💼", color:"indigo"  },
  { key:"Financial",   icon:"💰", color:"emerald" },
  { key:"Passport",    icon:"🛂", color:"violet"  },
  { key:"Travel",      icon:"✈️", color:"amber"   },
  { key:"Sponsorship", icon:"💳", color:"rose"    },
  { key:"AI Questions",icon:"🤖", color:"purple"  },
  { key:"Submit",      icon:"🚀", color:"blue"    },
];

const COUNTRY_TIPS = {
  australia: ["Maintain ₹3L+ bank balance","Show strong employment ties","Provide 6 months bank statements","Tourism approvals average 78%"],
  canada:    ["ITR filings are highly valued","Maintain ₹4L+ bank balance","Strong employment letter needed","Processing takes 20–45 days"],
  uk:        ["Strictest financial scrutiny","Maintain ₹5L+ bank balance","Prior Schengen visa helps","Refusals must be fully explained"],
  newzealand:["Most accessible for Indian applicants","₹2.5L+ bank balance ideal","Clean visa history is key","Strong success rate of 82%"],
};

function formatCurrency(val) {
  if (!val) return "";
  const n = parseInt(val);
  if (isNaN(n)) return val;
  return "₹" + n.toLocaleString("en-IN");
}

// ─────────────────────────────────────────────
// LEFT PANEL
// ─────────────────────────────────────────────
function LeftPanel({ countryName, currentStepId, visibleSteps }) {
  const country = countryConfigs?.[countryName];
  const tips = COUNTRY_TIPS[countryName] || COUNTRY_TIPS.australia;
  const currentSection = SECTION_MAP[currentStepId] || "Personal";

  // Which sections are "done" — all steps in that section have been passed
  const visibleIds = visibleSteps.map(s => s.id);
  const currentIdx = visibleIds.indexOf(currentStepId);

  const sectionStatus = (sectionKey) => {
    const sectionStepIds = visibleSteps.filter(s => SECTION_MAP[s.id] === sectionKey).map(s => s.id);
    if (!sectionStepIds.length) return "hidden";
    const lastIdx = Math.max(...sectionStepIds.map(id => visibleIds.indexOf(id)));
    const firstIdx = Math.min(...sectionStepIds.map(id => visibleIds.indexOf(id)));
    if (lastIdx < currentIdx) return "done";
    if (firstIdx <= currentIdx && currentIdx <= lastIdx) return "active";
    return "upcoming";
  };

  return (
    <div className="hidden lg:flex flex-col w-72 xl:w-80 flex-shrink-0">
      {/* Country card */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-6 mb-5 text-white relative overflow-hidden shadow-xl shadow-blue-200">
        <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full" />
        <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-white/5 rounded-full" />
        <div className="relative z-10">
          <div className="text-4xl mb-3">{country?.flag || "🌍"}</div>
          <h3 className="text-xl font-black mb-0.5">{country?.label || countryName}</h3>
          <p className="text-blue-200 text-xs mb-4">Visa Predictor</p>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-white/15 rounded-xl px-3 py-2">
              <p className="text-[10px] text-blue-200 uppercase tracking-wide">Success Rate</p>
              <p className="text-base font-black">{country?.successRate || "—"}</p>
            </div>
            <div className="bg-white/15 rounded-xl px-3 py-2">
              <p className="text-[10px] text-blue-200 uppercase tracking-wide">Processing</p>
              <p className="text-base font-black leading-tight">{country?.processingTime || "—"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Section progress */}
      <div className="bg-white rounded-3xl p-5 mb-5 border border-gray-100 shadow-sm">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Your Progress</p>
        <div className="space-y-2.5">
          {SECTIONS.map((sec) => {
            const status = sectionStatus(sec.key);
            if (status === "hidden") return null;
            return (
              <div key={sec.key} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                status === "active"   ? "bg-blue-50 border border-blue-100" :
                status === "done"    ? "opacity-70" : "opacity-40"
              }`}>
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-sm flex-shrink-0 ${
                  status === "done"   ? "bg-emerald-100 text-emerald-600" :
                  status === "active" ? "bg-blue-600 text-white shadow-sm shadow-blue-300" :
                                        "bg-gray-100 text-gray-400"
                }`}>
                  {status === "done" ? "✓" : sec.icon}
                </div>
                <span className={`text-sm font-semibold ${
                  status === "active" ? "text-blue-700" :
                  status === "done"   ? "text-emerald-700" : "text-gray-400"
                }`}>{sec.key}</span>
                {status === "active" && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Tips */}
      <div className="bg-amber-50 border border-amber-100 rounded-3xl p-5">
        <p className="text-xs font-bold text-amber-600 uppercase tracking-widest mb-3">💡 Tips for {country?.shortLabel || "This Visa"}</p>
        <ul className="space-y-2">
          {tips.map((tip, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-amber-800 leading-relaxed">
              <span className="text-amber-400 mt-0.5 flex-shrink-0">→</span>
              {tip}
            </li>
          ))}
        </ul>
      </div>
       <div className="mt-4">
        <FormIllustration className="w-full opacity-90 drop-shadow-sm" />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// FIELD COMPONENTS
// ─────────────────────────────────────────────
function ProgressBar({ step, total }) {
  const pct = Math.round((step / total) * 100);
  return (
    <div className="mb-7">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-semibold text-gray-400">Step {step} of {total}</span>
        <span className="text-xs font-bold text-blue-600">{pct}% complete</span>
      </div>
      <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
        <div
          className="bg-gradient-to-r from-blue-500 to-indigo-500 h-1.5 rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function StepHeader({ icon, title, subtitle }) {
  return (
    <div className="mb-7">
      <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-2xl mb-4 shadow-sm">
        {icon}
      </div>
      <h2 className="text-xl font-black text-gray-900 mb-1 leading-tight">{title}</h2>
      <p className="text-gray-400 text-sm leading-relaxed">{subtitle}</p>
    </div>
  );
}

function TextInput({ step, value, onChange }) {
  return (
    <input
      type={step.type === "number" ? "number" : "text"}
      name={step.name}
      placeholder={step.placeholder}
      value={value || ""}
      min={step.min} max={step.max}
      onChange={onChange}
      autoFocus
      className="w-full px-5 py-4 border-2 border-gray-100 focus:border-blue-400 focus:ring-4 focus:ring-blue-50 rounded-2xl text-base outline-none transition-all bg-gray-50/50 focus:bg-white placeholder-gray-300 font-medium"
    />
  );
}

function DateInput({ step, value, onChange }) {
  return (
    <div className="space-y-2">
      <input
        type="date"
        name={step.name}
        value={value || ""}
        onChange={onChange}
        className="w-full px-5 py-4 border-2 border-gray-100 focus:border-blue-400 focus:ring-4 focus:ring-blue-50 rounded-2xl text-base outline-none transition-all bg-gray-50/50 focus:bg-white font-medium"
      />
      <p className="text-xs text-amber-600 bg-amber-50 border border-amber-100 rounded-xl px-3 py-2">
        ⚠️ Most countries require 6+ months validity beyond your travel dates.
      </p>
    </div>
  );
}

function DropdownInput({ step, value, onChange }) {
  return (
    <div className="space-y-2.5">
      {step.options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange({ target: { name: step.name, value: opt.value } })}
          className={`w-full text-left px-5 py-3.5 border-2 rounded-2xl transition-all text-sm font-medium flex items-center justify-between group ${
            value === opt.value
              ? "border-blue-500 bg-blue-50 text-blue-700 shadow-sm shadow-blue-100"
              : "border-gray-100 bg-gray-50/50 text-gray-600 hover:border-gray-200 hover:bg-white"
          }`}
        >
          <span>{opt.label}</span>
          <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
            value === opt.value ? "border-blue-500 bg-blue-500" : "border-gray-200 group-hover:border-gray-300"
          }`}>
            {value === opt.value && <span className="text-white text-xs">✓</span>}
          </span>
        </button>
      ))}
    </div>
  );
}

function ComboInput({ step, value, onChange, manualVal, onManualChange }) {
  const [showManual, setShowManual] = useState(!!manualVal);
  return (
    <div className="space-y-2.5">
      {step.ranges.map((r) => (
        <button
          key={r.value}
          type="button"
          onClick={() => { setShowManual(false); onChange({ target: { name: step.name, value: r.value } }); }}
          className={`w-full text-left px-5 py-3.5 border-2 rounded-2xl transition-all text-sm font-medium flex items-center justify-between group ${
            value === r.value && !showManual
              ? "border-blue-500 bg-blue-50 text-blue-700 shadow-sm shadow-blue-100"
              : "border-gray-100 bg-gray-50/50 text-gray-600 hover:border-gray-200 hover:bg-white"
          }`}
        >
          <span>{r.label}</span>
          <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
            value === r.value && !showManual ? "border-blue-500 bg-blue-500" : "border-gray-200"
          }`}>
            {value === r.value && !showManual && <span className="text-white text-xs">✓</span>}
          </span>
        </button>
      ))}
      <button
        type="button"
        onClick={() => { setShowManual(!showManual); if (!showManual) onChange({ target: { name: step.name, value: "" } }); }}
        className={`w-full px-5 py-3.5 border-2 rounded-2xl transition-all text-sm font-medium text-left ${
          showManual ? "border-blue-500 bg-blue-50 text-blue-700" : "border-dashed border-gray-200 text-gray-400 hover:border-blue-200 hover:text-blue-500"
        }`}
      >
        ✏️ Enter exact amount manually
      </button>
      {showManual && (
        <div className="relative">
          {step.prefix && (
            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 font-semibold select-none">{step.prefix}</span>
          )}
          <input
            type="number" name={step.name} placeholder={step.placeholder}
            value={manualVal || ""} min={0} autoFocus
            onChange={(e) => { onManualChange(e.target.value); onChange({ target: { name: step.name, value: e.target.value } }); }}
            className={`w-full px-5 py-4 border-2 border-blue-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-50 rounded-2xl text-base outline-none bg-white font-medium ${step.prefix ? "pl-9" : ""}`}
          />
          {step.unit && <span className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 text-sm">{step.unit}</span>}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────
export default function PredictionForm() {
  const navigate = useNavigate();
  const { countryName } = useParams();
  const [stepIndex, setStepIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [manualVals, setManualVals] = useState({});
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    country: countryName, firstName:"", lastName:"", age:"", sex:"", maritalStatus:"",
    occupation:"", isEmployee:"", employeeType:"", isStudent:"", isRetired:"",
    monthlyIncome:"", bankBalance:"", fileIncomeTax:"", passportNumber:"",
    passportDateOfExpiry:"", purposeOfVisit:"", travelHistoryLast5Years:"",
    visaDenied:"", tripSponsor:"", familyTravelling:"", friendsRelativesInCountry:"",
    questions:[],
  });

  const visibleSteps = STEPS.filter(s => !s.showIf || formData[s.showIf.field] === s.showIf.value);
  const totalSteps = visibleSteps.length;
  const currentStep = visibleSteps[stepIndex];

  const handleChange = (e) => { setError(""); setFormData({ ...formData, [e.target.name]: e.target.value }); };

  const validate = () => {
    const s = currentStep;
    if (s.type === "submit" || s.type === "ai-questions") return true;
    const val = formData[s.name];
    if (!val || val === "") { setError("Please complete this field to continue."); return false; }
    if (s.type === "number") {
      const n = parseInt(val);
      if (isNaN(n) || n < s.min || n > s.max) { setError(`Please enter a valid value between ${s.min} and ${s.max}.`); return false; }
    }
    return true;
  };

  const nextStep = () => { if (!validate()) return; setError(""); if (stepIndex < totalSteps - 1) setStepIndex(stepIndex + 1); };
  const prevStep = () => { setError(""); if (stepIndex > 0) setStepIndex(stepIndex - 1); };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const data = await createPrediction(formData);
      navigate(`/prediction/result/${data.prediction._id}`, { state: data.prediction });
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const renderField = () => {
    const s = currentStep;
    const val = formData[s.name] || "";

    if (s.type === "text" || s.type === "number")
      return <TextInput step={s} value={val} onChange={handleChange} />;
    if (s.type === "date")
      return <DateInput step={s} value={val} onChange={handleChange} />;
    if (s.type === "dropdown")
      return <DropdownInput step={s} value={val} onChange={handleChange} />;
    if (s.type === "combo")
      return <ComboInput step={s} value={val} onChange={handleChange} manualVal={manualVals[s.name] || ""} onManualChange={(v) => setManualVals({ ...manualVals, [s.name]: v })} />;

    if (s.type === "ai-questions")
      return (
        <PredictionQuestions
          questions={predictionQuestions.map(q => q.question)}
          answers={formData.questions.map(q => q.answer || "")}
          setAnswers={(answers) => {
            const updated = answers.map((answer, index) => ({ question: predictionQuestions[index].question, answer }));
            setFormData({ ...formData, questions: updated });
          }}
        />
      );

    if (s.type === "submit") return (
      <div className="space-y-4">
        {/* Summary grid */}
        <div className="bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-2xl border border-gray-100 overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-100 flex items-center gap-2">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Profile Summary</span>
          </div>
          <div className="p-4 grid grid-cols-1 gap-2.5">
            {[
              { label:"Full Name",    val:`${formData.firstName} ${formData.lastName}`.trim() },
              { label:"Destination",  val: countryName },
              { label:"Age",          val: formData.age ? `${formData.age} years` : "" },
              { label:"Purpose",      val: formData.purposeOfVisit },
              { label:"Employment",   val: formData.isEmployee === "Yes" ? formData.employeeType || "Employed" : formData.isStudent === "Yes" ? "Student" : formData.isRetired === "Yes" ? "Retired" : "Not employed" },
              { label:"Monthly Income", val: formData.monthlyIncome ? formatCurrency(formData.monthlyIncome) : "" },
              { label:"Bank Balance", val: formData.bankBalance ? formatCurrency(formData.bankBalance) : "" },
              { label:"ITR Filed",    val: formData.fileIncomeTax },
              { label:"Visa History", val: formData.visaDenied === "No" ? "✓ Clean" : formData.visaDenied },
              { label:"Travel History", val: formData.travelHistoryLast5Years ? `${formData.travelHistoryLast5Years} countries` : "" },
            ].map(({ label, val }) => (
              <div key={label} className="flex items-center justify-between py-1.5 border-b border-gray-100 last:border-0">
                <span className="text-xs text-gray-400 font-medium">{label}</span>
                <span className="text-xs font-bold text-gray-700 text-right max-w-[55%] truncate">{val || "—"}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Confidence hint */}
        <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-2xl p-4">
          <span className="text-lg mt-0.5">🤖</span>
          <p className="text-xs text-blue-700 leading-relaxed">
            Our AI will analyze 14 scoring categories across your financial profile, employment, travel history, and more to generate your prediction.
          </p>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-300 disabled:to-gray-400 text-white py-4 rounded-2xl font-black text-base transition-all shadow-xl shadow-blue-200 active:scale-95"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
              </svg>
              Analyzing your profile…
            </span>
          ) : "🚀 Generate AI Visa Prediction"}
        </button>
      </div>
    );

    return null;
  };

  const country = countryConfigs?.[countryName];

  return (
    <PredictionLayout>
      <div className="min-h-[calc(100vh-80px)] flex items-start justify-center py-6">
        <div className="w-full flex gap-6 items-start max-w-5xl mx-auto">

          {/* ── LEFT PANEL ── */}
          <LeftPanel
            countryName={countryName}
            currentStepId={currentStep.id}
            visibleSteps={visibleSteps}
          />

          {/* ── FORM CARD ── */}
          <div className="flex-1 min-w-0">
            {/* Mobile country badge */}
            <div className="flex items-center gap-3 mb-4 lg:hidden">
              <div className="text-2xl">{country?.flag || "🌍"}</div>
              <div>
                <p className="text-sm font-black text-gray-800">{country?.label || countryName} Visa</p>
                <p className="text-xs text-gray-400">{country?.successRate} success rate · {country?.processingTime}</p>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-lg shadow-blue-100/40 border border-gray-100 overflow-hidden">
              {/* Card top accent bar */}
              <div className="h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500" />

              <div className="p-7 sm:p-9">
                {/* Badge */}
                <div className="flex items-center justify-between mb-6">
                  <span className="inline-flex items-center gap-2 text-xs font-bold bg-blue-50 border border-blue-100 text-blue-600 px-3 py-1.5 rounded-full uppercase tracking-wide">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                    {(country?.label || countryName)} Visa Predictor
                  </span>
                  <span className="text-xs text-gray-400 font-medium hidden sm:block">
                    {SECTION_MAP[currentStep.id] || ""}
                  </span>
                </div>

                <ProgressBar step={stepIndex + 1} total={totalSteps} />
                <StepHeader icon={currentStep.icon} title={currentStep.title} subtitle={currentStep.subtitle} />

                {renderField()}

                {error && (
                  <div className="flex items-center gap-2 mt-4 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                    <span className="text-red-500">⚠</span>
                    <p className="text-red-600 text-sm font-medium">{error}</p>
                  </div>
                )}

                {/* Nav buttons */}
                <div className="flex gap-3 mt-8">
                  {stepIndex > 0 && (
                    <button
                      onClick={prevStep}
                      className="flex-none px-5 py-3.5 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-600 font-semibold transition-all text-sm"
                    >
                      ← Back
                    </button>
                  )}
                  {currentStep.type !== "submit" && (
                    <button
                      onClick={nextStep}
                      className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 active:scale-95 text-white font-bold transition-all text-sm shadow-lg shadow-blue-200"
                    >
                      Continue →
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Trust row */}
            <div className="flex items-center justify-center gap-4 mt-4">
              {["🔒 Encrypted", "🚫 Not stored", "🤖 AI-powered", "✅ Trusted"].map(t => (
                <span key={t} className="text-xs text-gray-300 font-medium">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PredictionLayout>
  );
}