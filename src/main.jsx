import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { HelmetProvider } from "react-helmet-async";
import { router } from "./router.jsx";
import "./index.css";

// AdminAuthProvider (and the @supabase/supabase-js client it pulls in)
// used to be mounted here, wrapping the entire app. That forced every
// visitor — including anonymous homepage traffic — to download the
// whole Supabase client library up front, even though it's only ever
// used on /admin/dashboard. It's now mounted locally in
// AdminDashboard.lazy.jsx instead, so it loads only when someone
// actually navigates there. See that file for details.

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  </React.StrictMode>
);