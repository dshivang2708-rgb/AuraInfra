import { useEffect, useState } from "react";
import { api } from "./api.js";

// Maps a category key to the listing page route it lives on.
export const CATEGORY_ROUTES = {
  residential: "/properties/residential",
  commercial: "/properties/commercial",
  agriculture: "/properties/agriculture",
  premium: "/properties/premium-projects",
};

export const CATEGORY_LABELS = {
  residential: "Residential",
  commercial: "Commercial",
  agriculture: "Agriculture",
  premium: "Premium Projects",
};

// Fetches the list of cities that currently have published projects.
export function useCities() {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    let active = true;
    api
      .listCities()
      .then((data) => active && setCities(data))
      .catch(() => active && setCities([]));
    return () => {
      active = false;
    };
  }, []);

  return cities;
}

// Fetches sectors, optionally scoped to a single city ("sector level in a
// city"). Re-fetches whenever `city` changes.
export function useSectors(city) {
  const [sectors, setSectors] = useState([]);

  useEffect(() => {
    let active = true;
    api
      .listSectors(city ? { city } : {})
      .then((data) => active && setSectors(data))
      .catch(() => active && setSectors([]));
    return () => {
      active = false;
    };
  }, [city]);

  return sectors;
}

// Turns a free-text search term like "Sector 82 Mohali" or "Zirakpur" into
// { city, sector } by matching against the known list of cities. Whatever's
// left over after removing the city name is treated as the sector.
export function parseSearchTerm(term, knownCities) {
  const match = knownCities.find((c) => term.toLowerCase().includes(c.toLowerCase()));
  if (!match) return { city: null, sector: null };

  const remainder = term
    .replace(new RegExp(match, "i"), "")
    .replace(/,/g, "")
    .trim();

  return { city: match, sector: remainder || null };
}

// Strips undefined/empty values so they don't show up as ?city=&sector= in
// the URL.
export function cleanSearch(search) {
  const cleaned = {};
  for (const [key, value] of Object.entries(search)) {
    if (value !== undefined && value !== null && value !== "") cleaned[key] = value;
  }
  return cleaned;
}
