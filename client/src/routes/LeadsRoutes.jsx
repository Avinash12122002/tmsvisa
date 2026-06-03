import { lazy } from "react";
import { Route } from "react-router-dom";

import AdminRoute from "./AdminRoute";

const LeadsDashboard = lazy(
  () => import("../leads/pages/LeadsDashboard")
);

const AllLeads = lazy(
  () => import("../leads/pages/AllLeads")
);

const WorkVisaLeads = lazy(
  () => import("../leads/pages/WorkVisaLeads")
);

const TouristVisaLeads = lazy(
  () => import("../leads/pages/TouristVisaLeads")
);

const VisaAILeads = lazy(
  () => import("../leads/pages/VisaAILeads")
);

const VisaCourseLeads = lazy(
  () => import("../leads/pages/VisaCourseLeads")
);

export default function LeadsRoutes() {
  return (
    <>
      <Route
        path="/admin/leads-dashboard"
        element={
          <AdminRoute>
            <LeadsDashboard />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/leads"
        element={
          <AdminRoute>
            <AllLeads />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/leads/work-visa"
        element={
          <AdminRoute>
            <WorkVisaLeads />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/leads/tourist-visa"
        element={
          <AdminRoute>
            <TouristVisaLeads />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/leads/visa-ai"
        element={
          <AdminRoute>
            <VisaAILeads />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/leads/visa-courses"
        element={
          <AdminRoute>
            <VisaCourseLeads />
          </AdminRoute>
        }
      />
    </>
  );
}