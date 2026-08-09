import { useEffect, useState } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { SlidersHorizontal, RotateCcw } from "lucide-react";
import { useCities, useSectors, cleanSearch } from "../../lib/locationFilter.js";
import { parseListParam } from "../../lib/propertyFilters.js";

const CATEGORY_OPTIONS = [
  { value: "residential", label: "Residential" },
  { value: "commercial", label: "Commercial" },
  { value: "agriculture", label: "Agriculture" },
];

function draftFromSearch(search) {
  return {
    city: search.city || "",
    sector: search.sector || "",
    category: parseListParam(search.category),
  };
}

export default function FilterSidebar() {
  const navigate = useNavigate();
  const search = useSearch({ strict: false });

  // Filters below are staged locally (draft) and only pushed into the URL —
  // which is what ResultsGrid actually reads from — once "Apply Filters" is
  // clicked. This lets someone tick a few categories and pick a city/sector
  // without triggering a re-fetch/re-render on every single click.
  const [draft, setDraft] = useState(() => draftFromSearch(search));

  // If the URL changes from outside this component (browser back/forward,
  // a link elsewhere resetting filters, etc), re-sync the draft so it
  // doesn't show stale selections.
  useEffect(() => {
    setDraft(draftFromSearch(search));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search.city, search.sector, search.category]);

  const cities = useCities();
  const sectors = useSectors(draft.city);

  const appliedDraft = draftFromSearch(search);
  const isDirty =
    draft.city !== appliedDraft.city ||
    draft.sector !== appliedDraft.sector ||
    draft.category.join(",") !== appliedDraft.category.join(",");

  function updateDraft(next) {
    setDraft((d) => ({ ...d, ...next }));
  }

  function toggleCategory(value) {
    const next = draft.category.includes(value)
      ? draft.category.filter((c) => c !== value)
      : [...draft.category, value];
    updateDraft({ category: next });
  }

  function handleCityChange(e) {
    // Changing city clears sector — sectors only make sense within a city.
    updateDraft({ city: e.target.value, sector: "" });
  }

  function applyFilters() {
    navigate({
      to: "/properties/upcoming",
      search: cleanSearch({
        ...search,
        city: draft.city,
        sector: draft.sector,
        category: draft.category.join(",") || undefined,
      }),
      replace: true,
    });
  }

  function clearAll() {
    setDraft({ city: "", sector: "", category: [] });
    navigate({
      to: "/properties/upcoming",
      search: cleanSearch({ ...search, city: "", sector: "", category: undefined }),
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

        {/* Category */}
        <div className="mb-8">
          <h4 className="text-sm font-bold text-gray-700 mb-4">Category</h4>
          <div className="space-y-3">
            {CATEGORY_OPTIONS.map((option) => (
              <label key={option.value} className="flex items-center gap-3 text-sm text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-[#1a6b32] focus:ring-[#1a6b32]"
                  checked={draft.category.includes(option.value)}
                  onChange={() => toggleCategory(option.value)}
                />
                {option.label}
              </label>
            ))}
          </div>
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
          <RotateCcw size={12} /> Reset All
        </button>
      </div>
    </aside>
  );
}