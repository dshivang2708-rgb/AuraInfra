import { useState } from "react";
import { MapPin, Square, Heart, LayoutGrid, List, ChevronLeft, ChevronRight } from "lucide-react";

const BADGE_STYLES = {
  Premium: "bg-[#1a6b32]",
  Featured: "bg-blue-600",
  New: "bg-gray-800",
};

const PROPERTIES = [
  {
    key: "corporate-tower",
    name: "Corporate Tower",
    type: "Office Space",
    badge: "Premium",
    location: "Sector 82, Mohali",
    area: "4,500 sq ft",
    price: "₹ 2.85 Cr",
    priceNote: "₹ 6,333 / sq ft",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDdNkYp_Kshq1tO4n0SQRVYarZE9O6Iy5aKYRQ7JVKcN0aViblIBFpmEZNZgcB4cXLy2BrAkEvINn1zS2lhfF3MV-sgNJmNJscQzt4R9I49cA8QZv2HkOcQf217y7JlSLTJZCe8qqzHVMYixruvSNG4csgXJ0eq4UQueUkeSXVGQoL6mAWkR_8srIEdtU1-kzN0VpsD_aH6OX_plwKR_J0GxvEGDS4xG3x3LN2AeRV7ch7B6qAREiSR35YkKYFVJtYAcg",
  },
  {
    key: "high-street-retail",
    name: "High Street Retail",
    type: "Retail Space",
    badge: "Featured",
    location: "Zirakpur, Punjab",
    area: "2,200 sq ft",
    price: "₹ 1.65 Cr",
    priceNote: "₹ 7,500 / sq ft",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAewtLGivwCgQcVsypXVbJKCWNq26zSdZQaNe26_9hOOWFK35ETdK7dVWPKz02PjDbjPDSFQeipY5WjgbgOrInmDkoBkuEaJ_xHradn3XyWpUuAsTzaoAKsMM6FoeRwZDGmdckib9nt2sqtU58kINvXl48UIILyuJPwTk0hRf9FrDr-F8qEOWONUBWipy9tfs3J7JAcc5z7FYJQelv95HQKY4VyiPosAsP7NGGih4OqGgQ0mNAUb0SFA3wHRvDXORG_UQ",
  },
  {
    key: "nextgen-coworks",
    name: "NextGen CoWorks",
    type: "Co-working Space",
    badge: "New",
    location: "Zirakpur, Punjab",
    area: "1,200 sq ft",
    price: "₹ 75,000",
    priceSuffix: "/ month",
    priceNote: null,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDbn4wJaTf5wICo98jM0CJHHH6Z-yiwarBQ3YwFjnPed6-J-hITAn8DOBJN2zkIYE0yC7q3AullfUrx_Y0wUVMlFOjQZtHiLkmDcA5woLNFHFywwEopFLMDT6c_IAqvtfZ9aqopsQ80PspbuvOI5inXYk7UV44b9EASHYPUs6ynVu2-I_htRNJtrYa5MAeGr6d88GeNykj1SnctL8uu8yUFxzLmPqBYKQ3cWSUyd1fpTEJPn4ZWvMVngxYJem0xz7pOkg",
  },
  {
    key: "industrial-warehouse",
    name: "Industrial Warehouse",
    type: "Warehouse / Industrial",
    badge: null,
    location: "Kharar, Punjab",
    area: "10,000 sq ft",
    price: "₹ 3.20 Cr",
    priceNote: "₹ 3,200 / sq ft",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDTT6PlHrR4FxVOSAwzC6eEd0G5uGYavxCl0VlZEPnPWzQhQ6lnyRx5zO-5dynB5nfyPz1aQApiHmxJaQQ3WRBoKVa9yOyTyc-foR60TpccOdIXwKTdjM_ZdnH-qILg-lp0SBj-fOlh6JBXKBjuRt2efwa9dP0nHiFh9P8H0DYr3etx8pPuRV59lPS1BndvKGQu9Z_GAS9ByOnZM9_kB7JQrW_jC4Sfbo6js9F9g3_izmFOYPHjOmP2UOVLlMbL9SrMdw",
  },
  {
    key: "premium-showroom",
    name: "Premium Showroom",
    type: "Showroom",
    badge: null,
    location: "Chandigarh Highway, Mohali",
    area: "3,000 sq ft",
    price: "₹ 2.40 Cr",
    priceNote: "₹ 8,000 / sq ft",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBNU1P8m--Z2s9TBaZ1kGtrO3YJ-au8V16UUc6RScmelexVl6_GZahRX2uNya9zZaIqWsKifNSx3WUrLTZumtyrFe9p27Z3ph-uqXqTS_SDYCoq-SQL4BzjukxNMRsBXwEm426FCkITOB4hPAlFClEpm4c8czzBpyjDD7nDiWh5MB-6QbWlYNQEmcFIkXiQHKWFuJ7xkf3LNtGg5QK2XVRp6oRhm-YzcGC4gMRay3n88HqBjHWrso6CvBRpvbYvBfpLMw",
  },
  {
    key: "business-park-office",
    name: "Business Park Office",
    type: "Office Space",
    badge: null,
    location: "Sector 70, Mohali",
    area: "2,100 sq ft",
    price: "₹ 1.35 Cr",
    priceNote: "₹ 6,428 / sq ft",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBILhx2HhQxm2hFsXExuLL1fqgT7i43xcS9Fp3BolgRBVUPHxRnqFf_nYkIkwac1cxiuDR4pXSagiVjyfaQpD4iGxfyi0BJqbl2bwA5lLzn2qbbeQ8paV3dN3o42SGScd8q6uVSibt_WEjZLSY9sHNGdI09c3bk5QK9CeapP8gxsamk87e1eIDmusCmuohO4yWycwKoGHa1z53oYc63fJpQw8jcTfKiW07w-lDey-RUi_AyP8LVH9AplWp_fxrlXzpKXA",
  },
];

