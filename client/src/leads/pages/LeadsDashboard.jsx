import AdminLayout from "../../pages/admin/layouts/AdminLayout";

import useLeads from "../hooks/useLeads";
import useConsultations from "../hooks/useConsultations";

// ---- Inline icons (no external icon lib dependency) ----
function IconUsers(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
function IconBriefcase(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
}
function IconPlane(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-1 .1-1.3.5l-.7.8c-.3.4-.2 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.4 5.9c.3.5.9.6 1.3.3l.8-.7c.4-.3.6-.8.3-1.3Z" />
    </svg>
  );
}
function IconSparkles(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8" />
    </svg>
  );
}
function IconCalendarCheck(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
      <path d="m9 16 2 2 4-4" />
    </svg>
  );
}

// ---- Stat card ----
function StatCard({ title, value, icon, accent, footnote }) {
  return (
    <div className="relative bg-white rounded-2xl shadow-sm border border-slate-100 p-5 overflow-hidden hover:shadow-md transition-shadow">
      <div
        className={`absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-10 ${accent.bg}`}
      />
      <div className="flex items-start justify-between relative">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="text-3xl font-bold text-slate-800 mt-2">{value}</p>
          {footnote && (
            <p className="text-xs text-slate-400 mt-1">{footnote}</p>
          )}
        </div>
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${accent.bg} ${accent.text}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

// ---- Breakdown bar row ----
function BreakdownRow({ label, value, total, color }) {
  const pct = total > 0 ? Math.round((value / total) * 100) : 0;

  return (
    <div>
      <div className="flex items-center justify-between text-sm mb-1.5">
        <span className="font-medium text-slate-700">{label}</span>
        <span className="text-slate-500">
          {value} <span className="text-slate-400">({pct}%)</span>
        </span>
      </div>
      <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export default function LeadsDashboard() {

  const { leads, loading } = useLeads();
  const { consultations, loading: consultationsLoading } = useConsultations();

  const isLoading = loading || consultationsLoading;

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="space-y-8">

          <div>
            <div className="h-9 w-64 bg-slate-200 rounded-lg animate-pulse" />
            <div className="h-4 w-80 bg-slate-100 rounded mt-3 animate-pulse" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-28 bg-white rounded-2xl shadow-sm border border-slate-100 animate-pulse" />
            ))}
          </div>

          <div className="h-64 bg-white rounded-2xl shadow-sm border border-slate-100 animate-pulse" />

        </div>
      </AdminLayout>
    );
  }

  const total = leads.length + consultations.length;

  const workVisa = leads.filter((l) => l.service === "Work Visa").length;
  const touristVisa = leads.filter((l) => l.service === "Tourist Visa").length;
  const visaAI = leads.filter((l) => l.service === "Visa AI").length;
  const visaCourses = leads.filter((l) => l.service === "Visa Courses").length;

  const serviceTotal = workVisa + touristVisa + visaAI + consultations.length;

  return (
    <AdminLayout>

      <div className="space-y-8">

        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h1 className="text-4xl font-bold text-slate-800">
              Lead Dashboard
            </h1>
            <p className="text-gray-500 mt-2">
              Monitor all incoming leads across every service
            </p>
          </div>

          <div className="bg-white border border-slate-100 rounded-xl px-4 py-2 shadow-sm text-sm text-slate-500">
            Total leads captured:{" "}
            <span className="font-semibold text-slate-800">{total}</span>
          </div>
        </div>

        {/* Top stat cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">

          <StatCard
            title="Total Leads"
            value={total}
            icon={<IconUsers className="w-5 h-5" />}
            accent={{ bg: "bg-slate-800", text: "text-white" }}
            footnote="Across all sources"
          />

          <StatCard
            title="Work Visa"
            value={workVisa}
            icon={<IconBriefcase className="w-5 h-5" />}
            accent={{ bg: "bg-blue-100", text: "text-blue-600" }}
          />

          <StatCard
            title="Tourist Visa"
            value={touristVisa}
            icon={<IconPlane className="w-5 h-5" />}
            accent={{ bg: "bg-emerald-100", text: "text-emerald-600" }}
          />

          <StatCard
            title="Visa AI"
            value={visaAI}
            icon={<IconSparkles className="w-5 h-5" />}
            accent={{ bg: "bg-purple-100", text: "text-purple-600" }}
          />

          <StatCard
            title="Consultation Leads"
            value={consultations.length}
            icon={<IconCalendarCheck className="w-5 h-5" />}
            accent={{ bg: "bg-pink-100", text: "text-pink-600" }}
            footnote="From popup form"
          />

        </div>

        {/* Breakdown + secondary panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-1">
              Lead Sources Breakdown
            </h2>
            <p className="text-sm text-slate-400 mb-6">
              Share of visa-service leads by category
            </p>

            <div className="space-y-5">
              <BreakdownRow
                label="Work Visa"
                value={workVisa}
                total={serviceTotal}
                color="bg-blue-500"
              />
              <BreakdownRow
                label="Tourist Visa"
                value={touristVisa}
                total={serviceTotal}
                color="bg-emerald-500"
              />
              <BreakdownRow
                label="Visa AI"
                value={visaAI}
                total={serviceTotal}
                color="bg-purple-500"
              />
              <BreakdownRow
                label="Consultation Leads"
                value={consultations.length}
                total={serviceTotal}
                color="bg-pink-500"
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-1">
              Quick Summary
            </h2>
            <p className="text-sm text-slate-400 mb-6">
              At a glance
            </p>

            <ul className="space-y-4">
              <li className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm text-slate-600">
                  <span className="w-8 h-8 rounded-lg bg-pink-100 text-pink-600 flex items-center justify-center">
                    <IconCalendarCheck className="w-4 h-4" />
                  </span>
                  Consultation Leads
                </span>
                <span className="font-semibold text-slate-800">{consultations.length}</span>
              </li>

              <li className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm text-slate-600">
                  <span className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center">
                    <IconUsers className="w-4 h-4" />
                  </span>
                  Visa Service Leads
                </span>
                <span className="font-semibold text-slate-800">{serviceTotal}</span>
              </li>

              <li className="flex items-center justify-between border-t border-slate-100 pt-4">
                <span className="text-sm font-medium text-slate-700">
                  Grand Total
                </span>
                <span className="font-bold text-slate-900 text-lg">{total}</span>
              </li>
            </ul>
          </div>

        </div>

      </div>

    </AdminLayout>
  );
}