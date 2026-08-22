import HeroSection from "../components/HeroSection.jsx";
import CategorySection from "../components/CategorySection.jsx";
import FeaturedProperties from "../components/FeaturedProperties.jsx";
import ServiceHighlights from "../components/ServiceHighlights.jsx";
import WhyChooseUs from "../components/WhyChooseUs.jsx";
import CitiesAndCollections from "../components/CitiesAndCollections.jsx";
import Seo from "../components/Seo.jsx";

// Homepage is assembled here, section by section.
// Add each new component below, in the order it should appear on the page.
export default function Home() {
  return (
    <main>
      <Seo
        description="Aura Infra is a Mohali-based real estate company offering premium residential, commercial and agricultural properties across Mohali, Chandigarh and North India. Building spaces, creating futures."
        path="/"
      />
      <HeroSection />
      <CategorySection />
      <FeaturedProperties />
      <ServiceHighlights />
      <WhyChooseUs />
      <CitiesAndCollections />
      {/* Next section goes here */}
    </main>
  );
}