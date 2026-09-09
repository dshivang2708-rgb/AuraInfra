import { createLazyRoute } from "@tanstack/react-router";
import AdminDashboard from "./AdminDashboard.jsx";
import { AdminAuthProvider } from "../../context/AdminAuthContext.jsx";

// AdminAuthProvider (and therefore @supabase/supabase-js) is mounted
// right here instead of globally in main.jsx, so it — and the whole
// Supabase client library — only gets fetched when someone actually
// navigates to /admin/dashboard, as part of this already-lazy-loaded
// route chunk. Public pages never download it.
export const Route = createLazyRoute("/admin/dashboard")({
  component: () => (
    <AdminAuthProvider>
      <AdminDashboard />
    </AdminAuthProvider>
  ),
});