import {
  useEffect,
  useState,
} from "react";

import { Link } from "react-router-dom";

import StatsCard from "../components/StatsCard";

import {
  getDashboard,
} from "../api/dashboardApi";
import AdminLayout from "../../pages/admin/layouts/AdminLayout";

export default function Dashboard() {
  const [stats, setStats] =
    useState({
      totalJobs: 0,
      totalApplications: 0,
      activeJobs: 0,
      countriesCovered: 0,
    });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats =
    async () => {
      try {
        const data =
          await getDashboard();

        setStats(data);
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <AdminLayout>
    <div className="p-6">
      
      {/* Header */}

      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          Job Portal Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Manage Jobs,
          Applications and
          Work Opportunities
        </p>
      </div>

      {/* Statistics */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatsCard
          title="Total Jobs"
          value={
            stats.totalJobs
          }
        />

        <StatsCard
          title="Applications"
          value={
            stats.totalApplications
          }
        />

        <StatsCard
          title="Active Jobs"
          value={
            stats.activeJobs
          }
        />

        <StatsCard
          title="Countries"
          value={
            stats.countriesCovered
          }
        />
      </div>

      {/* Management Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <Link
          to="/admin/jobs/create"
          className="bg-blue-600 text-white rounded-xl p-6 shadow hover:shadow-lg transition"
        >
          <h2 className="text-xl font-bold mb-2">
            Create Job
          </h2>

          <p>
            Add a new job
            opening
          </p>
        </Link>

        <Link
          to="/admin/jobs"
          className="bg-green-600 text-white rounded-xl p-6 shadow hover:shadow-lg transition"
        >
          <h2 className="text-xl font-bold mb-2">
            Manage Jobs
          </h2>

          <p>
            Edit, Update &
            Delete Jobs
          </p>
        </Link>

        <Link
          to="/admin/job-applications"
          className="bg-purple-600 text-white rounded-xl p-6 shadow hover:shadow-lg transition"
        >
          <h2 className="text-xl font-bold mb-2">
            Applications
          </h2>

          <p>
            View Candidate
            Applications
          </p>
        </Link>

        <Link
          to="/work-opportunity"
          className="bg-red-600 text-white rounded-xl p-6 shadow hover:shadow-lg transition"
        >
          <h2 className="text-xl font-bold mb-2">
            View Portal
          </h2>

          <p>
            Open Public Job
            Portal
          </p>
        </Link>

      </div>

      {/* Quick Links */}

      <div className="mt-12 bg-white rounded-xl shadow p-6">
        <h2 className="text-2xl font-semibold mb-4">
          Quick Actions
        </h2>

        <div className="flex flex-wrap gap-4">

          <Link
            to="/admin/jobs/create"
            className="bg-blue-600 text-white px-5 py-3 rounded-lg"
          >
            Create New Job
          </Link>

          <Link
            to="/admin/jobs"
            className="bg-green-600 text-white px-5 py-3 rounded-lg"
          >
            View All Jobs
          </Link>

          <Link
            to="/admin/job-applications"
            className="bg-purple-600 text-white px-5 py-3 rounded-lg"
          >
            Applications
          </Link>

        </div>
      </div>
    </div>
    </AdminLayout>
  );
}