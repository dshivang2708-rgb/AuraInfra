import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { HelmetProvider } from "react-helmet-async";
import { router } from "./router.jsx";
import { AdminAuthProvider } from "./context/AdminAuthContext.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <AdminAuthProvider>
        <RouterProvider router={router} />
      </AdminAuthProvider>
    </HelmetProvider>
  </React.StrictMode>
);