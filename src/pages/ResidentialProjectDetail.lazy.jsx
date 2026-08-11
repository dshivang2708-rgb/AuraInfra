import { createLazyRoute } from "@tanstack/react-router";
import ResidentialProjectDetail from "./ResidentialProjectDetail.jsx";

export const Route = createLazyRoute("/properties/residential/$slug")({
  component: ResidentialProjectDetail,
});