import api
from "../api/axios";

// ======================
// GET USERS
// ======================

export const getUsers =
  async () => {

    try {

      const res =
        await api.get(
          "/users"
        );

      return res.data;

    } catch (error) {

      console.log(error);

      throw error;
    }
  };