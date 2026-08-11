import { createLazyRoute } from "@tanstack/react-router";
import ResidentialProperties from "./ResidentialProperties.jsx";

export const Route = createLazyRoute("/properties/residential")({
  component: ResidentialProperties,
});