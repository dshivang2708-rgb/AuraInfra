import { Link } from "@tanstack/react-router";

export default function ProjectHero({ property }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      <div className="relative h-80 md:h-96">
        <img alt={property.name} className="w-full h-full object-cover" src={property.image} />
        {property.builder && (
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg shadow-sm">
            <span className="text-xs font-bold text-slate-700">{property.builder}</span>
          </div>
        )}
        <span className="absolute top-4 right-4 bg-[#1a6b32] text-white text-xs font-bold px-3 py-1.5 rounded-full">
          {property.badge ? property.badge : "Premium Project"}
        </span>
      </div>

      <div className="p-6 md:p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">{property.name}</h1>
        {property.tagline && <p className="text-gray-500 mb-4">{property.tagline}</p>}
        <p className="text-sm text-gray-500 flex items-center gap-1 mb-6">
          <span className="material-symbols-outlined text-base">location_on</span>
          {property.location}
        </p>

        {property.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {property.tags.map((tag) => (
              <span key={tag} className="text-xs font-medium text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        )}

        {property.description && (
          <p className="text-sm text-gray-600 leading-relaxed mb-8">{property.description}</p>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="border-l-2 border-[#1a6b32] pl-3">
            <p className="text-lg font-bold text-gray-900">{property.area || "—"}</p>
            <p className="text-xs text-gray-500">Area</p>
          </div>
          <div className="border-l-2 border-[#1a6b32] pl-3">
            <p className="text-lg font-bold text-gray-900">{property.priceRange || property.price || "—"}</p>
            <p className="text-xs text-gray-500">Price</p>
          </div>
          <div className="border-l-2 border-[#1a6b32] pl-3">
            <p className="text-lg font-bold text-gray-900">{property.possession || "—"}</p>
            <p className="text-xs text-gray-500">Possession</p>
          </div>
          <div className="border-l-2 border-[#1a6b32] pl-3">
            <p className="text-lg font-bold text-gray-900">{property.configurations || "—"}</p>
            <p className="text-xs text-gray-500">Configurations</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          {property.brochureUrl ? (
            <a
              href={property.brochureUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-[#1a6b32] hover:bg-[#145126] text-white text-sm font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-base">download</span> Download Brochure
            </a>
          ) : (
            <button
              type="button"
              disabled
              className="flex-1 bg-gray-200 text-gray-400 text-sm font-semibold py-3 rounded-lg cursor-not-allowed flex items-center justify-center gap-2"
              title="Brochure not uploaded yet"
            >
              <span className="material-symbols-outlined text-base">download</span> Brochure Unavailable
            </button>
          )}
          <button className="flex-1 border border-[#1a6b32] text-[#1a6b32] hover:bg-[#eaf4ef] text-sm font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-base">calendar_today</span> Schedule Site Visit
          </button>
        </div>

        <Link
          to="/properties/premium-projects"
          className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-[#1a6b32] mt-6"
        >
          <span className="material-symbols-outlined text-base">arrow_back</span>
          Back to all Premium Projects
        </Link>
      </div>
    </div>
  );
}