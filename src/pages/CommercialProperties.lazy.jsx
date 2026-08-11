import { createLazyRoute } from "@tanstack/react-router";
import CommercialProperties from "./CommercialProperties.jsx";

export const Route = createLazyRoute("/properties/commercial")({
  component: CommercialProperties,
});