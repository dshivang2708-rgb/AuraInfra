import { useEffect, useState } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";

import { useCities, useSectors, cleanSearch } from "../../lib/locationFilter.js";

function draftFromSearch(search) {
  return {
    city: search.city || "",
    sector: search.sector || "",
    minArea: search.minArea || "",
    maxArea: search.maxArea || "",
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
  }, [search.city, search.sector, search.minArea, search.maxArea]);

  const cities = useCities();
  const sectors = useSectors(draft.city);

  const appliedDraft = draftFromSearch(search);
  const isDirty =
    draft.city !== appliedDraft.city ||
    draft.sector !== appliedDraft.sector ||
    draft.minArea !== appliedDraft.minArea ||
    draft.maxArea !== appliedDraft.maxArea;

  function updateDraft(next) {
    setDraft((d) => ({ ...d, ...next }));
  }

  function handleCityChange(e) {
    // Changing city clears sector — sectors only make sense within a city.
    updateDraft({ city: e.target.value, sector: "" });
  }

  function applyFilters() {
    navigate({
      to: "/properties/agriculture",
      search: cleanSearch({
        ...search,
        city: draft.city,
        sector: draft.sector,
        minArea: draft.minArea || undefined,
        maxArea: draft.maxArea || undefined,
      }),
      replace: true,
    });
  }

  function clearAll() {
    setDraft({ city: "", sector: "", minArea: "", maxArea: "" });
    navigate({
      to: "/properties/agriculture",
      search: cleanSearch({ ...search, city: "", sector: "", minArea: undefined, maxArea: undefined }),
      replace: true,
    });
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

      {/* City */}
      <div className="mb-6">
        <h3 className="text-sm font-bold mb-4">City</h3>
        <select
          value={draft.city}
          onChange={handleCityChange}
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
          value={draft.sector}
          onChange={(e) => updateDraft({ sector: e.target.value })}
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
        {draft.city && sectors.length === 0 && (
          <p className="text-[11px] text-gray-400 mt-1">No specific sectors listed for {draft.city} yet.</p>
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
              value={draft.minArea}
              onChange={(e) => updateDraft({ minArea: e.target.value })}
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
              value={draft.maxArea}
              onChange={(e) => updateDraft({ maxArea: e.target.value })}
              placeholder="100"
              className="w-full border border-gray-200 rounded p-2 text-center text-xs font-bold focus:ring-[#1a6b32] focus:border-[#1a6b32]"
            />
          </div>
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
        <span className="material-symbols-outlined text-base">filter_alt</span> Apply Filters
      </button>

      <button
        onClick={clearAll}
        className="w-full text-gray-500 text-xs font-bold py-1 flex items-center justify-center gap-2"
      >
        Reset All
      </button>
    </aside>
  );
}