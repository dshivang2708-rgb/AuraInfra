import PageNavbar from "../components/PageNavbar.jsx";
import AboutHero from "../components/about/AboutHero.jsx";
import WhoWeAre from "../components/about/WhoWeAre.jsx";
import StatsBar from "../components/about/StatsBar.jsx";
import OurStory from "../components/about/OurStory.jsx";
import OurValues from "../components/about/OurValues.jsx";
import Leadership from "../components/about/Leadership.jsx";
import BackToTop from "../components/about/BackToTop.jsx";

export default function About() {
  return (
    <>
      <PageNavbar />
      <main>
        <AboutHero />
        <WhoWeAre />
        <StatsBar />
        <OurStory />
        <OurValues />
        <Leadership />
        <BackToTop />
      </main>
    </>
  );
}