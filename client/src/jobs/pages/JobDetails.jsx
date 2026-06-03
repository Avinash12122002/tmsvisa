import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getSingleJob } from "../api/jobApi";
import CountryFlag from "../components/CountryFlag";

export default function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    loadJob();
  }, []);

  const loadJob = async () => {
    try {
      const data = await getSingleJob(id);
      setJob(data.job);
    } catch (error) {
      console.log(error);
    }
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-4 text-gray-400">
        <svg className="animate-spin w-9 h-9 text-red-500" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
        <span className="text-sm font-medium">Loading job details…</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 md:py-14">
      <div className="max-w-3xl mx-auto">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-sm font-semibold text-gray-500
                     bg-white border border-gray-200 rounded-lg px-4 py-2 mb-7
                     hover:border-red-500 hover:text-red-600 transition-all duration-200 shadow-sm"
        >
          <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path d="m15 18-6-6 6-6" />
          </svg>
          Back to Jobs
        </button>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">

          {/* Card Top Banner */}
          <div className="relative bg-[#1A1A2E] px-7 py-8 overflow-hidden">
            <div className="absolute top-0 right-0 w-56 h-56 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

            {/* Badges */}
            <div className="flex flex-wrap gap-2.5 mb-4 relative">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold
                               bg-red-600/15 text-red-400 border border-red-500/20
                               px-3 py-1.5 rounded-full">
                <CountryFlag country={job.country} />
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold
                               bg-white/10 text-white/60 border border-white/10
                               px-3 py-1.5 rounded-full">
                <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <path d="M16 2v4M8 2v4M3 10h18" />
                </svg>
                Posted:{" "}
                {new Date(job.postingDate).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight leading-tight relative">
              {job.title}
            </h1>
          </div>

          {/* Card Body */}
          <div className="px-7 py-8">
            {/* Red divider */}
            <div className="w-12 h-[3px] bg-red-600 rounded-full mb-6" />

            {/* Description */}
            <h2 className="text-sm font-bold tracking-widest uppercase text-gray-400 mb-3">
              Job Description
            </h2>
            <div className="text-sm md:text-base text-gray-600 leading-relaxed whitespace-pre-wrap">
              {job.description}
            </div>

            {/* CTA Row */}
            <div className="flex flex-col sm:flex-row gap-3 mt-10">
              <Link
                to={`/jobs/apply/${job._id}`}
                className="flex items-center justify-center gap-2 flex-1 sm:flex-none
                           bg-gradient-to-r from-red-600 to-red-700
                           hover:from-red-700 hover:to-red-800 active:scale-[.98]
                           text-white text-sm font-bold px-7 py-3.5 rounded-xl
                           shadow-md shadow-red-200 hover:shadow-lg hover:shadow-red-200
                           transition-all duration-200"
              >
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M22 2 11 13" /><path d="m22 2-7 20-4-9-9-4 20-7z" />
                </svg>
                Apply Now
              </Link>

              <button
                onClick={handleShare}
                className="flex items-center justify-center gap-2
                           bg-white border border-gray-200 hover:border-red-500 hover:text-red-600
                           text-sm font-semibold text-gray-600 px-6 py-3.5 rounded-xl
                           transition-all duration-200"
              >
                {copied ? (
                  <>
                    <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
                      <path d="m8.59 13.51 6.83 3.98M15.41 6.51l-6.82 3.98" />
                    </svg>
                    Share Job
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}