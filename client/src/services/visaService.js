import api from "../api/axios";



// GET VISAS
export const getVisas =
  async () => {

    const response =
      await api.get(
        "/visas"
      );

    return response.data;
  };



// CREATE VISA
export const createVisa =
  async (data) => {

    const response =
      await api.post(
        "/visas",
        data
      );

    return response.data;
  };



// UPDATE VISA
export const updateVisa =
  async (
    id,
    data
  ) => {

    const response =
      await api.put(
        `/visas/${id}`,
        data
      );

    return response.data;
  };



// DELETE VISA
export const deleteVisa =
  async (id) => {

    const response =
      await api.delete(
        `/visas/${id}`
      );

    return response.data;
  };