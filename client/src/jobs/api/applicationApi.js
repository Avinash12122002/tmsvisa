import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://tmsvisa.onrender.com/api",
});

// Attach token to every request if present
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/**
 * Submit a job application.
 *
 * IMPORTANT: Do NOT pass Content-Type: multipart/form-data manually.
 * When sending FormData, Axios (and fetch) must set the Content-Type
 * automatically so the browser can include the correct multipart boundary.
 * Setting it manually breaks the boundary and the server never receives
 * the file — which causes the "alert shows but data isn't saved" bug.
 */
export const applyJob = async (formData) => {
  const response = await API.post("/applications", formData, {
    headers: {
      // Let the browser set Content-Type + boundary automatically
      "Content-Type": undefined,
    },
  });
  return response.data;
};

export const getApplications = async () => {
  const response = await API.get("/applications");
  return response.data;
};

export const deleteApplication = async (id) => {
  const response = await API.delete(`/applications/${id}`);
  return response.data;
};