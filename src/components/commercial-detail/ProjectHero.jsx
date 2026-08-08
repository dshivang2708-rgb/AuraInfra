import { Link } from "@tanstack/react-router";

export default function ProjectHero({ property }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden mb-6">
      <div className="relative h-80 md:h-96">
        <img alt={property.name} className="w-full h-full object-cover" src={property.image} />
        <span className="absolute top-4 left-4 bg-[#006D32] text-white text-xs font-bold px-3 py-1.5 rounded-full">
          {property.badge ? `${property.badge} ${property.type}` : property.type}
        </span>
      </div>

      <div className="p-6 md:p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">{property.name}</h1>
        <p className="text-gray-500 mb-4">{property.tagline}</p>
        <div className="flex items-center gap-1.5 text-sm text-gray-500 mb-6">
          <i className="fa-solid fa-location-dot text-[#006D32]" />
          {property.location}
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {property.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-semibold text-[#006D32] bg-[#E6F4EC] px-3 py-1.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        <p className="text-sm text-gray-600 leading-relaxed mb-8">{property.description}</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="border-l-2 border-[#006D32] pl-3">
            <p className="text-lg font-bold text-gray-900">{property.type}</p>
            <p className="text-xs text-gray-500">Property Type</p>
          </div>
          <div className="border-l-2 border-[#006D32] pl-3">
            <p className="text-lg font-bold text-gray-900">{property.area}</p>
            <p className="text-xs text-gray-500">Carpet Area</p>
          </div>
          <div className="border-l-2 border-[#006D32] pl-3">
            <p className="text-lg font-bold text-gray-900">{property.priceRange}</p>
            <p className="text-xs text-gray-500">Price</p>
          </div>
          <div className="border-l-2 border-[#006D32] pl-3">
            <p className="text-lg font-bold text-gray-900">{property.possession}</p>
            <p className="text-xs text-gray-500">Possession</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          {property.brochureUrl ? (
            <a
              href={property.brochureUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-[#006D32] hover:bg-[#005a29] text-white text-sm font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <i className="fa-solid fa-download" /> Download Brochure
            </a>
          ) : (
            <button
              type="button"
              disabled
              className="flex-1 bg-gray-200 text-gray-400 text-sm font-semibold py-3 rounded-lg cursor-not-allowed flex items-center justify-center gap-2"
              title="Brochure not uploaded yet"
            >
              <i className="fa-solid fa-download" /> Brochure Unavailable
            </button>
          )}
          <button className="flex-1 border border-[#006D32] text-[#006D32] hover:bg-[#E6F4EC] text-sm font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
            <i className="fa-regular fa-calendar-check" /> Schedule Site Visit
          </button>
        </div>

        <Link
          to="/properties/commercial"
          className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-[#006D32] mt-6"
        >
          <i className="fa-solid fa-arrow-left" />
          Back to all Commercial Properties
        </Link>
      </div>
    </div>
  );
}