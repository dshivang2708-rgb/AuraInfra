import PageNavbar from "../components/PageNavbar.jsx";
import AgricultureHero from "../components/agriculture/AgricultureHero.jsx";
import CategoryTabs from "../components/agriculture/CategoryTabs.jsx";
import FilterSidebar from "../components/agriculture/FilterSidebar.jsx";
import ResultsGrid from "../components/agriculture/ResultsGrid.jsx";
import ExpertCTA from "../components/agriculture/ExpertCTA.jsx";
import BackToTop from "../components/about/BackToTop.jsx";
import Seo from "../components/Seo.jsx";

export default function AgricultureProperties() {
  return (
    <>
      <PageNavbar />
      <main className="pt-14 bg-gray-50">
      <Seo
        title="Agricultural Land in Mohali & Punjab"
        description="Find agricultural land, farmhouse plots and fertile land for sale in Mohali, Kharar and across Punjab with Aura Infra."
        path="/properties/agriculture"
      />
              <AgricultureHero />
        <CategoryTabs />
        <div className="max-w-7xl mx-auto px-4 md:px-12 pt-10 pb-20">
          <div className="flex flex-col lg:flex-row gap-8">
            <FilterSidebar />
            <ResultsGrid />
          </div>
        </div>
        <ExpertCTA />
        <BackToTop />
      </main>
    </>
  );
}