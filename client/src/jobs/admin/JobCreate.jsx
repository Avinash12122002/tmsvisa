import { useState } from "react";
import { createJob } from "../api/jobApi";
import AdminLayout from "../../pages/admin/layouts/AdminLayout";
import { useNavigate } from "react-router-dom";

const countries = [
  { name: "USA",         code: "US" },
  { name: "Canada",      code: "CA" },
  { name: "Australia",   code: "AU" },
  { name: "Germany",     code: "DE" },
  { name: "UK",          code: "GB" },
  { name: "France",      code: "FR" },
  { name: "Sweden",      code: "SE" },
  { name: "NewZealand",  code: "NZ" },
  { name: "India",       code: "IN" },
  { name: "UAE",         code: "AE" },
];

const emptyForm = {
  postingDate: "",
  country: "",
  countryCode: "",
  title: "",
  description: "",
  status: "active",
};

export default function JobCreate() {
  const navigate = useNavigate();
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Auto-fill countryCode when country is selected
    if (name === "country") {
      const found = countries.find((c) => c.name === value);
      setForm({ ...form, country: value, countryCode: found ? found.code : "" });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    try {
      await createJob(form);
      setSuccess(true);
      setForm(emptyForm);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <button
          onClick={() => navigate(-1)}
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
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Create Job</h1>
          <p className="text-sm text-gray-500 mt-0.5">Fill in the details to publish a new listing</p>
        </div>
      </div>

      {/* Success Banner */}
      {success && (
        <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl
                        px-5 py-3.5 mb-6 text-sm font-semibold text-green-700">
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path d="M20 6 9 17l-5-5" />
          </svg>
          Job created successfully!
        </div>
      )}

      {/* Form Card */}
      <div className="max-w-2xl bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="h-1.5 bg-gradient-to-r from-red-600 to-red-400" />

        <form onSubmit={handleSubmit} className="p-7 md:p-9 flex flex-col gap-6">

          {/* Posting Date */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold tracking-widest uppercase text-gray-500">
              Posting Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="postingDate"
              value={form.postingDate}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 text-sm text-gray-800 bg-gray-50 border border-gray-200
                         rounded-xl focus:bg-white focus:outline-none focus:ring-2
                         focus:ring-red-500/20 focus:border-red-500 transition-all duration-200"
            />
          </div>

          {/* Country + Code row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Country dropdown */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold tracking-widest uppercase text-gray-500">
                Country <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  required
                  className="w-full appearance-none px-4 py-3 pr-9 text-sm text-gray-800
                             bg-gray-50 border border-gray-200 rounded-xl cursor-pointer
                             focus:bg-white focus:outline-none focus:ring-2
                             focus:ring-red-500/20 focus:border-red-500 transition-all duration-200"
                >
                  <option value="">Select Country</option>
                  {countries.map((c) => (
                    <option key={c.name} value={c.name}>{c.name}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Country Code — auto-filled, still editable */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold tracking-widest uppercase text-gray-500">
                Country Code
              </label>
              <input
                type="text"
                name="countryCode"
                placeholder="e.g. US, CA, AU"
                value={form.countryCode}
                onChange={handleChange}
                maxLength={3}
                className="w-full px-4 py-3 text-sm text-gray-800 bg-gray-50 border border-gray-200
                           rounded-xl focus:bg-white focus:outline-none focus:ring-2
                           focus:ring-red-500/20 focus:border-red-500 transition-all duration-200"
              />
            </div>
          </div>

          {/* Job Title */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold tracking-widest uppercase text-gray-500">
              Job Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              placeholder="e.g. Senior Software Engineer"
              value={form.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 text-sm text-gray-800 bg-gray-50 border border-gray-200
                         rounded-xl placeholder-gray-400 focus:bg-white focus:outline-none
                         focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all duration-200"
            />
          </div>

          {/* Status */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold tracking-widest uppercase text-gray-500">
              Status
            </label>
            <div className="flex gap-3">
              {["active", "inactive"].map((s) => (
                <label
                  key={s}
                  className={`flex items-center gap-2 cursor-pointer px-4 py-2.5 rounded-xl border text-sm font-semibold
                              transition-all duration-200 capitalize
                              ${form.status === s
                                ? s === "active"
                                  ? "bg-green-50 border-green-400 text-green-700"
                                  : "bg-gray-100 border-gray-300 text-gray-600"
                                : "bg-gray-50 border-gray-200 text-gray-500 hover:border-gray-300"
                              }`}
                >
                  <input
                    type="radio"
                    name="status"
                    value={s}
                    checked={form.status === s}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <span className={`w-2 h-2 rounded-full ${s === "active" && form.status === "active" ? "bg-green-500" : s === "inactive" && form.status === "inactive" ? "bg-gray-400" : "bg-gray-300"}`} />
                  {s}
                </label>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[11px] font-bold tracking-widest uppercase text-gray-500">
              Job Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              rows={7}
              placeholder="Describe the role, responsibilities, requirements…"
              value={form.description}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 text-sm text-gray-800 bg-gray-50 border border-gray-200
                         rounded-xl placeholder-gray-400 resize-none focus:bg-white
                         focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500
                         transition-all duration-200 leading-relaxed"
            />
            <span className="text-xs text-gray-400 text-right">{form.description.length} chars</span>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 pt-1">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 flex-1
                         bg-gradient-to-r from-red-600 to-red-700
                         hover:from-red-700 hover:to-red-800 active:scale-[.98]
                         text-white text-sm font-bold py-3.5 rounded-xl
                         shadow-md shadow-red-200 hover:shadow-lg hover:shadow-red-200
                         disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200"
            >
              {loading ? (
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : (
                <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              )}
              {loading ? "Publishing…" : "Publish Job"}
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