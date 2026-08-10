import PageNavbar from "../components/PageNavbar.jsx";
import UpcomingHero from "../components/upcoming/UpcomingHero.jsx";
import FilterSidebar from "../components/upcoming/FilterSidebar.jsx";
import ResultsGrid from "../components/upcoming/ResultsGrid.jsx";
import Seo from "../components/Seo.jsx";

export default function UpcomingProjects() {
  return (
    <>
      <PageNavbar />
      <main className="pt-14 bg-gray-50">
      <Seo
        title="Upcoming Projects"
        description="Get an early look at Aura Infra's upcoming residential, commercial and agricultural projects across Mohali and North India."
        path="/properties/upcoming"
      />
              <UpcomingHero />
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 flex flex-col md:flex-row gap-8">
          <FilterSidebar />
          <ResultsGrid />
        </div>
      </main>
    </>
  );
}