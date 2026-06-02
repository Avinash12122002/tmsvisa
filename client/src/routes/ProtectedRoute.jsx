import { Navigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import Loader from "../components/ui/Loader";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  // ======================
  // LOADING STATE
  // ======================

  if (loading) {
    return <Loader text="Checking authentication..." />;
  }

  // ======================
  // NOT AUTHENTICATED
  // ======================

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // ======================
  // AUTHENTICATED
  // ======================

  return children;
};

export default ProtectedRoute;
