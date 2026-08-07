import { useEffect, useState } from "react";
import { Link, useParams } from "@tanstack/react-router";
import PageNavbar from "../components/PageNavbar.jsx";
import ProjectHero from "../components/commercial-detail/ProjectHero.jsx";
import TabsNav from "../components/commercial-detail/TabsNav.jsx";
import ProjectOverview from "../components/commercial-detail/ProjectOverview.jsx";
import FloorPlans from "../components/commercial-detail/FloorPlans.jsx";
import Amenities from "../components/commercial-detail/Amenities.jsx";
import WhyThisProject from "../components/commercial-detail/WhyThisProject.jsx";
import PricingSidebar from "../components/commercial-detail/PricingSidebar.jsx";
import { api } from "../lib/api.js";
import { toCommercialDetail } from "../lib/adapters.js";

export default function CommercialProjectDetail() {
  const { slug } = useParams({ strict: false });
  const [property, setProperty] = useState(null);
  const [status, setStatus] = useState("loading");
  const [activeTab, setActiveTab] = useState("Overview");

  useEffect(() => {
    let active = true;
    api
      .getProject("commercial", slug)
      .then((row) => {
        if (active) {
          setProperty(toCommercialDetail(row));
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
            This commercial listing may have been removed or the link is incorrect.
          </p>
          <Link to="/properties/commercial" className="text-[#006D32] font-semibold hover:underline">
            Back to Commercial Properties
          </Link>
        </main>
      </>
    );
  }

  return (
    <>
      <PageNavbar />
      <main className="pt-14 bg-gray-50 text-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <nav className="text-sm text-gray-500 mb-6 flex items-center gap-2">
            <Link className="hover:text-[#006D32]" to="/">
              Home
            </Link>
            <i className="fa-solid fa-chevron-right text-[10px]" />
            <Link className="hover:text-[#006D32]" to="/properties/commercial">
              Commercial Properties
            </Link>
            <i className="fa-solid fa-chevron-right text-[10px]" />
            <span className="text-gray-900 font-medium">{property.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left column */}
            <div className="lg:col-span-2">
              <ProjectHero property={property} />
              <TabsNav activeTab={activeTab} onChange={setActiveTab} />

              {activeTab === "Overview" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ProjectOverview property={property} />
                    <WhyThisProject property={property} />
                  </div>
                  <FloorPlans property={property} />
                  <Amenities />
                </div>
              )}
              {activeTab === "Amenities" && <Amenities />}
              {activeTab === "Floor Plans" && <FloorPlans property={property} />}
              {!["Overview", "Amenities", "Floor Plans"].includes(activeTab) && (
                <div className="bg-white rounded-2xl shadow-sm p-6 text-center text-sm text-gray-500">
                  {activeTab} details coming soon — reach out to us for the full breakdown.
                </div>
              )}
            </div>

            {/* Right column */}
            <PricingSidebar property={property} />
          </div>
        </div>
      </main>
    </>
  );
}