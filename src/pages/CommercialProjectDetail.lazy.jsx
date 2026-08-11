import { createLazyRoute } from "@tanstack/react-router";
import CommercialProjectDetail from "./CommercialProjectDetail.jsx";

export const Route = createLazyRoute("/properties/commercial/$slug")({
  component: CommercialProjectDetail,
});