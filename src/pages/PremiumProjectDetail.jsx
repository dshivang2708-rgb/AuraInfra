import { useEffect, useState } from "react";
import { Link, useParams } from "@tanstack/react-router";
import PageNavbar from "../components/PageNavbar.jsx";
import ProjectHero from "../components/premium-detail/ProjectHero.jsx";
import TabsNav from "../components/premium-detail/TabsNav.jsx";
import ProjectOverview from "../components/premium-detail/ProjectOverview.jsx";
import WhyThisProject from "../components/premium-detail/WhyThisProject.jsx";
import FloorPlans from "../components/premium-detail/FloorPlans.jsx";
import Amenities from "../components/premium-detail/Amenities.jsx";
import LocationSection from "../components/premium-detail/LocationSection.jsx";
import GallerySection from "../components/premium-detail/GallerySection.jsx";
import DeveloperSection from "../components/premium-detail/DeveloperSection.jsx";
import FAQsSection from "../components/premium-detail/FAQsSection.jsx";
import PricingSidebar from "../components/premium-detail/PricingSidebar.jsx";
import { api } from "../lib/api.js";
import { toPremiumDetail } from "../lib/adapters.js";
import Seo from "../components/Seo.jsx";

export default function PremiumProjectDetail() {
  const { slug } = useParams({ strict: false });
  const [project, setProject] = useState(null);
  const [loadStatus, setLoadStatus] = useState("loading");
  const [activeTab, setActiveTab] = useState("Overview");

  useEffect(() => {
    let active = true;
    api
      .getProject("premium", slug)
      .then((row) => {
        if (active) {
          setProject(toPremiumDetail(row));
          setLoadStatus("found");
        }
      })
      .catch(() => active && setLoadStatus("not-found"));
    return () => {
      active = false;
    };
  }, [slug]);

  if (loadStatus === "loading") {
    return (
      <>
        <PageNavbar />
        <main className="pt-14 min-h-[60vh] flex items-center justify-center">
          <p className="text-sm text-gray-500">Loading...</p>
        </main>
      </>
    );
  }

  if (loadStatus === "not-found") {
    return (
      <>
        <PageNavbar />
        <main className="pt-14 min-h-[60vh] flex flex-col items-center justify-center gap-4 text-center px-4">
          <h1 className="text-2xl font-bold text-gray-900">Project not found</h1>
          <Link to="/properties/premium-projects" className="text-[#1a6b32] font-semibold hover:underline">
            Back to Premium Projects
          </Link>
        </main>
      </>
    );
  }

  return (
    <>
      <PageNavbar />
      <main className="pt-14 bg-slate-50" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        <Seo
          title={project.name}
          description={`${project.name} - premium project in ${project.location || "Mohali"}. ${project.description ? project.description.slice(0, 140) : "View details, pricing and amenities with Aura Infra."}`}
          path={`/properties/premium-projects/${slug}`}
        />
                <div className="max-w-7xl mx-auto px-4 py-6">
          <nav className="text-sm text-gray-500 mb-6 flex items-center gap-2">
            <Link className="hover:text-[#1a6b32]" to="/">
              Home
            </Link>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <Link className="hover:text-[#1a6b32]" to="/properties/premium-projects">
              Premium Projects
            </Link>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <span className="text-gray-900 font-medium">{project.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <ProjectHero property={project} />
              <TabsNav activeTab={activeTab} onChange={setActiveTab} />

              {activeTab === "Overview" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ProjectOverview property={project} />
                    {project.whyInvest.length > 0 && <WhyThisProject property={project} />}
                  </div>
                  <FloorPlans property={project} />
                  <Amenities property={project} />
                </div>
              )}
              {activeTab === "Amenities" && <Amenities property={project} />}
              {activeTab === "Floor Plans" && <FloorPlans property={project} />}
              {activeTab === "Location" && <LocationSection property={project} />}
              {activeTab === "Gallery" && <GallerySection property={project} />}
              {activeTab === "Developer" && <DeveloperSection property={project} />}
              {activeTab === "FAQs" && <FAQsSection property={project} />}
            </div>

            {/* Sidebar */}
            <PricingSidebar property={project} />
          </div>
        </div>
      </main>
    </>
  );
}