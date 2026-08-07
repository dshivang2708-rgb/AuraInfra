// Run this once after applying the SQL migrations, to migrate the site's
// existing hardcoded property data into Supabase, so nothing regresses when
// the frontend switches over to fetching from the API.
//
// Usage:  cd server && node scripts/seed.js
//
// Safe to re-run — uses upsert on (category, slug), so re-running just
// updates existing rows instead of duplicating them.

import dotenv from "dotenv";
dotenv.config();

import { supabaseAdmin } from "../src/config/supabaseAdmin.js";
import { RESIDENTIAL_PROPERTIES } from "../../src/data/residentialProperties.js";
import { COMMERCIAL_PROPERTIES } from "../../src/data/commercialProperties.js";
import { AGRICULTURE_PROPERTIES } from "../../src/data/agricultureProperties.js";
import { PROJECTS as PREMIUM_PROJECTS } from "../../src/data/premiumProjects.js";

function extractSector(location) {
  const match = location?.match(/Sector\s*\d+[A-Za-z]?/i);
  return match ? match[0] : null;
}

function toResidentialRow(p) {
  return {
    category: "residential",
    slug: p.key,
    name: p.name,
    tagline: p.tagline,
    badge: p.badge,
    location: p.location,
    sector: extractSector(p.location),
    price_display: p.price,
    price_range: p.priceRange,
    area_display: p.area,
    possession: p.possession,
    description: p.description,
    main_image: p.image,
    tags: p.tags ?? [],
    details: {
      beds: p.beds,
      totalArea: p.totalArea,
      totalUnits: p.totalUnits,
      configurations: p.configurations,
      overviewSummary: p.overviewSummary,
      floorPlans: p.floorPlans ?? [],
    },
  };
}

function toCommercialRow(p) {
  return {
    category: "commercial",
    slug: p.key,
    name: p.name,
    tagline: p.tagline,
    badge: p.badge,
    location: p.location,
    sector: extractSector(p.location),
    price_display: p.priceRange,
    price_range: p.priceRange,
    area_display: p.area,
    possession: p.possession,
    description: p.description,
    main_image: p.image,
    tags: p.tags ?? [],
    details: {
      type: p.type,
      totalArea: p.totalArea,
      totalUnits: p.totalUnits,
      configurations: p.configurations,
      overviewSummary: p.overviewSummary,
      floorPlans: p.floorPlans ?? [],
      whyInvest: p.whyInvest ?? [],
      priceNote: p.priceNote,
    },
  };
}

function toAgricultureRow(p) {
  return {
    category: "agriculture",
    slug: p.key,
    name: p.name,
    tagline: p.tagline,
    badge: p.badge,
    location: p.location,
    sector: extractSector(p.location),
    price_display: p.price,
    price_range: p.priceRange,
    area_display: p.area,
    possession: p.possession,
    description: p.description,
    main_image: p.image,
    tags: p.tags ?? [],
    details: {
      soilType: p.soilType,
      areaOptions: p.areaOptions ?? [],
      nearby: p.nearby ?? [],
      whyInvest: p.whyInvest ?? [],
      priceNote: p.priceNote,
    },
  };
}

function toPremiumRow(p) {
  return {
    category: "premium",
    slug: p.key,
    name: p.name,
    tagline: null,
    badge: "Premium",
    location: p.location,
    sector: extractSector(p.location),
    price_display: p.price,
    price_range: p.price,
    area_display: null,
    possession: null,
    description: null,
    main_image: p.image,
    tags: p.tags ?? [],
    details: {
      builder: p.builder,
    },
  };
}

async function seed() {
  const rows = [
    ...RESIDENTIAL_PROPERTIES.map(toResidentialRow),
    ...COMMERCIAL_PROPERTIES.map(toCommercialRow),
    ...AGRICULTURE_PROPERTIES.map(toAgricultureRow),
    ...PREMIUM_PROJECTS.map(toPremiumRow),
  ];

  console.log(`Seeding ${rows.length} projects...`);

  const { data, error } = await supabaseAdmin
    .from("projects")
    .upsert(rows, { onConflict: "category,slug" })
    .select("category, slug, name");

  if (error) {
    console.error("Seed failed:", error.message);
    process.exit(1);
  }

  console.log(`Done. Upserted ${data.length} rows:`);
  for (const row of data) {
    console.log(`  [${row.category}] ${row.slug} — ${row.name}`);
  }
}

seed();