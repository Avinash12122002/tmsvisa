import CountryFlag from "./CountryFlag";
import { useNavigate } from "react-router-dom";

export default function JobTable({ jobs }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100">

      {/* ── Desktop Header (hidden on mobile) ── */}
      <div className="hidden md:grid grid-cols-[140px_180px_1fr_130px_140px]
                      bg-gradient-to-r from-red-600 to-red-700">
        {["📅 Posting Date", "🌍 Country", "💼 Job Title", "📋 Description", "Apply"].map((h, i) => (
          <div
            key={i}
            className={`px-5 py-4 text-xs font-bold tracking-widest uppercase text-white/90
                        ${i === 4 ? "text-center" : ""}`}
          >
            {h}
          </div>
        ))}
      </div>

      {/* ── Mobile Header ── */}
      <div className="md:hidden bg-gradient-to-r from-red-600 to-red-700 px-5 py-3.5 flex items-center justify-between">
        <span className="text-xs font-bold tracking-widest uppercase text-white/90">💼 Job Listings</span>
        <span className="text-xs text-white/60">{jobs.length} jobs</span>
      </div>

      {/* ── Scrollable Body ── */}
      <div className="max-h-[600px] overflow-y-auto
                      scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-200">

        {jobs.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center gap-3 py-20 text-gray-400">
            <span className="text-5xl">🔍</span>
            <p className="text-sm font-medium">No jobs found for this filter.</p>
          </div>
        ) : (
          jobs.map((job, i) => (
            <div
              key={job._id}
              className="border-b border-gray-100 last:border-b-0
                         hover:bg-gray-50/70 transition-colors duration-150
                         /* Desktop: grid row */
                         md:grid md:grid-cols-[140px_180px_1fr_130px_140px] md:items-center
                         /* Mobile: card layout */
                         flex flex-col gap-3 p-4 md:p-0"
              style={{ animationDelay: `${i * 35}ms` }}
            >
              {/* ── DATE ── */}
              <div className="md:px-5 md:py-4 flex items-center gap-2 md:block">
                <span className="md:hidden text-[10px] font-bold tracking-widest uppercase text-gray-400 w-24 shrink-0">
                  Date
                </span>
                <span className="text-xs font-semibold text-gray-500 whitespace-nowrap">
                  {new Date(job.postingDate).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>

              {/* ── COUNTRY ── */}
              <div className="md:px-5 md:py-4 flex items-center gap-2 md:block">
                <span className="md:hidden text-[10px] font-bold tracking-widest uppercase text-gray-400 w-24 shrink-0">
                  Country
                </span>
                <CountryFlag country={job.country} />
              </div>

              {/* ── JOB TITLE ── */}
              <div className="md:px-5 md:py-4 flex items-center gap-2 md:block">
                <span className="md:hidden text-[10px] font-bold tracking-widest uppercase text-gray-400 w-24 shrink-0">
                  Job Title
                </span>
                <span className="text-sm font-semibold text-gray-800 line-clamp-2">
                  {job.title}
                </span>
              </div>

              {/* ── DESCRIPTION (View button) ── */}
              <div className="md:px-5 md:py-4 flex items-center gap-2 md:block">
                <span className="md:hidden text-[10px] font-bold tracking-widest uppercase text-gray-400 w-24 shrink-0">
                  Description
                </span>
                <button
                  onClick={() =>
  window.top.location.href =
    `https://app.tmsvisa.com/job/${job._id}`
}
                  className="text-xs font-semibold text-gray-500 border border-gray-200 rounded-lg
                             px-3 py-1.5 hover:border-red-500 hover:text-red-600
                             transition-all duration-200 whitespace-nowrap"
                >
                  View Details
                </button>
              </div>

              {/* ── APPLY BUTTON ── */}
              <div className="md:px-5 md:py-4 md:flex md:justify-center">
                <button
                  onClick={() =>
  window.top.location.href =
    `https://app.tmsvisa.com/jobs/apply/${job._id}`
}
                  className="w-full md:w-auto bg-red-600 hover:bg-red-700 active:scale-95
                             text-white text-xs font-bold tracking-wide
                             px-5 py-2.5 rounded-lg shadow-sm shadow-red-200
                             hover:shadow-md hover:shadow-red-200 hover:-translate-y-0.5
                             transition-all duration-200"
                >
                  Apply Now
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}