import api from "../api/axios";

// ======================
// GET ALL APPLICATIONS
// ======================

export const getApplications =
  async () => {

    try {

      const res =
        await api.get(
          "/applications"
        );

      return res.data;

    } catch (error) {

      console.error(
        "Get Applications Error:",
        error
      );

      throw error;
    }
  };

// ======================
// GET SINGLE APPLICATION
// ======================

export const getApplication =
  async (id) => {

    try {

      const res =
        await api.get(
          `/applications/${id}`
        );

      return res.data;

    } catch (error) {

      console.error(
        "Get Application Error:",
        error
      );

      throw error;
    }
  };

// ======================
// CREATE APPLICATION
// ======================

export const createApplication =
  async (formData) => {

    try {

      const res =
        await api.post(

          "/applications",

          formData,

          {

            headers: {

              "Content-Type":

                "multipart/form-data",
            },
          }
        );

      return res.data;

    } catch (error) {

      console.log(error);

      throw error;
    }
  };
// ======================
// UPDATE APPLICATION
// ======================

export const updateApplication =
  async (id, data) => {

    try {

      const res =
        await api.put(
          `/applications/${id}`,
          data
        );

      return res.data;

    } catch (error) {

      console.error(
        "Update Application Error:",
        error
      );

      throw error;
    }
  };

// ======================
// UPDATE STATUS
// ======================

export const updateApplicationStatus =
  async (id, status) => {

    try {

      const res =
        await api.patch(
          `/applications/${id}/status`,
          { status }
        );

      return res.data;

    } catch (error) {

      console.error(
        "Update Status Error:",
        error
      );

      throw error;
    }
  };

// ======================
// DELETE APPLICATION
// ======================

export const deleteApplication =
  async (id) => {

    try {

      const res =
        await api.delete(
          `/applications/${id}`
        );

      return res.data;

    } catch (error) {

      console.error(
        "Delete Application Error:",
        error
      );

      throw error;
    }
  };