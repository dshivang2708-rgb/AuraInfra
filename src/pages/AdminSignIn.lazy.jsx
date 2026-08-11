import { createLazyRoute } from "@tanstack/react-router";
import AdminSignIn from "./AdminSignIn.jsx";

export const Route = createLazyRoute("/admin/login")({
  component: AdminSignIn,
});