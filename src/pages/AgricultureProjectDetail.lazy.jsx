import { createLazyRoute } from "@tanstack/react-router";
import AgricultureProjectDetail from "./AgricultureProjectDetail.jsx";

export const Route = createLazyRoute("/properties/agriculture/$slug")({
  component: AgricultureProjectDetail,
});