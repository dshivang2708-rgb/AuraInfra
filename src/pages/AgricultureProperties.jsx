import PageNavbar from "../components/PageNavbar.jsx";
import AgricultureHero from "../components/agriculture/AgricultureHero.jsx";
import FilterSidebar from "../components/agriculture/FilterSidebar.jsx";
import ResultsGrid from "../components/agriculture/ResultsGrid.jsx";
import ExpertCTA from "../components/agriculture/ExpertCTA.jsx";
import BackToTop from "../components/about/BackToTop.jsx";

export default function AgricultureProperties() {
  return (
    <>
      <PageNavbar />
      <main className="pt-14 bg-gray-50">
        <AgricultureHero />
        <div className="max-w-7xl mx-auto px-4 md:px-12 pt-24 pb-20">
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