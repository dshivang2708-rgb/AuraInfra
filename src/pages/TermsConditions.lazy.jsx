import { createLazyRoute } from "@tanstack/react-router";
import TermsConditions from "./TermsConditions.jsx";

export const Route = createLazyRoute("/terms-and-conditions")({
  component: TermsConditions,
});