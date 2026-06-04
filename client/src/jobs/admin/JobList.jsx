import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getJobs, deleteJob } from "../api/jobApi";
import AdminLayout from "../../pages/admin/layouts/AdminLayout";

export default function JobList() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    setLoading(true);
    try {
      const data = await getJobs();
      setJobs(data.jobs);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const removeJob = async (id) => {
    if (!window.confirm("Delete this job? This cannot be undone.")) return;
    setDeletingId(id);
    try {
      await deleteJob(id);
      setJobs((prev) => prev.filter((j) => j._id !== id));
    } catch (error) {
      console.log(error);
    } finally {
      setDeletingId(null);
    }
  };

  const filtered = jobs.filter(
    (j) =>
      j.title?.toLowerCase().includes(search.toLowerCase()) ||
      j.country?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-7">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Jobs</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {jobs.length} listing{jobs.length !== 1 ? "s" : ""} total
          </p>
        </div>
        <button
          onClick={() => navigate("/admin/jobs/create")}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 active:scale-95
                     text-white text-sm font-bold px-5 py-2.5 rounded-xl
                     shadow-md shadow-red-200 transition-all duration-200"
        >
          <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path d="M12 5v14M5 12h14" />
          </svg>
          Post a Job
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-5">
        <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-gray-400">
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
        </div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title or country…"
          className="w-full pl-11 pr-4 py-3 text-sm bg-white border border-gray-200 rounded-xl shadow-sm
                     focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500
                     transition-all duration-200"
        />
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

        {/* Desktop Header */}
        <div className="hidden md:grid grid-cols-[1fr_160px_170px]
                        bg-gradient-to-r from-red-600 to-red-700">
          {["Title", "Country", "Actions"].map((h, i) => (
            <div key={i}
              className={`px-5 py-3.5 text-xs font-bold tracking-widest uppercase text-white/90
                          ${i === 2 ? "text-right" : ""}`}>
              {h}
            </div>
          ))}
        </div>

        {/* Mobile Header */}
        <div className="md:hidden bg-gradient-to-r from-red-600 to-red-700 px-5 py-3 flex items-center justify-between">
          <span className="text-xs font-bold tracking-widest uppercase text-white/90">Job Listings</span>
          <span className="text-xs text-white/60">{filtered.length} results</span>
        </div>

        {/* Body */}
        <div className="divide-y divide-gray-50">
          {loading ? (
            <div className="py-16 flex flex-col items-center gap-3 text-gray-400">
              <svg className="animate-spin w-7 h-7 text-red-500" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              <span className="text-sm">Loading jobs…</span>
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-16 flex flex-col items-center gap-3 text-gray-400">
              <span className="text-4xl">📭</span>
              <p className="text-sm font-medium">No jobs found.</p>
              <button
                onClick={() => navigate("/admin/jobs/create")}
                className="text-xs font-semibold text-red-600 hover:text-red-700 transition-colors mt-1"
              >
                + Post your first job
              </button>
            </div>
          ) : (
            filtered.map((job, i) => (
              <div
                key={job._id}
                className="md:grid md:grid-cols-[1fr_160px_170px] md:items-center
                           flex flex-col gap-2.5 px-5 py-4 hover:bg-gray-50/80 transition-colors"
                style={{ animationDelay: `${i * 30}ms` }}
              >
                {/* Title */}
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-semibold text-gray-800 truncate">{job.title}</span>
                    <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          job.status === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {job.status}
                      </span>
                  <span className="md:hidden text-xs text-gray-400 mt-0.5">
                    {job.country} · {new Date(job.postingDate).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                  </span>
                </div>

                {/* Country */}
                <div className="hidden md:flex items-center">
                  <span className="text-sm text-gray-600">{job.country}</span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 md:justify-end flex-wrap">
                  <Link
                    to={`/admin/jobs/edit/${job._id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold
                               text-blue-600 border border-blue-200 bg-blue-50 rounded-lg
                               px-3 py-1.5 hover:bg-blue-100 transition-all duration-200"
                  >
                    <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                    Edit
                  </Link>

                  <button
                    onClick={() => removeJob(job._id)}
                    disabled={deletingId === job._id}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold
                               text-red-600 border border-red-200 bg-red-50 rounded-lg
                               px-3 py-1.5 hover:bg-red-100 disabled:opacity-50 disabled:cursor-not-allowed
                               transition-all duration-200"
                  >
                    {deletingId === job._id ? (
                      <svg className="animate-spin w-3 h-3" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                    ) : (
                      <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <polyline points="3,6 5,6 21,6" />
                        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                        <path d="M10 11v6M14 11v6" />
                        <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                      </svg>
                    )}
                    Delete
                  </button>

                  <Link
                    to={`/job/${job._id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold
                               text-green-700 border border-green-200 bg-green-50 rounded-lg
                               px-3 py-1.5 hover:bg-green-100 transition-all duration-200"
                  >
                    <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    View
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  );
}