import { Route } from "react-router-dom";

import AdminRoute from "./AdminRoute";
import ProtectedRoute from "./ProtectedRoute";

import WorkOpportunity from "../jobs/pages/WorkOpportunity";
import JobDetails from "../jobs/pages/JobDetails";
import ApplyJob from "../jobs/pages/ApplyJob";

import Dashboard from "../jobs/admin/Dashboard";
import JobCreate from "../jobs/admin/JobCreate";
import JobEdit from "../jobs/admin/JobEdit";
import JobList from "../jobs/admin/JobList";
import Applications from "../jobs/admin/Applications";

const JobsRoutes = () => {
  return (
    <>
      <Route
        path="/work-opportunity"
        element={
            <WorkOpportunity />
        }
      />

      <Route
        path="/job/:id"
        element={
            <JobDetails />
        }
      />

      <Route
        path="/jobs/apply/:id"
        element={
            <ApplyJob />
        }
      />

      <Route
        path="/admin/job-dashboard"
        element={
          <AdminRoute>
            <Dashboard />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/jobs"
        element={
          <AdminRoute>
            <JobList />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/jobs/create"
        element={
          <AdminRoute>
            <JobCreate />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/jobs/edit/:id"
        element={
          <AdminRoute>
            <JobEdit />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/job-applications"
        element={
          <AdminRoute>
            <Applications />
          </AdminRoute>
        }
      />
    </>
  );
};

export default JobsRoutes;