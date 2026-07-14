import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getConsultations = async (filters = {}) => {
  try {
    const response = await axios.get(`${API_URL}/consultations`, {
      params: filters,
    });

    return response.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getConsultationById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/consultations/${id}`);

    return response.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateConsultation = async (id, data) => {
  try {
    const response = await axios.put(`${API_URL}/consultations/${id}`, data);

    return response.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteConsultation = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/consultations/${id}`);

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};