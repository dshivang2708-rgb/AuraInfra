import { createLazyRoute } from "@tanstack/react-router";
import Contact from "./Contact.jsx";

export const Route = createLazyRoute("/contact")({
  component: Contact,
});