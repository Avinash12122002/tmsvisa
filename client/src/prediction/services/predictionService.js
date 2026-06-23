import axios from "axios";

// ══════════════════════════════════════════════
// AXIOS INSTANCE
// ══════════════════════════════════════════════
const predictionAPI = axios.create({
  baseURL: "https://tms-backend.tmsvisa.com/api/prediction",
  withCredentials: true,
});

// ══════════════════════════════════════════════
// CREATE PREDICTION
// ══════════════════════════════════════════════
export const createPrediction = async (formData) => {
  try {
    const { data } = await predictionAPI.post("/analyze", formData);
    return data;
  } catch (error) {
    console.error("[createPrediction]", error);
    throw error;
  }
};

// ══════════════════════════════════════════════
// GET SINGLE PREDICTION
// ══════════════════════════════════════════════
export const getSinglePrediction = async (id) => {
  try {
    const { data } = await predictionAPI.get(`/${id}`);
    return data;
  } catch (error) {
    console.error("[getSinglePrediction]", error);
    throw error;
  }
};