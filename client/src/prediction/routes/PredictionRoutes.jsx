import { Routes, Route } from "react-router-dom";

import PredictionHome from "../pages/PredictionHome";

import PredictionForm from "../pages/PredictionForm";

import PredictionResult from "../pages/PredictionResult";

const PredictionRoutes = () => {
  return (
    <Routes>
      {/* HOME */}

      <Route path="/" element={<PredictionHome />} />

      {/* FORM */}

      <Route path=":countryName" element={<PredictionForm />} />

      {/* RESULT */}

      <Route path="result/:id" element={<PredictionResult />} />
      
    </Routes>
  );
};

export default PredictionRoutes;
