import { createLazyRoute } from "@tanstack/react-router";
import PremiumProjectDetail from "./PremiumProjectDetail.jsx";

export const Route = createLazyRoute("/properties/premium-projects/$slug")({
  component: PremiumProjectDetail,
});