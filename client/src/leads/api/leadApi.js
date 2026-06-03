import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL;

export const getLeads = async (
  filters = {}
) => {
  const response =
    await axios.get(
      `${API_URL}/leads`,
      {
        params: filters,
      }
    );

  return response.data.data;
};

export const getLeadById =
  async (id) => {
    const response =
      await axios.get(
        `${API_URL}/leads/${id}`
      );

    return response.data.data;
  };

export const updateLead =
  async (id, data) => {
    const response =
      await axios.put(
        `${API_URL}/leads/${id}`,
        data
      );

    return response.data.data;
  };

export const deleteLead =
  async (id) => {
    const response =
      await axios.delete(
        `${API_URL}/leads/${id}`
      );

    return response.data;
  };