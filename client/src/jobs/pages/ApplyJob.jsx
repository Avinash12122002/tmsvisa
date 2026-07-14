import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ResumeUpload from "../components/ResumeUpload";
import { applyJob } from "../api/applicationApi";

export default function ApplyJob() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
     if (!resume) {
    alert("Please upload your resume");
    return;
  }
    setLoading(true);
    const formData = new FormData();
    formData.append("jobId", id);
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("phone", form.phone);
    formData.append("resume", resume);
    try {
      
      await applyJob(formData);
      alert("Application Submitted");
      window.top.location.href =
  "https://tmsvisa.com/work-visa/";
    } catch (error) {
      console.log(error);
      alert(
    error?.response?.data?.message ||
    "Failed to submit application"
  );
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    {
      name: "name",
      type: "text",
      placeholder: "John Doe",
      label: "Full Name",
      icon: (
        <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <circle cx="12" cy="8" r="4" />
          <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
        </svg>
      ),
    },
    {
      name: "email",
      type: "email",
      placeholder: "john@example.com",
      label: "Email Address",
      icon: (
        <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m22 7-10 7L2 7" />
        </svg>
      ),
    },
    {
      name: "phone",
      type: "text",
      placeholder: "+91 98765 43210",
      label: "Phone Number",
      icon: (
        <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.5 12.27 19.79 19.79 0 0 1 1.42 3.68 2 2 0 0 1 3.4 1.5h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l.76-.76a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.5 16.5z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center px-4 py-12">

      {/* Card */}
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">

        {/* Card Header */}
        <div className="bg-[#1A1A2E] px-8 py-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-red-600/10 rounded-full blur-2xl pointer-events-none" />

          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-white/40 hover:text-white
                       text-xs font-semibold mb-5 transition-colors duration-200"
          >
            <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="m15 18-6-6 6-6" />
            </svg>
            Back
          </button>

          {/* Icon */}
          <div className="w-12 h-12 bg-red-600/15 border border-red-500/25 rounded-xl
                          flex items-center justify-center text-red-400 mb-4">
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <rect x="2" y="3" width="20" height="14" rx="2" />
              <path d="m8 21 4-4 4 4" />
            </svg>
          </div>

          <h1 className="text-2xl font-extrabold text-white tracking-tight leading-tight">
            Apply for Position
          </h1>
          <p className="text-white/40 text-sm mt-1.5">
            Fill in your details — we'll take it from here.
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="px-8 py-8 flex flex-col gap-5">
          {fields.map(({ name, type, placeholder, label, icon }) => (
            <div key={name} className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold tracking-widest uppercase text-gray-500">
                {label}
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-3.5 text-gray-400 pointer-events-none">
                  {icon}
                </div>
                <input
                  type={type}
                  name={name}
                  placeholder={placeholder}
                  value={form[name]}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 text-sm text-gray-800 bg-white
                             border border-gray-200 rounded-xl placeholder-gray-400
                             focus:outline-none focus:ring-2 focus:ring-red-500/25 focus:border-red-500
                             transition-all duration-200"
                />
              </div>
            </div>
          ))}

          {/* Resume Upload */}
          <ResumeUpload setResume={setResume} />

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2.5 w-full
                       bg-gradient-to-r from-red-600 to-red-700
                       hover:from-red-700 hover:to-red-800 active:scale-[0.98]
                       text-white text-sm font-bold py-3.5 rounded-xl mt-1
                       shadow-md shadow-red-200 hover:shadow-lg hover:shadow-red-200
                       disabled:opacity-60 disabled:cursor-not-allowed
                       transition-all duration-200"
          >
            {loading ? (
              <svg className="animate-spin w-4 h-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            ) : (
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M22 2 11 13" /><path d="m22 2-7 20-4-9-9-4 20-7z" />
              </svg>
            )}
            {loading ? "Submitting..." : "Submit Application"}
          </button>
        </form>
      </div>
    </div>
  );
}