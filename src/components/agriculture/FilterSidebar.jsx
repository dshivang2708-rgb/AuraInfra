import { useState } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useCities, useSectors, cleanSearch } from "../../lib/locationFilter.js";
import { parseListParam } from "../../lib/propertyFilters.js";

const PROPERTY_TYPES = ["Agricultural Land", "Farmhouse Land", "Plantation", "Horticulture Land", "Dairy / Farm Land"];

function CheckboxList({ options, selected, onToggle }) {
  return (
    <div className="space-y-2">
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
  const minArea = search.minArea || "";
  const maxArea = search.maxArea || "";

  const cities = useCities();
  const sectors = useSectors(city);

  function updateSearch(next) {
    navigate({
      to: "/properties/agriculture",
      search: cleanSearch({ ...search, ...next }),
      replace: true,
    });
  }

  function toggleType(option) {
    const next = types.includes(option) ? types.filter((t) => t !== option) : [...types, option];
    updateSearch({ types: next.join(",") || undefined });
  }

  function clearAll() {
    updateSearch({ city: "", sector: "", types: undefined, minArea: undefined, maxArea: undefined });
  }

  return (
    <aside className="w-full lg:w-64 flex-shrink-0">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <span className="material-symbols-outlined text-xl">filter_alt</span>
          Filters
        </h2>
        <button onClick={clearAll} className="text-[#1a6b32] text-xs font-bold uppercase">
          Clear All
        </button>
      </div>

      {/* Property Type */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-bold">Property Type</h3>
          <span className="material-symbols-outlined text-base text-gray-400">expand_more</span>
        </div>
        <CheckboxList options={PROPERTY_TYPES} selected={types} onToggle={toggleType} />
        <p className="text-[10px] text-gray-400 mt-2">
          Matches against the listing's tags — make sure relevant listings are tagged accordingly in admin.
        </p>
      </div>

      {/* City */}
      <div className="mb-6">
        <h3 className="text-sm font-bold mb-4">City</h3>
        <select
          value={city}
          onChange={(e) => updateSearch({ city: e.target.value, sector: "" })}
          className="w-full text-sm border-gray-200 rounded-lg focus:ring-[#1a6b32] focus:border-[#1a6b32]"
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
        <h3 className="text-sm font-bold mb-4">Sector</h3>
        <select
          value={sector}
          onChange={(e) => updateSearch({ sector: e.target.value })}
          disabled={sectors.length === 0}
          className="w-full text-sm border-gray-200 rounded-lg focus:ring-[#1a6b32] focus:border-[#1a6b32] disabled:bg-gray-50 disabled:text-gray-400"
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

      {/* Land Area */}
      <div className="mb-8">
        <h3 className="text-sm font-bold mb-4">Land Area (Acres)</h3>
        <div className="flex gap-4">
          <div className="flex-1">
            <p className="text-[10px] text-gray-400 font-bold mb-1 uppercase">Min</p>
            <input
              type="number"
              min="0"
              step="0.5"
              value={minArea}
              onChange={(e) => updateSearch({ minArea: e.target.value })}
              placeholder="1"
              className="w-full border border-gray-200 rounded p-2 text-center text-xs font-bold focus:ring-[#1a6b32] focus:border-[#1a6b32]"
            />
          </div>
          <div className="flex-1">
            <p className="text-[10px] text-gray-400 font-bold mb-1 uppercase">Max</p>
            <input
              type="number"
              min="0"
              step="0.5"
              value={maxArea}
              onChange={(e) => updateSearch({ maxArea: e.target.value })}
              placeholder="100"
              className="w-full border border-gray-200 rounded p-2 text-center text-xs font-bold focus:ring-[#1a6b32] focus:border-[#1a6b32]"
            />
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