import { createLazyRoute } from "@tanstack/react-router";
import AdminSignUp from "./AdminSignUp.jsx";

export const Route = createLazyRoute("/admin/signup")({
  component: AdminSignUp,
});