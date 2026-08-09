import { useEffect, useMemo, useState } from "react";
import { Link, useSearch } from "@tanstack/react-router";
import { api } from "../../lib/api.js";
import { toPremiumCard } from "../../lib/adapters.js";
import { priceToLakh, withinRange, looselyMatches } from "../../lib/propertyFilters.js";

function ProjectCard({ project }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow group">
      <div className="relative h-56">
        <img alt={project.name} className="w-full h-full object-cover" src={project.image} />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-2 py-1 rounded shadow-sm">
          <span className="text-[10px] font-bold text-slate-700">{project.builder}</span>
        </div>
        <div className="absolute top-4 right-4 flex gap-2">
          <span className="bg-green-600 text-white text-[10px] font-bold px-2 py-1 rounded">Premium Project</span>
          <button
            className="bg-white/80 p-1.5 rounded-full text-slate-600 hover:text-red-500 transition-colors"
            aria-label="Save project"
          >
            <span className="material-symbols-outlined text-base block">favorite</span>
          </button>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold mb-1">{project.name}</h3>
        <p className="text-xs text-slate-400 mb-4 flex items-center gap-1">
          <span className="material-symbols-outlined text-sm">location_on</span>
          {project.location}
        </p>
        <div className="grid grid-cols-2 gap-y-2 mb-6">
          {project.tags.map((tag) => (
            <div key={tag} className="text-[11px] flex items-center gap-1.5 text-slate-600">
              {tag}
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center pt-4 border-t border-slate-50">
          <div>
            <p className="text-[10px] text-slate-400 uppercase font-bold">Starting at</p>
            <p className="text-lg font-bold text-green-700">{project.price}</p>
          </div>
          <Link
            to="/properties/premium-projects/$slug"
            params={{ slug: project.key }}
            className="text-xs font-bold text-slate-500 hover:text-green-700 flex items-center gap-1 group-hover:translate-x-1 transition-transform"
          >
            View Project
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.key} project={project} />
        ))}
      </div>
    </>
  );
}