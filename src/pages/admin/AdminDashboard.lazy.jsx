import { createLazyRoute } from "@tanstack/react-router";
import AdminDashboard from "./AdminDashboard.jsx";

export const Route = createLazyRoute("/admin/dashboard")({
  component: AdminDashboard,
});