import axios from "axios";

const API = axios.create({
  baseURL:
    "https://tms-backend.tmsvisa.com/api/job-dashboard",
});

const getAuthConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getDashboard =
  async () => {
    const response =
      await API.get(
        "/",
        getAuthConfig()
      );

    return response.data;
  };