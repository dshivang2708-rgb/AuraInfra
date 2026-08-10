import { useEffect, useState } from "react";
import { Link, useParams } from "@tanstack/react-router";
import PageNavbar from "../components/PageNavbar.jsx";
import ProjectHero from "../components/residential-detail/ProjectHero.jsx";
import TabsNav from "../components/residential-detail/TabsNav.jsx";
import ProjectOverview from "../components/residential-detail/ProjectOverview.jsx";
import FloorPlans from "../components/residential-detail/FloorPlans.jsx";
import Amenities from "../components/residential-detail/Amenities.jsx";
import LocationSection from "../components/residential-detail/LocationSection.jsx";
import GallerySection from "../components/residential-detail/GallerySection.jsx";
import DeveloperSection from "../components/residential-detail/DeveloperSection.jsx";
import FAQsSection from "../components/residential-detail/FAQsSection.jsx";
import PricingSidebar from "../components/residential-detail/PricingSidebar.jsx";
import { api } from "../lib/api.js";
import { toResidentialDetail } from "../lib/adapters.js";
import Seo from "../components/Seo.jsx";

export default function ResidentialProjectDetail() {
  const { slug } = useParams({ strict: false });
  const [property, setProperty] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | found | not-found
  const [activeTab, setActiveTab] = useState("Overview");

  useEffect(() => {
    let active = true;
    api
      .getProject("residential", slug)
      .then((row) => {
        if (active) {
          setProperty(toResidentialDetail(row));
          setStatus("found");
        }
      })
      .catch(() => active && setStatus("not-found"));
    return () => {
      active = false;
    };
  }, [slug]);

  if (status === "loading") {
    return (
      <>
        <PageNavbar />
        <main className="pt-14 min-h-[60vh] flex items-center justify-center">
          <p className="text-sm text-gray-500">Loading...</p>
        </main>
      </>
    );
  }

  if (status === "not-found") {
    return (
      <>
        <PageNavbar />
        <main className="pt-14 min-h-[60vh] flex flex-col items-center justify-center gap-4 text-center px-4">
          <h1 className="text-2xl font-bold text-gray-900">Property not found</h1>
          <p className="text-sm text-gray-500">
            This residential listing may have been removed or the link is incorrect.
          </p>
          <Link to="/properties/residential" className="text-[#1a6b32] font-semibold hover:underline">
            Back to Residential Properties
          </Link>
        </main>
      </>
    );
  }

  return (
    <>
      <PageNavbar />
      <main className="pt-14 bg-slate-50 text-slate-800" style={{ fontFamily: "Inter, sans-serif" }}>
        <Seo
          title={property.name}
          description={`${property.name} - residential property in ${property.location || "Mohali"}. ${property.description ? property.description.slice(0, 140) : "View details, pricing and amenities with Aura Infra."}`}
          path={`/properties/residential/${slug}`}
        />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <nav className="text-sm text-gray-500 mb-6 flex items-center gap-2">
            <Link className="hover:text-[#1a6b32]" to="/">
              Home
            </Link>
            <i className="fa-solid fa-chevron-right text-[10px]" />
            <Link className="hover:text-[#1a6b32]" to="/properties/residential">
              Projects
            </Link>
            <i className="fa-solid fa-chevron-right text-[10px]" />
            <span className="text-gray-900 font-medium">{property.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column */}
            <div className="lg:col-span-2 space-y-8">
              <ProjectHero property={property} />
              <TabsNav activeTab={activeTab} onChange={setActiveTab} />

              {activeTab === "Overview" && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <ProjectOverview property={property} />
                    <FloorPlans property={property} />
                  </div>
                  <Amenities />
                </>
              )}
              {activeTab === "Amenities" && <Amenities />}
              {activeTab === "Floor Plans" && <FloorPlans property={property} />}
              {activeTab === "Location" && <LocationSection property={property} />}
              {activeTab === "Gallery" && <GallerySection property={property} />}
              {activeTab === "Developer" && <DeveloperSection property={property} />}
              {activeTab === "FAQs" && <FAQsSection property={property} />}
            </div>

            {/* Right column */}
            <PricingSidebar property={property} />
          </div>
        </div>
      </main>
    </>
  );
}