import { createRootRoute, createRoute, createRouter, Outlet } from "@tanstack/react-router";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import ResidentialProperties from "./pages/ResidentialProperties.jsx";
import ResidentialProjectDetail from "./pages/ResidentialProjectDetail.jsx";
import CommercialProperties from "./pages/CommercialProperties.jsx";
import AgricultureProperties from "./pages/AgricultureProperties.jsx";
import AgricultureProjectDetail from "./pages/AgricultureProjectDetail.jsx";
import PremiumProjects from "./pages/PremiumProjects.jsx";
import Footer from "./components/Footer.jsx";

const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <Footer />
    </>
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: About,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: Contact,
});

const residentialRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/properties/residential",
  component: ResidentialProperties,
});

const residentialDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/properties/residential/$slug",
  component: ResidentialProjectDetail,
});

const commercialRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/properties/commercial",
  component: CommercialProperties,
});

const agricultureRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/properties/agriculture",
  component: AgricultureProperties,
});

const agricultureDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/properties/agriculture/$slug",
  component: AgricultureProjectDetail,
});

const premiumProjectsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/properties/premium-projects",
  component: PremiumProjects,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  aboutRoute,
  contactRoute,
  residentialRoute,
  residentialDetailRoute,
  commercialRoute,
  agricultureRoute,
  agricultureDetailRoute,
  premiumProjectsRoute,
]);

export const router = createRouter({ routeTree });