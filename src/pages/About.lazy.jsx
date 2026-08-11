import { createLazyRoute } from "@tanstack/react-router";
import About from "./About.jsx";

export const Route = createLazyRoute("/about")({
  component: About,
});