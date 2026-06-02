import axios from "axios";

const api = axios.create({

  baseURL:
    import.meta.env
      .VITE_API_URL,

  withCredentials: true,

  timeout: 15000,
});

// ======================
// REQUEST INTERCEPTOR
// ======================

api.interceptors.request.use(

  (config) => {

    const token =
      localStorage.getItem(
        "token"
      );

    // ADD AUTH TOKEN

    if (token) {

      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },

  (error) => {

    return Promise.reject(
      error
    );
  }
);

// ======================
// RESPONSE INTERCEPTOR
// ======================

api.interceptors.response.use(

  (response) => {

    return response;
  },

  async (error) => {

    // ======================
    // NETWORK ERROR
    // ======================

    if (!error.response) {

      console.error(
        "Network Error"
      );

      return Promise.reject(
        error
      );
    }

    const status =
      error.response.status;

    // ======================
    // UNAUTHORIZED
    // ======================

    if (status === 401) {

      localStorage.removeItem(
        "token"
      );

      // ADMIN ROUTE

      if (
        window.location.pathname.startsWith(
          "/admin"
        )
      ) {

        window.location.href =
          "/admin/login";
      }

      // USER ROUTE

      else {

        window.location.href =
          "/login";
      }
    }

    // ======================
    // FORBIDDEN
    // ======================

    if (status === 403) {

      console.error(
        "Access Denied"
      );
    }

    // ======================
    // SERVER ERROR
    // ======================

    if (status === 500) {

      console.error(
        "Internal Server Error"
      );
    }

    // ======================
    // TOO MANY REQUESTS
    // ======================

    if (status === 429) {

      console.error(
        "Too Many Requests"
      );
    }

    return Promise.reject(
      error
    );
  }
);

export default api;