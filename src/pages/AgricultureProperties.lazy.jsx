import { createLazyRoute } from "@tanstack/react-router";
import AgricultureProperties from "./AgricultureProperties.jsx";

export const Route = createLazyRoute("/properties/agriculture")({
  component: AgricultureProperties,
});