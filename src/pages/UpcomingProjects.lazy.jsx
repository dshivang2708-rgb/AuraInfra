import { createLazyRoute } from "@tanstack/react-router";
import UpcomingProjects from "./UpcomingProjects.jsx";

export const Route = createLazyRoute("/properties/upcoming")({
  component: UpcomingProjects,
});