const PAGE_NUMBERS = [1, 2, 3, "…", 6];

function PropertyCard({ property }) {
  return (
    <article className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden group hover:shadow-md transition-shadow">
      <div className="relative h-48">
        <img alt={property.name} className="w-full h-full object-cover" src={property.image} />
        {property.badge && (
          <span
            className={`absolute top-3 left-3 text-white text-[10px] font-bold px-2 py-1 rounded ${
              BADGE_STYLES[property.badge]
            }`}
          >
            {property.badge}
          </span>
        )}
        <button
          className="absolute top-3 right-3 bg-white/50 backdrop-blur text-white p-1.5 rounded-full hover:bg-white hover:text-red-500 transition-colors"
          aria-label="Save property"
        >
          <Heart size={18} />
        </button>
      </div>
      <div className="p-4">
        <span className="text-[10px] text-[#1a6b32] font-bold uppercase tracking-wider bg-[#eaf4ef] px-2 py-0.5 rounded">
          {property.type}
        </span>
        <h3 className="font-bold text-lg mt-2 mb-1">{property.name}</h3>
        <div className="flex items-center gap-1 text-gray-500 text-xs mb-3">
          <MapPin size={12} /> {property.location}
        </div>
        <div className="flex items-center gap-4 text-xs text-gray-600 mb-4">
          <span className="flex items-center gap-1">
            <Square size={14} /> {property.area}
          </span>
        </div>
        <div className="flex items-center justify-between border-t border-gray-100 pt-4">
          <div>
            <span className="text-[#1a6b32] font-bold text-lg">
              {property.price}{" "}
              {property.priceSuffix && (
                <span className="text-xs font-normal text-gray-400">{property.priceSuffix}</span>
              )}
            </span>
            <span className="block text-[10px] text-gray-400">{property.priceNote || "\u00A0"}</span>
          </div>
          <button className="text-[#1a6b32] border border-[#1a6b32] px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-[#1a6b32] hover:text-white transition-colors">
            View Details
          </button>
        </div>
      </div>
    </article>
  );
}

export default function ResultsGrid() {
  const [gridView, setGridView] = useState(true);
  const [activePage, setActivePage] = useState(1);

  return (
    <div className="flex-1">
      {/* Grid Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h2 className="text-xl font-bold">Showing 48 Properties</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-500">Sort By:</span>
            <select className="border-gray-200 rounded-lg text-sm font-medium py-1.5 focus:ring-[#1a6b32]">
              <option>Newest First</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>
          <div className="flex items-center bg-white border border-gray-200 rounded-lg p-1">
            <button
              className={`p-1.5 rounded ${gridView ? "bg-[#1a6b32] text-white" : "text-gray-400"}`}
              onClick={() => setGridView(true)}
              aria-label="Grid view"
            >
              <LayoutGrid size={18} />
            </button>
            <button
              className={`p-1.5 rounded ${!gridView ? "bg-[#1a6b32] text-white" : "text-gray-400"}`}
              onClick={() => setGridView(false)}
              aria-label="List view"
            >
              <List size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {PROPERTIES.map((property) => (
          <PropertyCard key={property.key} property={property} />
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-12 flex justify-center items-center gap-2">
        <button
          className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:border-[#1a6b32] hover:text-[#1a6b32] transition-colors"
          aria-label="Previous page"
        >
          <ChevronLeft size={18} />
        </button>
        {PAGE_NUMBERS.map((num, i) =>
          num === "…" ? (
            <span key={`ellipsis-${i}`} className="px-2 text-gray-400">
              …
            </span>
          ) : (
            <button
              key={num}
              onClick={() => setActivePage(num)}
              className={`w-10 h-10 flex items-center justify-center rounded-lg font-bold ${
                activePage === num
                  ? "bg-[#1a6b32] text-white"
                  : "border border-gray-200 text-gray-500 font-medium hover:border-[#1a6b32] hover:text-[#1a6b32]"
              }`}
            >
              {num}
            </button>
          )
        )}
        <button
          className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:border-[#1a6b32] hover:text-[#1a6b32] transition-colors"
          aria-label="Next page"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}