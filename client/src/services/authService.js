import api from "../api/axios";

// ======================
// LOGIN
// ======================

export const loginUser = async (data) => {
  try {
    const response = await api.post("/auth/login", data);

    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Login failed",
      }
    );
  }
};

// ======================
// REGISTER
// ======================

export const registerUser = async (data) => {
  try {
    const response = await api.post("/auth/register", data);

    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Registration failed",
      }
    );
  }
};

// ======================
// GET PROFILE
// ======================

export const getProfile = async () => {
  try {
    const response = await api.get("/auth/profile");

    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Failed to fetch profile",
      }
    );
  }
};

// ======================
// LOGOUT
// ======================

export const logoutUser = async () => {
  try {
    const response = await api.post("/auth/logout");

    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Logout failed",
      }
    );
  }
};


// ======================
// RESET PASSWORD
// ======================

export const resetPassword =
  async (data) => {
    try {
      const response =
        await api.put(
          "/auth/reset-password",
          data
        );

      return response.data;
    } catch (error) {
      throw (
        error.response?.data || {
          message:
            "Password reset failed",
        }
      );
    }
  };
