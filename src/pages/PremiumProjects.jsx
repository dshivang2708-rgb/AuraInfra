import PageNavbar from "../components/PageNavbar.jsx";
import PremiumProjectsHero from "../components/premium-projects/PremiumProjectsHero.jsx";
import ProjectGrid from "../components/premium-projects/ProjectGrid.jsx";
import TrustBanner from "../components/premium-projects/TrustBanner.jsx";
import Seo from "../components/Seo.jsx";

export default function PremiumProjects() {
  return (
    <>
      <PageNavbar />
      <main className="pt-14 bg-slate-50">
      <Seo
        title="Premium Projects"
        description="Discover Aura Infra's curated premium real estate projects, offering elevated design and prime locations across Mohali and North India."
        path="/properties/premium-projects"
      />
              <PremiumProjectsHero />
        <div className="container mx-auto max-w-7xl px-4 mt-24 mb-20">
          <ProjectGrid />
        </div>
        <TrustBanner />
      </main>
    </>
  );
}