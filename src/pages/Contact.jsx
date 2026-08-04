import PageNavbar from "../components/PageNavbar.jsx";
import ContactHero from "../components/contact/ContactHero.jsx";
import ConnectSection from "../components/contact/ConnectSection.jsx";
import LocationSection from "../components/contact/LocationSection.jsx";
import TrustBar from "../components/contact/TrustBar.jsx";
import BackToTop from "../components/about/BackToTop.jsx";

export default function Contact() {
  return (
    <>
      <PageNavbar />
      <main className="pt-14">
        <ContactHero />
        <ConnectSection />
        <LocationSection />
        <TrustBar />
        <BackToTop />
      </main>
    </>
  );
}