import { useState } from "react";

const PROPERTY_TYPES = ["Agricultural Land", "Farmhouse Land", "Plantation", "Horticulture Land", "Dairy / Farm Land"];
const LOCATIONS = ["Mohali", "Zirakpur", "Kharar", "Derabassi", "Rajpura"];

function CheckboxList({ options }) {
  return (
    <div className="space-y-2">
      {options.map((option) => (
        <label key={option} className="flex items-center gap-3 text-sm text-gray-600">
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
    <aside className="w-full lg:w-64 flex-shrink-0">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <span className="material-symbols-outlined text-xl">filter_alt</span>
          Filters
        </h2>
        <button className="text-[#1a6b32] text-xs font-bold uppercase">Clear All</button>
      </div>

      {/* Property Type */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-bold">Property Type</h3>
          <span className="material-symbols-outlined text-base text-gray-400">expand_more</span>
        </div>
        <CheckboxList options={PROPERTY_TYPES} />
      </div>

      {/* Location */}
      <div className="mb-8">
        <h3 className="text-sm font-bold mb-4">Location</h3>
        <div className="relative mb-4">
          <input
            className="w-full text-sm border-gray-200 rounded-lg pr-10 focus:ring-[#1a6b32] focus:border-[#1a6b32]"
            placeholder="Search location"
            type="text"
          />
          <span className="material-symbols-outlined text-base absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            search
          </span>
        </div>
        <div className="space-y-2">
          <CheckboxList options={LOCATIONS} />
          <button className="text-[#1a6b32] text-xs font-bold mt-2">View More</button>
        </div>
      </div>

      {/* Land Area */}
      <div className="mb-8">
        <h3 className="text-sm font-bold mb-4">Land Area</h3>
        <div className="px-2">
          <div className="relative h-1 w-full bg-gray-200 rounded-full mb-6">
            <div className="absolute h-full bg-[#1a6b32] rounded-full left-0 right-0" />
            <div className="absolute -top-1.5 left-0 h-4 w-4 bg-[#1a6b32] border-2 border-white rounded-full shadow cursor-pointer" />
            <div className="absolute -top-1.5 right-0 h-4 w-4 bg-[#1a6b32] border-2 border-white rounded-full shadow cursor-pointer" />
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <p className="text-[10px] text-gray-400 font-bold mb-1 uppercase">Min</p>
              <div className="border border-gray-200 rounded p-2 text-center text-xs font-bold">1 Acre</div>
            </div>
            <div className="flex-1">
              <p className="text-[10px] text-gray-400 font-bold mb-1 uppercase">Max</p>
              <div className="border border-gray-200 rounded p-2 text-center text-xs font-bold">100+ Acre</div>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => setShowMore((v) => !v)}
        className="w-full flex justify-between items-center text-sm font-bold border-t pt-4"
      >
        Show More Filters
        <span
          className={`material-symbols-outlined text-base transition-transform ${showMore ? "rotate-180" : ""}`}
        >
          expand_more
        </span>
      </button>
    </aside>
  );
}