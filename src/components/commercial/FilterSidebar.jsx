import { useEffect, useState } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { SlidersHorizontal } from "lucide-react";
import { useCities, useSectors, cleanSearch } from "../../lib/locationFilter.js";
import { parseListParam } from "../../lib/propertyFilters.js";
import { CARPET_AREA_BUCKETS } from "../../lib/commercialFilters.js";

function draftFromSearch(search) {
  return {
    city: search.city || "",
    sector: search.sector || "",
    area: parseListParam(search.area),
    minPrice: search.minPrice || "",
    maxPrice: search.maxPrice || "",
  };
}

export default function FilterSidebar() {
  const navigate = useNavigate();
  const search = useSearch({ strict: false });

  // These filters are staged locally and only pushed into the URL (which is
  // what ResultsGrid actually reads from) when "Apply Filters" is clicked.
  const [draft, setDraft] = useState(() => draftFromSearch(search));

  // If the URL changes from outside this component (Clear All below,
  // browser back/forward, a category tab reset, etc), re-sync the draft so
  // it doesn't show stale selections.
  useEffect(() => {
    setDraft(draftFromSearch(search));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search.city, search.sector, search.area, search.minPrice, search.maxPrice]);

  const cities = useCities();
  const sectors = useSectors(draft.city);

  const appliedDraft = draftFromSearch(search);
  const isDirty =
    draft.city !== appliedDraft.city ||
    draft.sector !== appliedDraft.sector ||
    draft.area.join(",") !== appliedDraft.area.join(",") ||
    draft.minPrice !== appliedDraft.minPrice ||
    draft.maxPrice !== appliedDraft.maxPrice;

  function updateDraft(next) {
    setDraft((d) => ({ ...d, ...next }));
  }

  function handleCityChange(e) {
    // Changing city clears sector — sectors only make sense within a city.
    updateDraft({ city: e.target.value, sector: "" });
  }

  function toggleArea(option) {
    const next = draft.area.includes(option) ? draft.area.filter((a) => a !== option) : [...draft.area, option];
    updateDraft({ area: next });
  }

  function applyFilters() {
    navigate({
      to: "/properties/commercial",
      search: cleanSearch({
        ...search,
        city: draft.city,
        sector: draft.sector,
        area: draft.area.join(",") || undefined,
        minPrice: draft.minPrice || undefined,
        maxPrice: draft.maxPrice || undefined,
      }),
      replace: true,
    });
  }

  function clearAll() {
    setDraft({ city: "", sector: "", area: [], minPrice: "", maxPrice: "" });
    navigate({
      to: "/properties/commercial",
      search: cleanSearch({ ...search, city: "", sector: "", area: undefined, minPrice: undefined, maxPrice: undefined }),
      replace: true,
    });
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

        {/* City */}
        <div className="mb-6">
          <h4 className="text-sm font-bold text-gray-700 mb-4">City</h4>
          <select
            value={draft.city}
            onChange={handleCityChange}
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
            value={draft.sector}
            onChange={(e) => updateDraft({ sector: e.target.value })}
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
          {draft.city && sectors.length === 0 && (
            <p className="text-[11px] text-gray-400 mt-1">No specific sectors listed for {draft.city} yet.</p>
          )}
        </div>

        {/* Price Range */}
        <div className="mb-8">
          <h4 className="text-sm font-bold text-gray-700 mb-4">Price Range (₹ Lakh)</h4>
          <div className="flex gap-3">
            <input
              type="number"
              min="0"
              value={draft.minPrice}
              onChange={(e) => updateDraft({ minPrice: e.target.value })}
              placeholder="Min"
              className="w-full text-sm border-gray-200 rounded-lg focus:ring-[#1a6b32] focus:border-[#1a6b32]"
            />
            <input
              type="number"
              min="0"
              value={draft.maxPrice}
              onChange={(e) => updateDraft({ maxPrice: e.target.value })}
              placeholder="Max"
              className="w-full text-sm border-gray-200 rounded-lg focus:ring-[#1a6b32] focus:border-[#1a6b32]"
            />
          </div>
        </div>

        {/* Carpet Area */}
        <div className="mb-8">
          <h4 className="text-sm font-bold text-gray-700 mb-4">Carpet Area</h4>
          <div className="space-y-3">
            {CARPET_AREA_BUCKETS.map((bucket) => (
              <label key={bucket.label} className="flex items-center gap-3 text-sm text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-[#1a6b32] focus:ring-[#1a6b32]"
                  checked={draft.area.includes(bucket.label)}
                  onChange={() => toggleArea(bucket.label)}
                />
                {bucket.label}
              </label>
            ))}
          </div>
        </div>

        {/* Apply — filters above are staged locally and only take effect
            against the results once this is clicked. */}
        <button
          type="button"
          onClick={applyFilters}
          className={`w-full text-white text-sm font-bold py-2.5 rounded-lg mb-2 flex items-center justify-center gap-2 transition-colors ${
            isDirty ? "bg-[#1a6b32] hover:bg-[#145528]" : "bg-[#1a6b32]/70"
          }`}
        >
          <SlidersHorizontal size={14} /> Apply Filters
        </button>

        <button
          onClick={clearAll}
          className="w-full text-gray-500 text-xs font-bold py-1 flex items-center justify-center gap-2"
        >
          Reset All
        </button>
      </div>
    </aside>
  );
}