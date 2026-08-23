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

  // Controls the slide-in drawer on small screens. Desktop (md+) ignores
  // this entirely and always shows the sidebar in place.
  const [mobileOpen, setMobileOpen] = useState(false);

  // These filters are staged locally and only pushed into the URL (which is
  // what ResultsGrid actually reads from) when "Apply Filters" is clicked.
  const [draft, setDraft] = useState(() => draftFromSearch(search));

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
    setMobileOpen(false);
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
    <>
      {/* Mobile trigger — the sidebar below is hidden by default on small
          screens and only slides in once this is tapped. */}
      <div className="md:hidden mb-4">
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="w-full flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 font-bold text-sm py-3 rounded-lg shadow-sm"
        >
          <SlidersHorizontal size={16} /> Filters
        </button>
      </div>

      {/* Backdrop — mobile only, shown while the drawer is open. */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[85%] max-w-sm transform transition-transform duration-300 ease-in-out overflow-y-auto ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        } md:static md:z-auto md:w-72 md:flex-shrink-0 md:max-w-none md:translate-x-0 md:transition-none md:overflow-visible`}
      >
        <div className="bg-white rounded-xl md:shadow-sm md:border md:border-gray-100 p-6 md:sticky md:top-20 min-h-full md:min-h-0">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 text-[#1a6b32] font-bold">
              <SlidersHorizontal size={18} />
              Filters
            </div>
            <div className="flex items-center gap-4">
              <button onClick={clearAll} className="text-xs text-[#1a6b32] font-semibold">
                Clear All
              </button>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="md:hidden text-gray-400 hover:text-gray-600"
                aria-label="Close filters"
              >
                <i className="fa-solid fa-xmark text-lg" />
              </button>
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
    </>
  );
}