import PageNavbar from "../components/PageNavbar.jsx";
import PremiumProjectsHero from "../components/premium-projects/PremiumProjectsHero.jsx";
import ProjectGrid from "../components/premium-projects/ProjectGrid.jsx";
import TrustBanner from "../components/premium-projects/TrustBanner.jsx";

export default function PremiumProjects() {
  return (
    <>
      <PageNavbar />
      <main className="pt-14 bg-slate-50">
        <PremiumProjectsHero />
        <div className="container mx-auto max-w-7xl px-4 mt-24 mb-20">
          <ProjectGrid />
        </div>
        <TrustBanner />
      </main>
    </>
  );
}