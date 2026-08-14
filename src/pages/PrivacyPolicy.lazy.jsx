import { createLazyRoute } from "@tanstack/react-router";
import PrivacyPolicy from "./PrivacyPolicy.jsx";

export const Route = createLazyRoute("/privacy-policy")({
  component: PrivacyPolicy,
});