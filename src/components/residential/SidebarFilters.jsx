import { useEffect, useState } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useCities, useSectors, cleanSearch } from "../../lib/locationFilter.js";
import { parseListParam } from "../../lib/propertyFilters.js";
const BHK_OPTIONS = ["1 BHK", "2 BHK", "3 BHK", "4 BHK", "5+ BHK"];
const POSSESSION_OPTIONS = ["Ready to Move", "Under Construction", "New Launch"];

function draftFromSearch(search) {
  return {
    city: search.city || "",
    sector: search.sector || "",
    bhk: parseListParam(search.bhk),
    possession: parseListParam(search.possession),
    minPrice: search.minPrice || "",
    maxPrice: search.maxPrice || "",
  };
}

export default function SidebarFilters() {
  const navigate = useNavigate();
  const search = useSearch({ strict: false });

  // Controls the slide-in drawer on small screens. Desktop (lg+) ignores
  // this entirely and always shows the sidebar in place.
  const [mobileOpen, setMobileOpen] = useState(false);

  // These filters are staged locally and only pushed into the URL (which is
  // what PropertyGrid actually reads from) when "Apply Filters" is clicked.
  const [draft, setDraft] = useState(() => draftFromSearch(search));

  useEffect(() => {
    setDraft(draftFromSearch(search));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search.city, search.sector, search.bhk, search.possession, search.minPrice, search.maxPrice]);

  const cities = useCities();
  const sectors = useSectors(draft.city);

  const appliedDraft = draftFromSearch(search);
  const isDirty =
    draft.city !== appliedDraft.city ||
    draft.sector !== appliedDraft.sector ||
    draft.bhk.join(",") !== appliedDraft.bhk.join(",") ||
    draft.possession.join(",") !== appliedDraft.possession.join(",") ||
    draft.minPrice !== appliedDraft.minPrice ||
    draft.maxPrice !== appliedDraft.maxPrice;

  function updateDraft(next) {
    setDraft((d) => ({ ...d, ...next }));
  }

  function handleCityChange(e) {
    updateDraft({ city: e.target.value, sector: "" });
  }

  function handleSectorChange(e) {
    updateDraft({ sector: e.target.value });
  }

  function toggleBhk(option) {
    const next = draft.bhk.includes(option) ? draft.bhk.filter((b) => b !== option) : [...draft.bhk, option];
    updateDraft({ bhk: next });
  }

  function togglePossession(option) {
    const next = draft.possession.includes(option)
      ? draft.possession.filter((p) => p !== option)
      : [...draft.possession, option];
    updateDraft({ possession: next });
  }

  function applyFilters() {
    navigate({
      to: "/properties/residential",
      search: cleanSearch({
        ...search,
        city: draft.city,
        sector: draft.sector,
        bhk: draft.bhk.join(",") || undefined,
        possession: draft.possession.join(",") || undefined,
        minPrice: draft.minPrice || undefined,
        maxPrice: draft.maxPrice || undefined,
      }),
      replace: true,
    });
    setMobileOpen(false);
  }

  function clearAll() {
    setDraft({ city: "", sector: "", bhk: [], possession: [], minPrice: "", maxPrice: "" });
    navigate({
      to: "/properties/residential",
      search: cleanSearch({
        ...search,
        city: "",
        sector: "",
        bhk: undefined,
        possession: undefined,
        minPrice: undefined,
        maxPrice: undefined,
      }),
      replace: true,
    });
  }

  return (
    <>
      {/* Mobile trigger — the sidebar below is hidden by default on small
          screens and only slides in once this is tapped. */}
      <div className="lg:hidden mb-4">
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="w-full flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 font-bold text-sm py-3 rounded-lg shadow-sm"
        >
          <i className="fa-solid fa-filter" /> Filters
        </button>
      </div>

      {/* Backdrop — mobile only, shown while the drawer is open. */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[85%] max-w-sm transform transition-transform duration-300 ease-in-out overflow-y-auto ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        } lg:static lg:z-auto lg:w-72 lg:flex-shrink-0 lg:max-w-none lg:translate-x-0 lg:transition-none lg:overflow-visible`}
      >
        <div className="bg-white p-5 rounded-lg lg:border lg:border-gray-200 lg:sticky lg:top-32 min-h-full lg:min-h-0">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-bold text-lg">Filter Properties</h2>
            <div className="flex items-center gap-4">
              <button onClick={clearAll} className="text-[#1a6b32] text-xs font-semibold uppercase">
                Clear All
              </button>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="lg:hidden text-gray-400 hover:text-gray-600"
                aria-label="Close filters"
              >
                <i className="fa-solid fa-xmark text-lg" />
              </button>
            </div>
          </div>

        {/* City Filter */}
        <div className="mb-6">
          <label className="block text-xs font-bold text-gray-700 uppercase mb-2">
            <i className="fa-solid fa-location-dot mr-1" /> City
          </label>
          <select
            value={draft.city}
            onChange={handleCityChange}
            className="w-full border-gray-200 rounded-md text-sm focus:ring-[#1a6b32] focus:border-[#1a6b32]"
          >
            <option value="">All Cities</option>
            {cities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Sector Filter — scoped to the selected city */}
        <div className="mb-6">
          <label className="block text-xs font-bold text-gray-700 uppercase mb-2">
            <i className="fa-solid fa-map-pin mr-1" /> Sector
          </label>
          <select
            value={draft.sector}
            onChange={handleSectorChange}
            disabled={sectors.length === 0}
            className="w-full border-gray-200 rounded-md text-sm focus:ring-[#1a6b32] focus:border-[#1a6b32] disabled:bg-gray-50 disabled:text-gray-400"
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
        <div className="mb-6">
          <label className="block text-xs font-bold text-gray-700 uppercase mb-2">
            <i className="fa-solid fa-wallet mr-1" /> Price Range (₹ Lakh)
          </label>
          <div className="flex gap-3">
            <input
              type="number"
              min="0"
              value={draft.minPrice}
              onChange={(e) => updateDraft({ minPrice: e.target.value })}
              placeholder="Min"
              className="w-full border-gray-200 rounded-md text-sm focus:ring-[#1a6b32] focus:border-[#1a6b32]"
            />
            <input
              type="number"
              min="0"
              value={draft.maxPrice}
              onChange={(e) => updateDraft({ maxPrice: e.target.value })}
              placeholder="Max"
              className="w-full border-gray-200 rounded-md text-sm focus:ring-[#1a6b32] focus:border-[#1a6b32]"
            />
          </div>
          <div className="flex justify-between mt-2 text-[10px] font-bold text-gray-500">
            <span>₹ 10 Lakh</span>
            <span>₹ 5 Cr+ (500 Lakh)</span>
          </div>
        </div>

        {/* BHK Filter */}
        <div className="mb-6">
          <label className="block text-xs font-bold text-gray-700 uppercase mb-2">BHK</label>
          <div className="grid grid-cols-4 gap-1">
            {BHK_OPTIONS.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => toggleBhk(option)}
                className={`border py-2 rounded text-xs transition ${
                  draft.bhk.includes(option)
                    ? "bg-[#1a6b32] text-white border-[#1a6b32]"
                    : "border-gray-200 hover:bg-[#1a6b32] hover:text-white"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {/* Possession Status */}
        <div className="mb-6">
          <label className="block text-xs font-bold text-gray-700 uppercase mb-2">
            <i className="fa-solid fa-key mr-1" /> Possession Status
          </label>
          <div className="space-y-2">
            {POSSESSION_OPTIONS.map((status) => (
              <label key={status} className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={draft.possession.includes(status)}
                  onChange={() => togglePossession(status)}
                  className="rounded border-gray-300 text-[#1a6b32] focus:ring-[#1a6b32]"
                />
                {status}
              </label>
            ))}
          </div>
        </div>

        {/* Apply — filters above are staged locally and only take effect
            against the results once this is clicked. */}
        <button
          type="button"
          onClick={applyFilters}
          className={`w-full text-white text-sm font-bold py-2.5 rounded-md mb-2 flex items-center justify-center gap-2 transition-colors ${
            isDirty ? "bg-[#1a6b32] hover:bg-[#145528]" : "bg-[#1a6b32]/70"
          }`}
        >
          <i className="fa-solid fa-filter" /> Apply Filters
        </button>

        <button
          onClick={clearAll}
          className="w-full text-gray-500 text-xs font-bold py-1 flex items-center justify-center gap-2"
        >
          <i className="fa-solid fa-rotate-left" /> Reset All
        </button>
      </div>
      </aside>
    </>
  );
}