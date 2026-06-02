import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const AuthContext =
  createContext();

// ======================
// PROVIDER
// ======================

export const AuthProvider = ({
  children,
}) => {

  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [
    isAuthenticated,
    setIsAuthenticated,
  ] = useState(false);

  // ======================
  // RESTORE USER
  // ======================

  useEffect(() => {

    try {

      const storedUser =
        localStorage.getItem(
          "user"
        );

      const token =
        localStorage.getItem(
          "token"
        );

      if (
        storedUser &&
        token
      ) {

        const parsedUser =
          JSON.parse(
            storedUser
          );

        setUser(parsedUser);

        setIsAuthenticated(
          true
        );
      }

    } catch (error) {

      console.error(
        "Auth Restore Error:",
        error
      );

      localStorage.removeItem(
        "user"
      );

      localStorage.removeItem(
        "token"
      );
    }

    setLoading(false);

  }, []);

  // ======================
  // LOGIN
  // ======================

  const login = (
    userData,
    token
  ) => {

    localStorage.setItem(
      "token",
      token
    );

    localStorage.setItem(
      "user",
      JSON.stringify(
        userData
      )
    );

    setUser(userData);

    setIsAuthenticated(
      true
    );
  };

  // ======================
  // LOGOUT
  // ======================

  const logout = () => {

    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    setUser(null);

    setIsAuthenticated(
      false
    );

    // OPTIONAL REDIRECT

    window.location.href =
      "/login";
  };

  // ======================
  // HELPERS
  // ======================

  const getToken = () => {

    return localStorage.getItem(
      "token"
    );
  };

  // ADMIN CHECK

  const isAdmin =
    user?.role === "admin";

  // ======================
  // CONTEXT VALUE
  // ======================

  const value = useMemo(
    () => ({

      user,

      loading,

      setLoading,

      login,

      logout,

      getToken,

      isAuthenticated,

      isAdmin,

    }),

    [
      user,
      loading,
      isAuthenticated,
      isAdmin,
    ]
  );

  return (
    <AuthContext.Provider
      value={value}
    >
      {children}
    </AuthContext.Provider>
  );
};

// ======================
// CUSTOM HOOK
// ======================

export const useAuth = () => {

  return useContext(
    AuthContext
  );
};