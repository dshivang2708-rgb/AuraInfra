import { useEffect, useMemo, useState } from "react";
import { Link, useSearch } from "@tanstack/react-router";
import { MapPin, Building2, ArrowRight } from "lucide-react";
import { api } from "../../lib/api.js";
import { toPremiumCard } from "../../lib/adapters.js";
import { priceToLakh, withinRange, looselyMatches } from "../../lib/propertyFilters.js";

function ProjectCard({ project }) {
  return (
    <div className="property-card bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-32 overflow-hidden">
        <img alt={project.name} className="w-full h-full object-cover" src={project.image} />
        <span className="absolute top-3 left-3 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide shadow-sm bg-[#1a6b32] text-white">
          Premium Project
        </span>
      </div>

      <div className="px-4 pt-3 pb-3">
        {project.builder && (
          <span className="inline-flex items-center gap-1 text-[10px] text-[#1a6b32] font-bold uppercase tracking-wider bg-[#eaf4ef] px-2 py-0.5 rounded mb-2">
            <Building2 size={11} /> {project.builder}
          </span>
        )}
        <h4 className="font-extrabold text-xl text-gray-900 mb-1.5">{project.name}</h4>

        <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
          <span className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
            <MapPin size={13} className="text-[#1a6b32]" />
          </span>
          {project.location}
        </div>

        {project.tags?.length > 0 && (
          <div className="flex items-center gap-1.5 mb-3">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="bg-gray-100 text-gray-700 text-[10px] font-semibold rounded-full px-2 py-1 min-w-0 truncate"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="border-t border-gray-100 pt-3 flex justify-between items-center gap-3">
          <div className="min-w-0">
            <p className="text-[9px] text-gray-400 uppercase font-bold tracking-wide">Starting at</p>
            <span className="text-[#1a6b32] font-extrabold text-sm">{project.price}</span>
          </div>
          <Link
            to="/properties/premium-projects/$slug"
            params={{ slug: project.key }}
            className="flex items-center gap-1.5 whitespace-nowrap flex-shrink-0 bg-[#1a6b32] hover:bg-[#145528] text-white text-xs font-bold px-4 py-2.5 rounded-full transition-colors"
          >
            View Details <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ProjectGrid() {
  const [gridView, setGridView] = useState(true);
  const [rawProjects, setRawProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const search = useSearch({ strict: false });
  const city = search.city || "";
  const sector = search.sector || "";
  const minPrice = search.minPrice ? Number(search.minPrice) : null;
  const maxPrice = search.maxPrice ? Number(search.maxPrice) : null;
  const status = search.status || "";
  const builder = search.builder || "";

  useEffect(() => {
    let active = true;
    setLoading(true);
    api
      .listProjects({ category: "premium", ...(city && { city }), ...(sector && { sector }) })
      .then((rows) => active && setRawProjects(rows.map(toPremiumCard)))
      .catch((err) => active && setError(err.message))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, [city, sector]);

  // Budget/status/builder are applied client-side once "Search" is clicked
  // on the hero bar (mirrors how category filtering works on the Upcoming
  // Projects page) — city/sector are the only params narrowed server-side.
  const projects = useMemo(() => {
    return rawProjects.filter((p) => {
      const priceLakh = priceToLakh(p.priceRange) ?? priceToLakh(p.price);
      if (!withinRange(priceLakh, minPrice, maxPrice)) return false;
      if (status && !looselyMatches(p.possession, status)) return false;
      if (builder && !looselyMatches(p.builder, builder)) return false;
      return true;
    });
  }, [rawProjects, minPrice, maxPrice, status, builder]);

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <p className="text-sm font-medium text-slate-500">
          {loading
            ? "Loading..."
            : `Showing ${projects.length} Premium Projects${sector ? ` in ${sector}` : city ? ` in ${city}` : ""}`}
        </p>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-500">Sort by:</span>
            <select className="border-slate-200 rounded-lg text-sm font-semibold focus:ring-green-500">
              <option>Newest First</option>
            </select>
          </div>
          <div className="flex border border-slate-200 rounded-lg overflow-hidden">
            <button
              className={`p-2 ${gridView ? "bg-slate-100 text-green-700" : "text-slate-400 hover:text-slate-600"}`}
              onClick={() => setGridView(true)}
              aria-label="Grid view"
            >
              <span className="material-symbols-outlined text-lg block">grid_view</span>
            </button>
            <button
              className={`p-2 ${!gridView ? "bg-slate-100 text-green-700" : "text-slate-400 hover:text-slate-600"}`}
              onClick={() => setGridView(false)}
              aria-label="List view"
            >
              <span className="material-symbols-outlined text-lg block">view_list</span>
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-4">
          Couldn't load projects: {error}
        </div>
      )}

      {!loading && !error && projects.length === 0 && (
        <div className="bg-white border border-slate-100 rounded-xl p-10 text-center text-sm text-slate-500 mb-4">
          No premium projects found{sector ? ` in ${sector}` : city ? ` in ${city}` : ""}.
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.key} project={project} />
        ))}
      </div>
    </>
  );
}