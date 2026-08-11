import { createRootRoute, createRoute, createRouter, Outlet } from "@tanstack/react-router";
import Home from "./pages/Home.jsx";
import Footer from "./components/Footer.jsx";

const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <Footer />
    </>
  ),
});

// Home loads eagerly (it's the initial paint for most visitors).
// Every other route is code-split into its own chunk and only
// downloaded when the visitor actually navigates there.
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
}).lazy(() => import("./pages/About.lazy.jsx"));

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
}).lazy(() => import("./pages/Contact.lazy.jsx"));

const residentialRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/properties/residential",
}).lazy(() => import("./pages/ResidentialProperties.lazy.jsx"));

const residentialDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/properties/residential/$slug",
}).lazy(() => import("./pages/ResidentialProjectDetail.lazy.jsx"));

const commercialRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/properties/commercial",
}).lazy(() => import("./pages/CommercialProperties.lazy.jsx"));

const commercialDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/properties/commercial/$slug",
}).lazy(() => import("./pages/CommercialProjectDetail.lazy.jsx"));

const agricultureRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/properties/agriculture",
}).lazy(() => import("./pages/AgricultureProperties.lazy.jsx"));

const agricultureDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/properties/agriculture/$slug",
}).lazy(() => import("./pages/AgricultureProjectDetail.lazy.jsx"));

const premiumProjectsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/properties/premium-projects",
}).lazy(() => import("./pages/PremiumProjects.lazy.jsx"));

const premiumProjectDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/properties/premium-projects/$slug",
}).lazy(() => import("./pages/PremiumProjectDetail.lazy.jsx"));

const upcomingProjectsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/properties/upcoming",
}).lazy(() => import("./pages/UpcomingProjects.lazy.jsx"));

const adminSignInRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/login",
}).lazy(() => import("./pages/admin/AdminSignIn.lazy.jsx"));

const adminSignUpRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/signup",
}).lazy(() => import("./pages/admin/AdminSignUp.lazy.jsx"));

const adminDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/dashboard",
}).lazy(() => import("./pages/admin/AdminDashboard.lazy.jsx"));

const routeTree = rootRoute.addChildren([
  homeRoute,
  aboutRoute,
  contactRoute,
  residentialRoute,
  residentialDetailRoute,
  commercialRoute,
  commercialDetailRoute,
  agricultureRoute,
  agricultureDetailRoute,
  premiumProjectsRoute,
  premiumProjectDetailRoute,
  upcomingProjectsRoute,
  adminSignInRoute,
  adminSignUpRoute,
  adminDashboardRoute,
]);

export const router = createRouter({ routeTree });