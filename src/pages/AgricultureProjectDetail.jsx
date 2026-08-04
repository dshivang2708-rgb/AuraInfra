import { Link, useParams } from "@tanstack/react-router";
import PageNavbar from "../components/PageNavbar.jsx";
import DetailHero from "../components/agriculture-detail/DetailHero.jsx";
import DetailTabs from "../components/agriculture-detail/DetailTabs.jsx";
import LocationAndInvest from "../components/agriculture-detail/LocationAndInvest.jsx";
import PricingSidebar from "../components/agriculture-detail/PricingSidebar.jsx";
import { getAgricultureProperty } from "../data/agricultureProperties.js";

export default function AgricultureProjectDetail() {
  const { slug } = useParams({ strict: false });
  const property = getAgricultureProperty(slug);

  if (!property) {
    return (
      <>
        <PageNavbar />
        <main className="pt-14 min-h-[60vh] flex flex-col items-center justify-center gap-4 text-center px-4">
          <h1 className="text-2xl font-bold text-[#071837]">Property not found</h1>
          <p className="text-sm text-[#45464e]">This agriculture listing may have been removed or the link is incorrect.</p>
          <Link to="/properties/agriculture" className="text-[#1a6b32] font-semibold hover:underline">
            Back to Agriculture Properties
          </Link>
        </main>
      </>
    );
  }

  return (
    <>
      <PageNavbar />
      <main className="pt-14 bg-[#f9f9ff]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-6">
          <nav aria-label="Breadcrumb" className="flex text-sm text-[#45464e] mb-6">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li>
                <Link className="hover:text-[#1a6b32] transition-colors" to="/">
                  Home
                </Link>
              </li>
              <li className="flex items-center">
                <span className="material-symbols-outlined text-sm mx-1">chevron_right</span>
                <Link className="hover:text-[#1a6b32] transition-colors" to="/properties/agriculture">
                  Agriculture Properties
                </Link>
              </li>
              <li className="flex items-center">
                <span className="material-symbols-outlined text-sm mx-1">chevron_right</span>
                <span className="text-[#151c27] font-semibold">{property.name}</span>
              </li>
            </ol>
          </nav>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1 w-full lg:w-2/3 xl:w-3/4">
              <DetailHero property={property} />
              <DetailTabs property={property} />
              <LocationAndInvest property={property} />
            </div>
            <PricingSidebar property={property} />
          </div>
        </div>
      </main>
    </>
  );
}