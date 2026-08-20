import { createRootRoute, createRoute, createRouter, Outlet } from "@tanstack/react-router";
import Home from "./pages/Home.jsx";
import Footer from "./components/Footer.jsx";
import ScrollToTopOnSameLink from "./components/ScrollToTopOnSameLink.jsx";

const rootRoute = createRootRoute({
  component: () => (
    <>
      <ScrollToTopOnSameLink />
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
}).lazy(() => import("./pages/About.lazy.jsx").then((d) => d.Route));

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
}).lazy(() => import("./pages/Contact.lazy.jsx").then((d) => d.Route));

const residentialRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/properties/residential",
}).lazy(() => import("./pages/ResidentialProperties.lazy.jsx").then((d) => d.Route));

const residentialDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/properties/residential/$slug",
}).lazy(() => import("./pages/ResidentialProjectDetail.lazy.jsx").then((d) => d.Route));

const commercialRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/properties/commercial",
}).lazy(() => import("./pages/CommercialProperties.lazy.jsx").then((d) => d.Route));

const commercialDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/properties/commercial/$slug",
}).lazy(() => import("./pages/CommercialProjectDetail.lazy.jsx").then((d) => d.Route));

const agricultureRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/properties/agriculture",
}).lazy(() => import("./pages/AgricultureProperties.lazy.jsx").then((d) => d.Route));

const agricultureDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/properties/agriculture/$slug",
}).lazy(() => import("./pages/AgricultureProjectDetail.lazy.jsx").then((d) => d.Route));

const premiumProjectsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/properties/premium-projects",
}).lazy(() => import("./pages/PremiumProjects.lazy.jsx").then((d) => d.Route));

const premiumProjectDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/properties/premium-projects/$slug",
}).lazy(() => import("./pages/PremiumProjectDetail.lazy.jsx").then((d) => d.Route));

const upcomingProjectsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/properties/upcoming",
}).lazy(() => import("./pages/UpcomingProjects.lazy.jsx").then((d) => d.Route));

const termsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/terms-and-conditions",
}).lazy(() => import("./pages/TermsConditions.lazy.jsx").then((d) => d.Route));

const privacyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/privacy-policy",
}).lazy(() => import("./pages/PrivacyPolicy.lazy.jsx").then((d) => d.Route));

const adminSignInRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/login",
}).lazy(() => import("./pages/admin/AdminSignIn.lazy.jsx").then((d) => d.Route));

const adminSignUpRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/signup",
}).lazy(() => import("./pages/admin/AdminSignUp.lazy.jsx").then((d) => d.Route));

const adminDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/dashboard",
}).lazy(() => import("./pages/admin/AdminDashboard.lazy.jsx").then((d) => d.Route));

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
  termsRoute,
  privacyRoute,
  adminSignInRoute,
  adminSignUpRoute,
  adminDashboardRoute,
]);

export const router = createRouter({ routeTree, scrollRestoration: true });