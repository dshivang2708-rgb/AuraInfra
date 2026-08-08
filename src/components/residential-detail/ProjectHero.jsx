import { Link } from "@tanstack/react-router";

export default function ProjectHero({ property }) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="relative h-[400px]">
        <img alt={property.name} className="w-full h-full object-cover" src={property.image} />
        <div className="absolute top-4 left-4 bg-[#1a6b32] text-white px-3 py-1 text-xs font-semibold rounded-full">
          {property.badge} Project
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <h2 className="text-white text-5xl font-bold tracking-widest uppercase drop-shadow-lg opacity-80">
            {property.name}
          </h2>
        </div>
      </div>
      <div className="p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.name}</h1>
        <p className="text-gray-600 mb-4">{property.tagline}</p>
        <p className="text-gray-500 text-sm flex items-center gap-2 mb-6">
          <i className="fa-solid fa-location-dot text-[#1a6b32]" /> {property.location}
        </p>

        <div className="flex flex-wrap gap-4 mb-6">
          {property.tags.map((tag) => (
            <span
              key={tag.label}
              className="flex items-center gap-1.5 text-sm font-medium text-gray-700 bg-[#e8f3ec] px-3 py-1.5 rounded-md"
            >
              <i className={`${tag.icon} text-[#1a6b32]`} /> {tag.label}
            </span>
          ))}
        </div>

        <p className="text-gray-600 text-sm leading-relaxed mb-8">{property.description}</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-y border-gray-100 mb-8">
          <div>
            <p className="font-bold text-gray-900">{property.beds}</p>
            <p className="text-xs text-gray-500">BHK Units</p>
          </div>
          <div>
            <p className="font-bold text-gray-900">{property.area}</p>
            <p className="text-xs text-gray-500">Sq.ft</p>
          </div>
          <div>
            <p className="font-bold text-gray-900">{property.priceRange}</p>
            <p className="text-xs text-gray-500">Price Range</p>
          </div>
          <div>
            <p className="font-bold text-gray-900">{property.possession}</p>
            <p className="text-xs text-gray-500">Possession</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          {property.brochureUrl ? (
            <a
              href={property.brochureUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-[#1a6b32] text-white px-6 py-3 rounded-md font-medium hover:bg-green-700 transition flex items-center justify-center gap-2"
            >
              <i className="fa-solid fa-download" /> Download Brochure
            </a>
          ) : (
            <button
              type="button"
              disabled
              className="flex-1 bg-gray-200 text-gray-400 px-6 py-3 rounded-md font-medium cursor-not-allowed flex items-center justify-center gap-2"
              title="Brochure not uploaded yet"
            >
              <i className="fa-solid fa-download" /> Brochure Unavailable
            </button>
          )}
          <button className="flex-1 border border-[#1a6b32] text-[#1a6b32] px-6 py-3 rounded-md font-medium hover:bg-green-50 transition flex items-center justify-center gap-2">
            <i className="fa-regular fa-calendar-check" /> Schedule Site Visit
          </button>
        </div>

        <Link
          to="/properties/residential"
          className="inline-flex items-center gap-1 text-xs text-gray-500 hover:text-[#1a6b32] mt-6"
        >
          <i className="fa-solid fa-arrow-left" />
          Back to all Residential Properties
        </Link>
      </div>
    </div>
  );
}