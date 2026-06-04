import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getLeads = async (filters = {}) => {
  try {
    const response = await axios.get(`${API_URL}/leads`, {
      params: filters,
    });

    return response.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getLeadById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/leads/${id}`);

    return response.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateLead = async (id, data) => {
  try {
    const response = await axios.put(`${API_URL}/leads/${id}`, data);

    return response.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteLead = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/leads/${id}`);

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
