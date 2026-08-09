import { useState } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { SlidersHorizontal, ChevronDown } from "lucide-react";
import { useCities, useSectors, cleanSearch } from "../../lib/locationFilter.js";
import { parseListParam } from "../../lib/propertyFilters.js";
import { COMMERCIAL_PROPERTY_TYPES, CARPET_AREA_BUCKETS } from "../../lib/commercialFilters.js";

function CheckboxList({ options, selected, onToggle }) {
  return (
    <div className="space-y-3">
      {options.map((option) => (
        <label key={option} className="flex items-center gap-3 text-sm text-gray-600 cursor-pointer">
          <input
            type="checkbox"
            className="rounded border-gray-300 text-[#1a6b32] focus:ring-[#1a6b32]"
            checked={selected.includes(option)}
            onChange={() => onToggle(option)}
          />
          {option}
        </label>
      ))}
    </div>
  );
}

export default function FilterSidebar() {
  const [showMore, setShowMore] = useState(false);
  const navigate = useNavigate();
  const search = useSearch({ strict: false });
  const city = search.city || "";
  const sector = search.sector || "";
  const types = parseListParam(search.types);
  const areas = parseListParam(search.area);

  const cities = useCities();
  const sectors = useSectors(city);

  function updateSearch(next) {
    navigate({
      to: "/properties/commercial",
      search: cleanSearch({ ...search, ...next }),
      replace: true,
    });
  }

  function toggleType(option) {
    const next = types.includes(option) ? types.filter((t) => t !== option) : [...types, option];
    updateSearch({ types: next.join(",") || undefined });
  }

  function toggleArea(option) {
    const next = areas.includes(option) ? areas.filter((a) => a !== option) : [...areas, option];
    updateSearch({ area: next.join(",") || undefined });
  }

  function clearAll() {
    updateSearch({ city: "", sector: "", types: undefined, area: undefined });
  }

  return (
    <aside className="w-full md:w-72 flex-shrink-0">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:sticky md:top-20">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-[#1a6b32] font-bold">
            <SlidersHorizontal size={18} />
            Filters
          </div>
          <button onClick={clearAll} className="text-xs text-[#1a6b32] font-semibold">
            Clear All
          </button>
        </div>

        {/* Property Type */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-sm font-bold text-gray-700">Property Type</h4>
            <ChevronDown size={14} />
          </div>
          <CheckboxList options={COMMERCIAL_PROPERTY_TYPES} selected={types} onToggle={toggleType} />
        </div>

        {/* City */}
        <div className="mb-6">
          <h4 className="text-sm font-bold text-gray-700 mb-4">City</h4>
          <select
            value={city}
            onChange={(e) => updateSearch({ city: e.target.value, sector: "" })}
            className="w-full text-sm border-gray-200 rounded-lg py-2 focus:ring-[#1a6b32] focus:border-[#1a6b32]"
          >
            <option value="">All Cities</option>
            {cities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Sector — scoped to the selected city */}
        <div className="mb-8">
          <h4 className="text-sm font-bold text-gray-700 mb-4">Sector</h4>
          <select
            value={sector}
            onChange={(e) => updateSearch({ sector: e.target.value })}
            disabled={sectors.length === 0}
            className="w-full text-sm border-gray-200 rounded-lg py-2 focus:ring-[#1a6b32] focus:border-[#1a6b32] disabled:bg-gray-50 disabled:text-gray-400"
          >
            <option value="">All Sectors</option>
            {sectors.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          {city && sectors.length === 0 && (
            <p className="text-[11px] text-gray-400 mt-1">No specific sectors listed for {city} yet.</p>
          )}
        </div>

        {/* Carpet Area */}
        <div className="mb-8">
          <h4 className="text-sm font-bold text-gray-700 mb-4">Carpet Area</h4>
          <CheckboxList
            options={CARPET_AREA_BUCKETS.map((b) => b.label)}
            selected={areas}
            onToggle={toggleArea}
          />
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