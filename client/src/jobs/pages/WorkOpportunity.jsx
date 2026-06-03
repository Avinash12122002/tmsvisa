import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import JobTable from "../components/JobTable";
import Pagination from "../components/Pagination";
import { getJobs } from "../api/jobApi";

export default function WorkOpportunity() {
  const [jobs, setJobs] = useState([]);
  const [country, setCountry] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchJobs = async () => {
    try {
      const data = await getJobs(currentPage, country);
      setJobs(data.jobs);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [currentPage, country]);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Hero Banner ── */}
      <div className="relative bg-[#1A1A2E] overflow-hidden">
        {/* Background glow blobs */}
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-56 h-56 bg-red-800/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-5 py-16 md:py-20 text-center">
          {/* Eyebrow pill */}
          <span className="inline-block text-[11px] font-bold tracking-[.15em] uppercase
                           text-red-400 bg-red-500/10 border border-red-500/20
                           px-4 py-1.5 rounded-full mb-5">
            Global Careers
          </span>

          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Work Opportunity
          </h1>
          <p className="mt-3 text-white/50 text-base md:text-lg font-normal max-w-xl mx-auto">
            Explore thousands of roles across the world's top destinations
          </p>
        </div>
      </div>

      {/* ── Page Body ── */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-10 md:py-12">

        {/* Search */}
        <SearchBar country={country} setCountry={setCountry} />

        {/* Resume Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4
                        bg-white border border-gray-100 border-l-4 border-l-red-600
                        rounded-xl px-5 py-4 mb-8 shadow-sm">
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-red-600">📄 Post your Resume</span>
            {" — "}
            <strong className="text-gray-800">Your Resume Marketing Strategy starts here.</strong>
          </p>
          <button className="shrink-0 bg-red-600 hover:bg-red-700 active:scale-95
                             text-white text-sm font-bold px-5 py-2.5 rounded-lg
                             transition-all duration-200 shadow-sm shadow-red-200
                             hover:shadow-md hover:shadow-red-200">
            Upload Resume
          </button>
        </div>

        {/* Job Table */}
        <JobTable jobs={jobs} />

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}