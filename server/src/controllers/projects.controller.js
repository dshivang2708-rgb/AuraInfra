import { supabaseAdmin } from "../config/supabaseAdmin.js";

const VALID_CATEGORIES = ["residential", "commercial", "agriculture", "premium"];

function isValidCategory(category) {
  return VALID_CATEGORIES.includes(category);
}

// ---------- Public (no auth required) ----------

export async function listPublicProjects(req, res) {
  const { category, sector } = req.query;

  let query = supabaseAdmin.from("projects").select("*").eq("is_published", true);

  if (category) {
    if (!isValidCategory(category)) {
      return res.status(400).json({ error: `Invalid category. Must be one of: ${VALID_CATEGORIES.join(", ")}` });
    }
    query = query.eq("category", category);
  }
  if (sector) {
    query = query.ilike("sector", `%${sector}%`);
  }

  const { data, error } = await query.order("created_at", { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
}

export async function getPublicProject(req, res) {
  const { category, slug } = req.params;
  if (!isValidCategory(category)) {
    return res.status(400).json({ error: `Invalid category. Must be one of: ${VALID_CATEGORIES.join(", ")}` });
  }

  const { data, error } = await supabaseAdmin
    .from("projects")
    .select("*")
    .eq("category", category)
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (error || !data) return res.status(404).json({ error: "Project not found" });
  res.json(data);
}

// Returns all distinct sectors that have at least one published project —
// powers the location filter dropdown on the homepage hero.
export async function listSectors(req, res) {
  const { data, error } = await supabaseAdmin
    .from("projects")
    .select("sector")
    .eq("is_published", true)
    .not("sector", "is", null);

  if (error) return res.status(500).json({ error: error.message });
  const sectors = [...new Set(data.map((row) => row.sector).filter(Boolean))].sort();
  res.json(sectors);
}

// ---------- Admin (requireAdmin middleware runs before all of these) ----------

export async function listAdminProjects(req, res) {
  const { category } = req.query;

  let query = supabaseAdmin.from("projects").select("*");
  if (category) {
    if (!isValidCategory(category)) {
      return res.status(400).json({ error: `Invalid category. Must be one of: ${VALID_CATEGORIES.join(", ")}` });
    }
    query = query.eq("category", category);
  }

  const { data, error } = await query.order("created_at", { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
}

export async function getAdminProject(req, res) {
  const { id } = req.params;
  const { data, error } = await supabaseAdmin.from("projects").select("*").eq("id", id).single();
  if (error || !data) return res.status(404).json({ error: "Project not found" });
  res.json(data);
}

export async function createProject(req, res) {
  const body = req.body;

  if (!body.category || !isValidCategory(body.category)) {
    return res.status(400).json({ error: `category is required and must be one of: ${VALID_CATEGORIES.join(", ")}` });
  }
  if (!body.name || !body.slug || !body.location) {
    return res.status(400).json({ error: "name, slug, and location are required" });
  }

  const { data, error } = await supabaseAdmin
    .from("projects")
    .insert({
      category: body.category,
      slug: body.slug,
      name: body.name,
      tagline: body.tagline ?? null,
      badge: body.badge ?? null,
      location: body.location,
      city: body.city ?? null,
      sector: body.sector ?? null,
      price_display: body.price_display ?? null,
      price_range: body.price_range ?? null,
      area_display: body.area_display ?? null,
      possession: body.possession ?? null,
      description: body.description ?? null,
      main_image: body.main_image ?? null,
      gallery_images: body.gallery_images ?? [],
      tags: body.tags ?? [],
      details: body.details ?? {},
      is_published: body.is_published ?? true,
      created_by: req.user.id,
    })
    .select()
    .single();

  if (error) {
    if (error.code === "23505") {
      return res.status(409).json({ error: "A project with this category+slug already exists" });
    }
    return res.status(500).json({ error: error.message });
  }
  res.status(201).json(data);
}

export async function updateProject(req, res) {
  const { id } = req.params;
  const body = req.body;

  if (body.category && !isValidCategory(body.category)) {
    return res.status(400).json({ error: `Invalid category. Must be one of: ${VALID_CATEGORIES.join(", ")}` });
  }

  const updatable = [
    "category", "slug", "name", "tagline", "badge", "location", "city", "sector",
    "price_display", "price_range", "area_display", "possession", "description",
    "main_image", "gallery_images", "tags", "details", "is_published",
  ];
  const updates = {};
  for (const key of updatable) {
    if (key in body) updates[key] = body[key];
  }

  const { data, error } = await supabaseAdmin.from("projects").update(updates).eq("id", id).select().single();

  if (error) {
    if (error.code === "23505") {
      return res.status(409).json({ error: "A project with this category+slug already exists" });
    }
    return res.status(500).json({ error: error.message });
  }
  if (!data) return res.status(404).json({ error: "Project not found" });
  res.json(data);
}

export async function deleteProject(req, res) {
  const { id } = req.params;
  const { error } = await supabaseAdmin.from("projects").delete().eq("id", id);
  if (error) return res.status(500).json({ error: error.message });
  res.status(204).send();
}