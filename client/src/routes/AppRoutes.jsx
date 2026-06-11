import { Routes, Route, Navigate } from "react-router-dom";

import { lazy, Suspense } from "react";

import ProtectedRoute from "./ProtectedRoute";

import Loader from "../components/ui/Loader";

import AdminRoute from "./AdminRoute";

import PredictionRoutes from "../prediction/routes/PredictionRoutes";

import JobsRoutes from "./JobsRoutes";

import LeadsRoutes from "./LeadsRoutes";

// ======================
// AUTH PAGES
// ======================

const Login = lazy(() => import("../pages/auth/Login"));

const Register = lazy(() => import("../pages/auth/Register"));

const ForgotPassword = lazy(() => import("../pages/auth/ForgotPassword"));

// ======================
// USER DASHBOARD
// ======================

const UserDashboard = lazy(() => import("../pages/dashboard/Dashboard"));

// ======================
// ADMIN PAGES
// ======================

const AdminDashboard = lazy(() => import("../pages/admin/Dashboard"));

const AddVisa = lazy(() => import("../pages/admin/AddVisa"));

const Applications = lazy(() => import("../pages/admin/Applications"));

const Users = lazy(() => import("../pages/admin/Users"));

const ApplicationDetails = lazy(
  () => import("../pages/admin/ApplicationDetails"),
);

const Payments = lazy(() => import("../pages/admin/Payments"));

const Analytics = lazy(() => import("../pages/admin/Analytics"));

const Settings = lazy(() => import("../pages/admin/Settings"));

// const AdminLogin = lazy(() => import("../pages/admin/AdminLogin"));

// ======================
// VISA PAGES
// ======================

import CountryDescriptions from "../pages/CountryDescriptions/CountryDescriptions";
import Dashboard from "../jobs/admin/Dashboard";

const VisaFormRouter = lazy(() => import("./VisaFormRouter"));

// ======================
// LEGAL PAGES
// ======================

const TermsPage = lazy(() => import("../pages/legal/TermsPage"));

const PrivacyPolicyPage = lazy(
  () => import("../pages/legal/PrivacyPolicyPage"),
);

const RefundPolicyPage = lazy(() => import("../pages/legal/RefundPolicyPage"));

// ======================
// ERROR PAGE
// ======================

const NotFound = lazy(() => import("../pages/error/NotFound"));

// ======================
// APP ROUTES
// ======================

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* ======================
              DEFAULT
          ====================== */}

        {/* <Route path="/" element={<Navigate to="/login" />} /> */}

        <Route path="/" element={<Navigate to="/dashboard" />} />

        {/* ======================
              AUTH ROUTES
          ====================== */}

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* ======================
              ADMIN LOGIN
          ====================== */}

        {/* <Route path="/admin/login" element={<AdminLogin />} /> */}

        {/* ======================
              LEGAL PAGES
          ====================== */}

        <Route path="/terms" element={<TermsPage />} />

        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />

        <Route path="/refund-policy" element={<RefundPolicyPage />} />

        {/* ======================
              USER DASHBOARD
          ====================== */}

        <Route
          path="/dashboard"
          element={
            // <ProtectedRoute>
            //   <UserDashboard />
            // </ProtectedRoute>
            <UserDashboard />
          }
        />

        {/* ======================
              COUNTRY DESCRIPTION
          ====================== */}

        <Route
          path="/country/:countryName"
          element={
            // <ProtectedRoute>
            //   <CountryDescriptions />
            // </ProtectedRoute>
            <CountryDescriptions />
          }
        />

        {/* ======================
              VISA FORM ROUTER
          ====================== */}

        <Route
          path="/visa-form/:countryName"
          element={
            // <ProtectedRoute>
            //   <VisaFormRouter />
            // </ProtectedRoute>
            <VisaFormRouter />
          }
        />

        {/* ======================
              ADMIN DASHBOARD
          ====================== */}

        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        {/* ======================
              ADMIN ADD VISA
          ====================== */}

        <Route
          path="/admin/add-visa"
          element={
            <AdminRoute>
              <AddVisa />
            </AdminRoute>
          }
        />

        {/* ======================
              ADMIN APPLICATIONS
          ====================== */}

        <Route
          path="/admin/applications"
          element={
            <AdminRoute>
              <Applications />
            </AdminRoute>
          }
        />

        {/* ======================
              USERS
          ====================== */}

        <Route
          path="/admin/users"
          element={
            <AdminRoute>
              <Users />
            </AdminRoute>
          }
        />

        {/* ======================
              APPLICATION DETAILS
          ====================== */}

        <Route
          path="/admin/applications/:id"
          element={
            <AdminRoute>
              <ApplicationDetails />
            </AdminRoute>
          }
        />

        {/* ======================
              PAYMENTS
          ====================== */}

        <Route
          path="/admin/payments"
          element={
            <AdminRoute>
              <Payments />
            </AdminRoute>
          }
        />

        {/* ======================
              ANALYTICS
          ====================== */}

        <Route
          path="/admin/analytics"
          element={
            <AdminRoute>
              <Analytics />
            </AdminRoute>
          }
        />

        {/* ======================
              SETTINGS
          ====================== */}

        <Route
          path="/admin/settings"
          element={
            <AdminRoute>
              <Settings />
            </AdminRoute>
          }
        />

        {/* ======================
              AI PREDICTION
          ====================== */}

        <Route path="/prediction/*" element={<PredictionRoutes />} />

        {JobsRoutes()}
        {LeadsRoutes()}

        {/* ======================
              404 PAGE
          ====================== */}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
