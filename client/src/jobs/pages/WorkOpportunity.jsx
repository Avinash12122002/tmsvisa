import {
  useEffect,
  useState,
} from "react";

import SearchBar from "../components/SearchBar";

import JobTable from "../components/JobTable";

import Pagination from "../components/Pagination";

import {
  getJobs,
} from "../api/jobApi";

export default function WorkOpportunity() {
  const [jobs, setJobs] =
    useState([]);

  const [country, setCountry] =
    useState("");

  const [currentPage, setCurrentPage] =
    useState(1);

  const [totalPages, setTotalPages] =
    useState(1);

  const fetchJobs =
    async () => {
      try {
        const data =
          await getJobs(
            currentPage,
            country
          );

        setJobs(data.jobs);

        setTotalPages(
          data.totalPages
        );
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    fetchJobs();
  }, [
    currentPage,
    country,
  ]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8">
        Work Opportunity
      </h1>

      <SearchBar
        country={country}
        setCountry={
          setCountry
        }
      />

      <div className="bg-gray-100 p-6 rounded-lg mb-8 text-center">
        <h2 className="text-2xl font-semibold mb-3">
          Post Your Resume
        </h2>

        <p>
          Upload your resume
          for future
          opportunities
        </p>

        <button className="bg-red-600 text-white px-6 py-3 rounded mt-4">
          Upload Resume
        </button>
      </div>

      <JobTable jobs={jobs} />

      <Pagination
        currentPage={
          currentPage
        }
        totalPages={
          totalPages
        }
        onPageChange={
          setCurrentPage
        }
      />
    </div>
  );
}