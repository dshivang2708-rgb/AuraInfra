import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import Navbar from "./Navbar.jsx";
import { useCities, useSectors, CATEGORY_ROUTES, CATEGORY_LABELS, parseSearchTerm, cleanSearch } from "../lib/locationFilter.js";

const BG_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBAgN-oe97vQhwhideQkshxExcI8nrtA0Fly2luNLLh9BTQeGmwdh3tpm2WpRNcOH3lI5CH9_fjs27UIXzz7V3oRvUesTuUaNmc6ToDOeTMjWRlE_b0qb2OcsEoruLN5QkxapqV_q-2TVgHvTq_wcL0XrngMEuB9260G8vbd1m2CNHq45boHb9mULK89XzPZJGy6W9Ndz4PR7PIXP0L4G4vPnAOOmd31BvxelHBwMXC8T-Vl6kHrBArOeiMlW54B7KQYyQ";


const LocationIcon = () => (
  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
    <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
  </svg>
);

const CategoryIcon = () => (
  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);

const PropertyTypeIcon = () => (
  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);

const SearchIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
  </svg>
);

const POPULAR_SEARCHES = [
  "Sector 82 Mohali",
  "Aerocity Mohali",
  "Zirakpur",
  "Chandigarh",
  "Kharar",
];

const BUDGET_OPTIONS = [
  { label: "10 Lakh - 50 Lakh", minPrice: "10", maxPrice: "50" },
  { label: "50 Lakh - 1 Cr", minPrice: "50", maxPrice: "100" },
  { label: "More than 1 Cr", minPrice: "100", maxPrice: undefined },
];

export default function HeroSection() {
  const navigate = useNavigate();
  const cities = useCities();
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("residential");
  const [sector, setSector] = useState("");
  const [budget, setBudget] = useState("");
  const sectors = useSectors(city);

  function handleCityChange(e) {
    setCity(e.target.value);
    setSector(""); // reset sector when the city changes — sectors are scoped to a city
  }

  function runSearch(overrides = {}) {
    const nextCategory = overrides.category ?? category;
    const nextCity = overrides.city ?? city;
    const nextSector = overrides.sector ?? sector;
    const nextBudget = overrides.budget ?? budget;
    const budgetRange = BUDGET_OPTIONS.find((b) => b.label === nextBudget);

    navigate({
      to: CATEGORY_ROUTES[nextCategory] || CATEGORY_ROUTES.residential,
      search: cleanSearch({
        city: nextCity,
        sector: nextSector,
        minPrice: budgetRange?.minPrice,
        maxPrice: budgetRange?.maxPrice,
      }),
    });
  }

  function handlePopularSearch(term) {
    const { city: parsedCity, sector: parsedSector } = parseSearchTerm(term, cities);
    setCity(parsedCity || "");
    setSector(parsedSector || "");
    runSearch({ city: parsedCity, sector: parsedSector, category: "residential" });
  }

  return (
    <section className="relative w-full h-screen flex flex-col overflow-hidden font-sans">
      {/* Background image */}
      <div className="absolute inset-0 z-0 bg-[#0D2137]">
        <img
          alt="Modern Luxury Property"
          className="w-full h-full object-cover object-top"
          src={`${BG_IMAGE}=s1920`}
        />
      </div>

      <Navbar />

      {/* Hero content */}
      <main className="relative z-10 flex-grow flex flex-col justify-center px-6 md:px-12 max-w-7xl mx-auto w-full pb-4 md:pb-6 pt-0 min-h-0">
        <div className="max-w-2xl">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-brand-navy leading-tight">
            Find Your Perfect <br />
            <span className="text-brand-green">Property</span> in Minutes
          </h1>
          <p className="mt-3 text-base md:text-lg text-gray-700 font-medium max-w-lg">
            Search thousands of verified plots, flats, houses and agricultural land across India.
          </p>
        </div>

        {/* Search bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            runSearch();
          }}
          className="mt-16 bg-white rounded-2xl shadow-2xl p-3 md:p-2 flex flex-col md:flex-row items-stretch md:items-center space-y-3 md:space-y-0 md:space-x-2 w-full max-w-5xl border border-gray-100"
        >
          <div className="flex-1 px-4 py-2 md:border-r border-gray-100 flex items-center space-x-3">
            <LocationIcon />
            <div className="flex flex-col w-full">
              <span className="text-xs text-gray-400">City</span>
              <select
                value={city}
                onChange={handleCityChange}
                className="bg-transparent border-none p-0 text-sm font-bold text-gray-800 focus:ring-0 cursor-pointer"
              >
                <option value="">All Cities</option>
                {cities.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex-1 px-4 py-2 md:border-r border-gray-100 flex items-center space-x-3">
            <CategoryIcon />
            <div className="flex flex-col w-full">
              <span className="text-xs text-gray-400">Category</span>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-transparent border-none p-0 text-sm font-bold text-gray-800 focus:ring-0 cursor-pointer"
              >
                {Object.keys(CATEGORY_ROUTES).map((key) => (
                  <option key={key} value={key}>
                    {CATEGORY_LABELS[key]}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex-1 px-4 py-2 md:border-r border-gray-100 flex items-center space-x-3">
            <PropertyTypeIcon />
            <div className="flex flex-col w-full">
              <span className="text-xs text-gray-400">Sector</span>
              <select
                value={sector}
                onChange={(e) => setSector(e.target.value)}
                disabled={sectors.length === 0}
                className="bg-transparent border-none p-0 text-sm font-bold text-gray-800 focus:ring-0 cursor-pointer disabled:cursor-not-allowed disabled:text-gray-400"
              >
                <option value="">All Sectors</option>
                {sectors.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex-1 px-4 py-2 flex items-center space-x-3">
            <div className="flex flex-col w-full">
              <span className="text-xs text-gray-400">Budget</span>
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="bg-transparent border-none p-0 text-sm font-bold text-gray-800 focus:ring-0 cursor-pointer"
              >
                <option value="">Any Budget</option>
                {BUDGET_OPTIONS.map((option) => (
                  <option key={option.label} value={option.label}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="bg-brand-green hover:bg-brand-green-dark text-white px-8 py-3 rounded-xl flex items-center justify-center space-x-2 transition-colors"
          >
            <SearchIcon />
            <span className="font-bold">Search</span>
          </button>
        </form>

        {/* Popular searches */}
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <span className="text-white font-semibold">Popular Searches:</span>
          {POPULAR_SEARCHES.map((term) => (
            <button
              key={term}
              type="button"
              onClick={() => handlePopularSearch(term)}
              className="px-4 py-1.5 bg-white/30 backdrop-blur-md rounded-lg text-white text-sm font-medium hover:bg-white/50 transition-all"
            >
              {term}
            </button>
          ))}
        </div>
      </main>
    </section>
  );
}