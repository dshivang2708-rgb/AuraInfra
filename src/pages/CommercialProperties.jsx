import PageNavbar from "../components/PageNavbar.jsx";
import CommercialHero from "../components/commercial/CommercialHero.jsx";
import CategoryTabs from "../components/commercial/CategoryTabs.jsx";
import FilterSidebar from "../components/commercial/FilterSidebar.jsx";
import ResultsGrid from "../components/commercial/ResultsGrid.jsx";
import ConsultationCTA from "../components/commercial/ConsultationCTA.jsx";
import Seo from "../components/Seo.jsx";

export default function CommercialProperties() {
  return (
    <>
      <PageNavbar />
      <main className="pt-14 bg-gray-50">
      <Seo
        title="Commercial Properties in Mohali"
        description="Explore commercial spaces, office towers and retail units in Mohali and Chandigarh tricity with Aura Infra."
        path="/properties/commercial"
      />
              <CommercialHero />
        <CategoryTabs />
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 flex flex-col md:flex-row gap-8">
          <FilterSidebar />
          <ResultsGrid />
        </div>
        <ConsultationCTA />
      </main>
    </>
  );
}