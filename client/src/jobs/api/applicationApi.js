import axios from "axios";

const API = axios.create({
  baseURL:
    "http://localhost:5000/api/job-applications",
});

const getAuthConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

// Public Route

export const applyJob = async (
  formData
) => {
  const response = await API.post(
    "/apply",
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return response.data;
};

// Protected Route

export const getApplications =
  async () => {
    const response =
      await API.get(
        "/",
        getAuthConfig()
      );

    return response.data;
  };

// Protected Route

export const deleteApplication =
  async (id) => {
    const response =
      await API.delete(
        `/${id}`,
        getAuthConfig()
      );

    return response.data;
  };