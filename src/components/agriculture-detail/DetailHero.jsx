import { Link } from "@tanstack/react-router";

export default function DetailHero({ property }) {
  return (
    <div className="flex flex-col xl:flex-row gap-8 mb-8">
      {/* Image */}
      <div className="w-full xl:w-1/2 relative rounded-2xl overflow-hidden h-80 xl:h-96 bg-[#e7eefe]">
        <img alt={property.name} className="w-full h-full object-cover" src={property.image} />
        <div className="absolute top-4 left-4 bg-[#003612]/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-[10px] uppercase tracking-wider shadow-sm flex items-center gap-1">
          <span className="material-symbols-outlined text-[14px]">star</span> Premium Land
        </div>
      </div>

      {/* Info */}
      <div className="w-full xl:w-1/2 flex flex-col justify-center">
        <h1 className="text-3xl font-bold text-[#071837] mb-2 tracking-tight">{property.name}</h1>
        <p className="text-xs text-[#45464e] mb-4">{property.tagline}</p>
        <div className="flex items-center gap-1 text-[#45464e] mb-6 text-xs">
          <span className="material-symbols-outlined text-[18px]">location_on</span>
          <span>{property.location}</span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {property.tags.map((tag) => (
            <span
              key={tag.label}
              className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md border border-[#c5c6cf] bg-white text-[#151c27] text-[10px]"
            >
              <span className="material-symbols-outlined text-[14px] text-[#1a6b32]">{tag.icon}</span>
              {tag.label}
            </span>
          ))}
        </div>

        <p className="text-xs text-[#45464e] mb-8 leading-relaxed">{property.description}</p>

        {/* Quick Info */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="flex flex-col">
            <span className="font-semibold text-[#151c27] text-xs">{property.area}</span>
            <span className="text-[10px] text-[#45464e] uppercase tracking-wider">Land Area</span>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-[#151c27] text-xs">{property.badge}</span>
            <span className="text-[10px] text-[#45464e] uppercase tracking-wider">Land Type</span>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-[#151c27] text-xs">{property.priceRange}</span>
            <span className="text-[10px] text-[#45464e] uppercase tracking-wider">Price Range</span>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-[#151c27] text-xs">{property.possession}</span>
            <span className="text-[10px] text-[#45464e] uppercase tracking-wider">Possession</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-4">
          <button className="flex-1 bg-[#1a6b32] hover:bg-[#1a6b32]/90 text-white text-xs py-2 px-4 rounded-md transition-colors flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-base">download</span> Download Brochure
          </button>
          <button className="flex-1 border border-[#1a6b32] text-[#1a6b32] hover:bg-[#1a6b32]/5 text-xs py-2 px-4 rounded-md transition-colors flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-base">calendar_today</span> Schedule Site Visit
          </button>
        </div>

        <Link
          to="/properties/agriculture"
          className="inline-flex items-center gap-1 text-xs text-[#45464e] hover:text-[#1a6b32] mt-6"
        >
          <span className="material-symbols-outlined text-base">arrow_back</span>
          Back to all Agriculture Properties
        </Link>
      </div>
    </div>
  );
}