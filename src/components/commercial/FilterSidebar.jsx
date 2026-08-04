import { useState } from "react";
import { SlidersHorizontal, ChevronDown, Search } from "lucide-react";

const PROPERTY_TYPES = ["Office Space", "Retail Space", "Showroom", "Warehouse / Industrial", "Co-working Space"];
const LOCATIONS = ["Mohali", "Zirakpur", "Panchkula", "Chandigarh", "Kharar"];
const CARPET_AREAS = ["0 - 1000 sq ft", "1000 - 5000 sq ft", "5000 - 10000 sq ft", "10000+ sq ft"];

function CheckboxList({ options }) {
  return (
    <div className="space-y-3">
      {options.map((option) => (
        <label key={option} className="flex items-center gap-3 text-sm text-gray-600 cursor-pointer">
          <input type="checkbox" className="rounded border-gray-300 text-[#1a6b32] focus:ring-[#1a6b32]" />
          {option}
        </label>
      ))}
    </div>
  );
}

export default function FilterSidebar() {
  const [showMore, setShowMore] = useState(false);

  return (
    <aside className="w-full md:w-72 flex-shrink-0">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:sticky md:top-20">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-[#1a6b32] font-bold">
            <SlidersHorizontal size={18} />
            Filters
          </div>
          <button className="text-xs text-[#1a6b32] font-semibold">Clear All</button>
        </div>

        {/* Property Type */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-sm font-bold text-gray-700">Property Type</h4>
            <ChevronDown size={14} />
          </div>
          <CheckboxList options={PROPERTY_TYPES} />
        </div>

        {/* Location */}
        <div className="mb-8">
          <h4 className="text-sm font-bold text-gray-700 mb-4">Location</h4>
          <div className="relative mb-4">
            <input
              className="w-full text-sm border-gray-200 rounded-lg pr-8 py-2"
              placeholder="Search location"
              type="text"
            />
            <Search size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
          <div className="space-y-3">
            <CheckboxList options={LOCATIONS} />
            <button className="text-xs text-[#1a6b32] font-bold mt-1">View More</button>
          </div>
        </div>

        {/* Carpet Area */}
        <div className="mb-8">
          <h4 className="text-sm font-bold text-gray-700 mb-4">Carpet Area</h4>
          <CheckboxList options={CARPET_AREAS} />
        </div>

        <button
          onClick={() => setShowMore((v) => !v)}
          className="w-full py-3 flex items-center justify-center gap-2 text-[#1a6b32] font-bold text-sm border-t border-gray-100 mt-4"
        >
          Show More Filters
          <ChevronDown size={16} className={`transition-transform ${showMore ? "rotate-180" : ""}`} />
        </button>
      </div>
    </aside>
  );
}