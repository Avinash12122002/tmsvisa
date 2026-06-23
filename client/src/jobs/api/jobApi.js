import axios from "axios";

const API = axios.create({
  baseURL: "https://tms-backend.tmsvisa.com/api/jobs",
});

const getAuthConfig = () => {
  const token =
    localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getJobs = async (
  page = 1,
  country = ""
) => {
  const response = await API.get(
    `?page=${page}&country=${country}`
  );

  return response.data;
};

export const getSingleJob = async (
  id
) => {
  const response = await API.get(
    `/${id}`
  );

  return response.data;
};

export const createJob = async (
  data
) => {
  const response = await API.post(
    "/",
    data,
    getAuthConfig()
  );

  return response.data;
};

export const updateJob = async (
  id,
  data
) => {
  const response = await API.put(
    `/${id}`,
    data,
    getAuthConfig()
  );

  return response.data;
};

export const deleteJob = async (
  id
) => {
  const response = await API.delete(
    `/${id}`,
    getAuthConfig()
  );

  return response.data;
};