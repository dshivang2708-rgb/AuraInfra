import PageNavbar from "../components/PageNavbar.jsx";
import ResidentialHero from "../components/residential/ResidentialHero.jsx";
import CategoryTabs from "../components/residential/CategoryTabs.jsx";
import SidebarFilters from "../components/residential/SidebarFilters.jsx";
import PropertyGrid from "../components/residential/PropertyGrid.jsx";
import TrustBanner from "../components/residential/TrustBanner.jsx";
import Seo from "../components/Seo.jsx";

export default function ResidentialProperties() {
  return (
    <>
      <PageNavbar />
      <main className="pt-14 bg-gray-50">
      <Seo
        title="Residential Properties in Mohali"
        description="Browse premium residential properties, flats and villas in Mohali, Sector 82, Aerocity and more with Aura Infra."
        path="/properties/residential"
      />
              <ResidentialHero />
        <CategoryTabs />
        <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
          <SidebarFilters />
          <PropertyGrid />
        </div>
        <TrustBanner />
      </main>
    </>
  );
}