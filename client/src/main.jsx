import React from "react";

import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";

import App from "./App";

import "./index.css";

import { Toaster } from "react-hot-toast";

import { AuthProvider } from "./context/AuthContext";

import { HelmetProvider } from "react-helmet-async";

// ======================
// ROOT RENDER
// ======================

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* ROUTER */}

    <BrowserRouter>
      {/* SEO Provider */}

      <HelmetProvider>
        {/* Authentication Provider */}

        <AuthProvider>
          {/* Global Toast Notifications */}

          <Toaster
            position="top-right"
            reverseOrder={false}
            toastOptions={{
              duration: 3000,

              style: {
                borderRadius: "12px",

                padding: "14px",

                fontSize: "14px",
              },

              success: {
                duration: 3000,
              },

              error: {
                duration: 4000,
              },
            }}
          />

          {/* Main App */}

          <App />
        </AuthProvider>
      </HelmetProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
