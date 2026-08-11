import { createLazyRoute } from "@tanstack/react-router";
import PremiumProjects from "./PremiumProjects.jsx";

export const Route = createLazyRoute("/properties/premium-projects")({
  component: PremiumProjects,
});