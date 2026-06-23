import axios from "axios";

const API = axios.create({
  baseURL: "https://tms-backend.tmsvisa.com/api/job-applications",
});

const getAuthConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

// Public Route
export const applyJob = async (formData) => {
  // ✅ DO NOT set Content-Type manually for FormData.
  // Axios must set it automatically so it can append the multipart boundary
  // (e.g. Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryXYZ).
  // Without the boundary the server can't parse the file and saves nothing,
  // but still returns 200 — which is why the alert fired but data wasn't stored.
  const response = await API.post("/apply", formData);
  return response.data;
};

// Protected Route
export const getApplications = async () => {
  const response = await API.get("/", getAuthConfig());
  return response.data;
};

// Protected Route
export const deleteApplication = async (id) => {
  const response = await API.delete(`/${id}`, getAuthConfig());
  return response.data;
};

export const getResumeUrl = (id) =>
  `https://tms-backend.tmsvisa.com/api/job-applications/resume/${id}`;