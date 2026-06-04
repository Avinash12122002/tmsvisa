import { useEffect, useState } from "react";
import { getApplications, deleteApplication, getResumeUrl, } from "../api/applicationApi";
import AdminLayout from "../../pages/admin/layouts/AdminLayout";

export default function Applications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    setLoading(true);
    try {
      const data = await getApplications();
      setApplications(data.applications);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const removeApplication = async (id) => {
    if (!window.confirm("Delete this application? This cannot be undone.")) return;
    setDeletingId(id);
    try {
      await deleteApplication(id);
      setApplications((prev) => prev.filter((a) => a._id !== id));
    } catch (error) {
      console.log(error);
    } finally {
      setDeletingId(null);
    }
  };

  const filtered = applications.filter(
    (a) =>
      a.name?.toLowerCase().includes(search.toLowerCase()) ||
      a.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-7">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Applications</h1>
          <p className="text-sm text-gray-500 mt-0.5">
              {filtered.length} total candidate application
              {filtered.length !== 1 ? "s" : ""}
            </p>
        </div>

        {/* Stats pill */}
        <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-xl px-4 py-2.5">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          <span className="text-sm font-semibold text-red-700">{applications.length} Received</span>
        </div>
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
          placeholder="Search by name or email…"
          className="w-full pl-11 pr-4 py-3 text-sm bg-white border border-gray-200 rounded-xl
                     focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500
                     transition-all duration-200 shadow-sm"
        />
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

        {/* Desktop Table Header */}
        <div className="hidden md:grid grid-cols-[1fr_1fr_130px_100px_120px]
                        bg-gradient-to-r from-red-600 to-red-700">
          {["Name", "Email", "Phone", "Resume", "Action"].map((h, i) => (
            <div key={i}
              className={`px-5 py-3.5 text-xs font-bold tracking-widest uppercase text-white/90
                          ${i >= 3 ? "text-center" : ""}`}>
              {h}
            </div>
          ))}
        </div>

        {/* Mobile Header */}
        <div className="md:hidden bg-gradient-to-r from-red-600 to-red-700 px-5 py-3 flex items-center justify-between">
          <span className="text-xs font-bold tracking-widest uppercase text-white/90">Candidates</span>
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
              <span className="text-sm">Loading applications…</span>
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-16 flex flex-col items-center gap-3 text-gray-400">
              <span className="text-4xl">📭</span>
              <p className="text-sm font-medium">No applications found.</p>
            </div>
          ) : (
            filtered.map((item, i) => (
              <div
                key={item._id}
                className="md:grid md:grid-cols-[1fr_1fr_130px_100px_120px] md:items-center
                           flex flex-col gap-2.5 px-5 py-4 hover:bg-gray-50/80 transition-colors"
                style={{ animationDelay: `${i * 30}ms` }}
              >
                {/* Name */}
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-red-100 text-red-700 flex items-center justify-center
                                  text-xs font-bold uppercase shrink-0">
                    {item.name?.[0] || "?"}
                  </div>
                  <span className="text-sm font-semibold text-gray-800 truncate">{item.name}</span>
                </div>

                {/* Email */}
                <div className="flex items-center gap-1.5 min-w-0 md:block">
                  <span className="md:hidden text-[10px] font-bold tracking-widest uppercase text-gray-400 w-14 shrink-0">Email</span>
                  <span className="text-sm text-gray-500 truncate">{item.email}</span>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-1.5 md:block">
                  <span className="md:hidden text-[10px] font-bold tracking-widest uppercase text-gray-400 w-14 shrink-0">Phone</span>
                  <span className="text-sm text-gray-500">{item.phone}</span>
                </div>

                {/* Resume */}
                <div className="flex items-center gap-1.5 md:justify-center">
                  <span className="md:hidden text-[10px] font-bold tracking-widest uppercase text-gray-400 w-14 shrink-0">Resume</span>
                  <a
                    href={getResumeUrl(item._id)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold
                              text-blue-600 border border-blue-200 bg-blue-50 rounded-lg
                              px-3 py-1.5 hover:bg-blue-100 transition-all duration-200"
                  >
                    {
                      item.resume?.fileName
                        ? item.resume.fileName.length > 15
                          ? item.resume.fileName.slice(0, 15) + "..."
                          : item.resume.fileName
                        : "View Resume"
                    }
                  </a>
                </div>

                {/* Delete */}
                <div className="flex items-center gap-1.5 md:justify-center">
                  <span className="md:hidden text-[10px] font-bold tracking-widest uppercase text-gray-400 w-14 shrink-0">Action</span>
                  <button
                    onClick={() => removeApplication(item._id)}
                    disabled={deletingId === item._id}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold
                               text-red-600 border border-red-200 bg-red-50 rounded-lg
                               px-3 py-1.5 hover:bg-red-100 disabled:opacity-50 disabled:cursor-not-allowed
                               transition-all duration-200"
                  >
                    {deletingId === item._id ? (
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
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  );
}