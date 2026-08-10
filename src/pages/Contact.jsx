import PageNavbar from "../components/PageNavbar.jsx";
import ContactHero from "../components/contact/ContactHero.jsx";
import ConnectSection from "../components/contact/ConnectSection.jsx";
import LocationSection from "../components/contact/LocationSection.jsx";
import TrustBar from "../components/contact/TrustBar.jsx";
import BackToTop from "../components/about/BackToTop.jsx";
import Seo from "../components/Seo.jsx";

export default function Contact() {
  return (
    <>
      <PageNavbar />
      <main className="pt-14">
      <Seo
        title="Contact Us"
        description="Get in touch with Aura Infra. Visit us at SCO 16, Sector 82-A, JLPL, SAS Nagar, Mohali, Punjab, or reach out online to discuss your next property."
        path="/contact"
      />
              <ContactHero />
        <ConnectSection />
        <LocationSection />
        <TrustBar />
        <BackToTop />
      </main>
    </>
  );
}