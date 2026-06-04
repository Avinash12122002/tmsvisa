import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSingleJob, updateJob } from "../api/jobApi";
import AdminLayout from "../../pages/admin/layouts/AdminLayout";

export default function JobEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    loadJob();
  }, []);

  const loadJob = async () => {
    try {
      const data = await getSingleJob(id);
      setForm(data.job);
    } catch (error) {
      console.log(error);
    } finally {
      setFetching(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateJob(id, form);
      navigate("/admin/jobs");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <AdminLayout>
        <div className="flex flex-col items-center justify-center py-24 gap-3 text-gray-400">
          <svg className="animate-spin w-7 h-7 text-red-500" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          <span className="text-sm">Loading job details…</span>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={() => navigate("/admin/jobs")}
          className="flex items-center gap-1.5 text-sm font-semibold text-gray-500
                     bg-white border border-gray-200 rounded-lg px-3.5 py-2 shadow-sm
                     hover:border-red-500 hover:text-red-600 transition-all duration-200"
        >
          <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path d="m15 18-6-6 6-6" />
          </svg>
          Back
        </button>
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Edit Job</h1>
          <p className="text-sm text-gray-500 mt-0.5 truncate max-w-xs">
            {form.title || "Untitled Job"}
          </p>
        </div>
      </div>

      {/* Form Card */}
      <div className="max-w-2xl bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Yellow top accent — visually distinguishes Edit from Create */}
        <div className="h-1.5 bg-gradient-to-r from-amber-400 to-orange-400" />

        <form onSubmit={handleSubmit} className="p-7 md:p-9 flex flex-col gap-6">

          {/* Job Title */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold tracking-widest uppercase text-gray-500">
              Job Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={form.title || ""}
              onChange={handleChange}
              placeholder="Job title"
              required
              className="w-full px-4 py-3 text-sm text-gray-800 bg-gray-50 border border-gray-200
                         rounded-xl placeholder-gray-400 focus:bg-white
                         focus:outline-none focus:ring-2 focus:ring-amber-400/30 focus:border-amber-400
                         transition-all duration-200"
            />
          </div>

          {/* Country + Date row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold tracking-widest uppercase text-gray-500">
                Country
              </label>
              <input
                type="text"
                name="country"
                value={form.country || ""}
                onChange={handleChange}
                placeholder="Country"
                className="w-full px-4 py-3 text-sm text-gray-800 bg-gray-50 border border-gray-200
                           rounded-xl placeholder-gray-400 focus:bg-white
                           focus:outline-none focus:ring-2 focus:ring-amber-400/30 focus:border-amber-400
                           transition-all duration-200"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold tracking-widest uppercase text-gray-500">
                Posting Date
              </label>
              <input
                type="date"
                name="postingDate"
                value={
                  form.postingDate
                    ? new Date(form.postingDate).toISOString().split("T")[0]
                    : ""
                }
                onChange={handleChange}
                className="w-full px-4 py-3 text-sm text-gray-800 bg-gray-50 border border-gray-200
                           rounded-xl focus:bg-white
                           focus:outline-none focus:ring-2 focus:ring-amber-400/30 focus:border-amber-400
                           transition-all duration-200"
              />
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold tracking-widest uppercase text-gray-500">
              Job Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              rows={8}
              value={form.description || ""}
              onChange={handleChange}
              placeholder="Job description…"
              required
              className="w-full px-4 py-3 text-sm text-gray-800 bg-gray-50 border border-gray-200
                         rounded-xl placeholder-gray-400 resize-none focus:bg-white
                         focus:outline-none focus:ring-2 focus:ring-amber-400/30 focus:border-amber-400
                         transition-all duration-200 leading-relaxed"
            />
            <span className="text-xs text-gray-400 text-right">
              {(form.description || "").length} chars
            </span>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-1">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 flex-1
                         bg-gradient-to-r from-amber-500 to-orange-500
                         hover:from-amber-600 hover:to-orange-600 active:scale-[.98]
                         text-white text-sm font-bold py-3.5 rounded-xl
                         shadow-md shadow-amber-200 hover:shadow-lg hover:shadow-amber-200
                         disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200"
            >
              {loading ? (
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : (
                <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              )}
              {loading ? "Saving…" : "Save Changes"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/admin/jobs")}
              className="px-6 py-3.5 text-sm font-semibold text-gray-600
                         bg-white border border-gray-200 rounded-xl
                         hover:border-red-500 hover:text-red-600 transition-all duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}