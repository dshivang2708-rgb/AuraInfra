import { useState } from "react";
import { api } from "../../../lib/api.js";
import HighlightsEditor from "../../../components/admin/HighlightsEditor.jsx";
import { HIGHLIGHT_PRESETS } from "../../../lib/highlightPresets.js";

const CATEGORY = "premium";

const DEFAULT_FLOOR_PLANS = () => [
  { type: "3 BHK", area: "", image: "" },
  { type: "4 BHK", area: "", image: "" },
];

const DEFAULT_AMENITIES = () => [{ icon: "pool", label: "" }];

const emptyForm = {
  category: CATEGORY,
  slug: "",
  name: "",
  tagline: "",
  badge: "",
  builder: "",
  propertyType: "",
  location: "",
  city: "",
  sector: "",
  price_display: "",
  price_range: "",
  priceNote: "",
  area_display: "",
  possession: "",
  totalArea: "",
  totalUnits: "",
  configurations: "",
  overviewSummary: "",
  description: "",
  main_image: "",
  gallery_images: [],
  tagsText: "",
  notes: "",
  brochureUrl: "",
  faqs: [],
  whyInvest: [],
  amenities: DEFAULT_AMENITIES(),
  floorPlans: DEFAULT_FLOOR_PLANS(),
  highlights: [],
  is_published: true,
  is_featured: false,
  is_upcoming: false,
};

export default function PremiumProjectForm({ project, onSaved, onCancel }) {
  const [form, setForm] = useState(() => {
    if (!project) return emptyForm;
    const d = project.details || {};
    return {
      ...emptyForm,
      ...project,
      category: CATEGORY,
      tagsText: Array.isArray(project.tags)
        ? project.tags.map((t) => (typeof t === "string" ? t : t.label)).join(", ")
        : "",
      notes: d.notes != null ? String(d.notes) : "",
      builder: d.builder != null ? String(d.builder) : "",
      propertyType: d.propertyType != null ? String(d.propertyType) : "",
      priceNote: d.priceNote != null ? String(d.priceNote) : "",
      totalArea: d.totalArea != null ? String(d.totalArea) : "",
      totalUnits: d.totalUnits != null ? String(d.totalUnits) : "",
      configurations: d.configurations != null ? String(d.configurations) : "",
      overviewSummary: d.overviewSummary != null ? String(d.overviewSummary) : "",
      brochureUrl: d.brochureUrl || "",
      faqs: Array.isArray(d.faqs) && d.faqs.length ? d.faqs : [],
      whyInvest: Array.isArray(d.whyInvest) && d.whyInvest.length ? d.whyInvest : [],
      amenities: Array.isArray(d.amenities) && d.amenities.length ? d.amenities : DEFAULT_AMENITIES(),
      floorPlans: Array.isArray(d.floorPlans) && d.floorPlans.length ? d.floorPlans : DEFAULT_FLOOR_PLANS(),
      highlights: Array.isArray(d.highlights) ? d.highlights : [],
    };
  });
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const handleMainImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const { url } = await api.adminUploadImage(file);
      update("main_image", url);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleGalleryUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setUploading(true);
    setError("");
    try {
      const uploaded = [];
      for (const file of files) {
        const { url } = await api.adminUploadImage(file);
        uploaded.push(url);
      }
      update("gallery_images", [...form.gallery_images, ...uploaded]);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  const removeGalleryImage = (url) => {
    update("gallery_images", form.gallery_images.filter((g) => g !== url));
  };

  const handleBrochureUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== "application/pdf") {
      setError("Brochure must be a PDF file.");
      return;
    }
    setUploading(true);
    setError("");
    try {
      const { url } = await api.adminUploadFile(file);
      update("brochureUrl", url);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  // ---- Floor plans (uploaded one unit type at a time) ----

  const updateFloorPlan = (index, key, value) => {
    setForm((f) => {
      const next = [...f.floorPlans];
      next[index] = { ...next[index], [key]: value };
      return { ...f, floorPlans: next };
    });
  };

  const handleFloorPlanImageUpload = async (index, e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const { url } = await api.adminUploadImage(file);
      updateFloorPlan(index, "image", url);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  const addFloorPlanRow = () => {
    setForm((f) => ({ ...f, floorPlans: [...f.floorPlans, { type: "", area: "", image: "" }] }));
  };

  const removeFloorPlanRow = (index) => {
    setForm((f) => ({ ...f, floorPlans: f.floorPlans.filter((_, i) => i !== index) }));
  };

  // ---- Why Invest points ----

  const updateWhyInvest = (index, value) => {
    setForm((f) => {
      const next = [...f.whyInvest];
      next[index] = value;
      return { ...f, whyInvest: next };
    });
  };

  const addWhyInvest = () => setForm((f) => ({ ...f, whyInvest: [...f.whyInvest, ""] }));
  const removeWhyInvest = (index) => setForm((f) => ({ ...f, whyInvest: f.whyInvest.filter((_, i) => i !== index) }));

  // ---- Amenities (icon + label) ----

  const updateAmenity = (index, key, value) => {
    setForm((f) => {
      const next = [...f.amenities];
      next[index] = { ...next[index], [key]: value };
      return { ...f, amenities: next };
    });
  };

  const addAmenity = () => setForm((f) => ({ ...f, amenities: [...f.amenities, { icon: "star", label: "" }] }));
  const removeAmenity = (index) => setForm((f) => ({ ...f, amenities: f.amenities.filter((_, i) => i !== index) }));

  // ---- FAQs ----

  const updateFaq = (index, key, value) => {
    setForm((f) => {
      const next = [...f.faqs];
      next[index] = { ...next[index], [key]: value };
      return { ...f, faqs: next };
    });
  };

  const addFaq = () => setForm((f) => ({ ...f, faqs: [...f.faqs, { question: "", answer: "" }] }));
  const removeFaq = (index) => setForm((f) => ({ ...f, faqs: f.faqs.filter((_, i) => i !== index) }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const details = {};
    if (String(form.notes).trim()) details.notes = String(form.notes).trim();
    if (String(form.builder).trim()) details.builder = String(form.builder).trim();
    if (String(form.propertyType).trim()) details.propertyType = String(form.propertyType).trim();
    if (String(form.priceNote).trim()) details.priceNote = String(form.priceNote).trim();
    if (String(form.totalArea).trim()) details.totalArea = String(form.totalArea).trim();
    if (String(form.totalUnits).trim()) details.totalUnits = String(form.totalUnits).trim();
    if (String(form.configurations).trim()) details.configurations = String(form.configurations).trim();
    if (String(form.overviewSummary).trim()) details.overviewSummary = String(form.overviewSummary).trim();
    if (form.brochureUrl) details.brochureUrl = form.brochureUrl;

    const cleanFaqs = form.faqs
      .map((f) => ({ question: String(f.question || "").trim(), answer: String(f.answer || "").trim() }))
      .filter((f) => f.question && f.answer);
    if (cleanFaqs.length) details.faqs = cleanFaqs;

    const cleanWhyInvest = form.whyInvest.map((point) => String(point || "").trim()).filter(Boolean);
    if (cleanWhyInvest.length) details.whyInvest = cleanWhyInvest;

    const cleanAmenities = form.amenities
      .map((a) => ({ icon: String(a.icon || "").trim() || "star", label: String(a.label || "").trim() }))
      .filter((a) => a.label);
    if (cleanAmenities.length) details.amenities = cleanAmenities;

    const cleanFloorPlans = form.floorPlans
      .map((fp) => ({ type: String(fp.type || "").trim(), area: String(fp.area || "").trim(), image: fp.image }))
      .filter((fp) => fp.type && fp.image);
    if (cleanFloorPlans.length) details.floorPlans = cleanFloorPlans;

    const cleanHighlights = form.highlights
      .map((h) => ({ label: String(h.label || "").trim(), icon: h.icon }))
      .filter((h) => h.label);
    if (cleanHighlights.length) details.highlights = cleanHighlights;

    const tags = form.tagsText
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const payload = {
      category: CATEGORY,
      slug: form.slug.trim(),
      name: form.name.trim(),
      tagline: form.tagline || null,
      badge: form.badge || null,
      location: form.location.trim(),
      city: form.city || null,
      sector: form.sector || null,
      price_display: form.price_display || null,
      price_range: form.price_range || null,
      area_display: form.area_display || null,
      possession: form.possession || null,
      description: form.description || null,
      main_image: form.main_image || null,
      gallery_images: form.gallery_images,
      tags,
      details,
      is_published: form.is_published,
      is_featured: form.is_featured,
      is_upcoming: form.is_upcoming,
    };

    setSaving(true);
    try {
      if (project?.id) {
        await api.adminUpdateProject(project.id, payload);
      } else {
        await api.adminCreateProject(payload);
      }
      onSaved();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-[#c5c6cf]/30 p-6 space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">{error}</div>
      )}

      <div>
        <label className="block text-xs font-bold text-[#151c27] mb-1 uppercase">Slug (used in the URL)</label>
        <input
          className="w-full border-[#c5c6cf] rounded-lg text-sm focus:ring-[#1a6b32] focus:border-[#1a6b32]"
          value={form.slug}
          onChange={(e) => update("slug", e.target.value)}
          placeholder="e.g. dlf-the-camellias"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-[#151c27] mb-1 uppercase">Project Name</label>
          <input
            className="w-full border-[#c5c6cf] rounded-lg text-sm focus:ring-[#1a6b32] focus:border-[#1a6b32]"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-[#151c27] mb-1 uppercase">Tagline</label>
          <input
            className="w-full border-[#c5c6cf] rounded-lg text-sm focus:ring-[#1a6b32] focus:border-[#1a6b32]"
            value={form.tagline}
            onChange={(e) => update("tagline", e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-[#151c27] mb-1 uppercase">Builder / Developer</label>
          <input
            className="w-full border-[#c5c6cf] rounded-lg text-sm focus:ring-[#1a6b32] focus:border-[#1a6b32]"
            value={form.builder}
            onChange={(e) => update("builder", e.target.value)}
            placeholder="e.g. DLF"
          />
          <p className="text-[10px] text-[#75777f] mt-1">
            Shown as a badge on the hero image and powers the "Developer" tab. Leave blank to default to "Aura
            Infra".
          </p>
        </div>
        <div>
          <label className="block text-xs font-bold text-[#151c27] mb-1 uppercase">Property Type</label>
          <input
            className="w-full border-[#c5c6cf] rounded-lg text-sm focus:ring-[#1a6b32] focus:border-[#1a6b32]"
            value={form.propertyType}
            onChange={(e) => update("propertyType", e.target.value)}
            placeholder="e.g. Luxury Apartments"
          />
          <p className="text-[10px] text-[#75777f] mt-1">Shown in the Overview tab.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-bold text-[#151c27] mb-1 uppercase">Badge</label>
          <input
            className="w-full border-[#c5c6cf] rounded-lg text-sm focus:ring-[#1a6b32] focus:border-[#1a6b32]"
            value={form.badge}
            onChange={(e) => update("badge", e.target.value)}
            placeholder="e.g. Premium, New Launch"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-[#151c27] mb-1 uppercase">Sector</label>
          <input
            className="w-full border-[#c5c6cf] rounded-lg text-sm focus:ring-[#1a6b32] focus:border-[#1a6b32]"
            value={form.sector}
            onChange={(e) => update("sector", e.target.value)}
            placeholder="e.g. Sector 82"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-[#151c27] mb-1 uppercase">City</label>
          <input
            className="w-full border-[#c5c6cf] rounded-lg text-sm focus:ring-[#1a6b32] focus:border-[#1a6b32]"
            value={form.city}
            onChange={(e) => update("city", e.target.value)}
            placeholder="e.g. Gurugram"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-[#151c27] mb-1 uppercase">Full Location</label>
        <input
          className="w-full border-[#c5c6cf] rounded-lg text-sm focus:ring-[#1a6b32] focus:border-[#1a6b32]"
          value={form.location}
          onChange={(e) => update("location", e.target.value)}
          placeholder="e.g. Golf Course Road, Gurugram"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-bold text-[#151c27] mb-1 uppercase">Price (card display)</label>
          <input
            className="w-full border-[#c5c6cf] rounded-lg text-sm focus:ring-[#1a6b32] focus:border-[#1a6b32]"
            value={form.price_display}
            onChange={(e) => update("price_display", e.target.value)}
            placeholder="₹ 5 Cr"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-[#151c27] mb-1 uppercase">Price Range (detail page)</label>
          <input
            className="w-full border-[#c5c6cf] rounded-lg text-sm focus:ring-[#1a6b32] focus:border-[#1a6b32]"
            value={form.price_range}
            onChange={(e) => update("price_range", e.target.value)}
            placeholder="₹ 5 Cr - ₹ 12 Cr"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-[#151c27] mb-1 uppercase">Area</label>
          <input
            className="w-full border-[#c5c6cf] rounded-lg text-sm focus:ring-[#1a6b32] focus:border-[#1a6b32]"
            value={form.area_display}
            onChange={(e) => update("area_display", e.target.value)}
            placeholder="3200 - 6800 Sq.ft"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-[#151c27] mb-1 uppercase">Price Note</label>
        <input
          className="w-full border-[#c5c6cf] rounded-lg text-sm focus:ring-[#1a6b32] focus:border-[#1a6b32]"
          value={form.priceNote}
          onChange={(e) => update("priceNote", e.target.value)}
          placeholder="e.g. Starting Price"
        />
        <p className="text-[10px] text-[#75777f] mt-1">
          Small caption shown under the price on the detail page's pricing sidebar (defaults to "Starting Price"
          if left blank).
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-[#151c27] mb-1 uppercase">Possession</label>
          <input
            className="w-full border-[#c5c6cf] rounded-lg text-sm focus:ring-[#1a6b32] focus:border-[#1a6b32]"
            value={form.possession}
            onChange={(e) => update("possession", e.target.value)}
            placeholder="Ready to Move / Dec 2026"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-[#151c27] mb-1 uppercase">Tags (comma separated)</label>
          <input
            className="w-full border-[#c5c6cf] rounded-lg text-sm focus:ring-[#1a6b32] focus:border-[#1a6b32]"
            value={form.tagsText}
            onChange={(e) => update("tagsText", e.target.value)}
            placeholder="RERA Approved, Prime Location"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-bold text-[#151c27] mb-1 uppercase">Total Area</label>
          <input
            className="w-full border-[#c5c6cf] rounded-lg text-sm focus:ring-[#1a6b32] focus:border-[#1a6b32]"
            value={form.totalArea}
            onChange={(e) => update("totalArea", e.target.value)}
            placeholder="e.g. 8 Acres"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-[#151c27] mb-1 uppercase">Total Units</label>
          <input
            className="w-full border-[#c5c6cf] rounded-lg text-sm focus:ring-[#1a6b32] focus:border-[#1a6b32]"
            value={form.totalUnits}
            onChange={(e) => update("totalUnits", e.target.value)}
            placeholder="e.g. 400+"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-[#151c27] mb-1 uppercase">Configurations</label>
          <input
            className="w-full border-[#c5c6cf] rounded-lg text-sm focus:ring-[#1a6b32] focus:border-[#1a6b32]"
            value={form.configurations}
            onChange={(e) => update("configurations", e.target.value)}
            placeholder="e.g. 3 BHK, 4 BHK, Penthouses"
          />
        </div>
      </div>
      <p className="text-[10px] text-[#75777f] -mt-3">
        Total Area, Total Units and Configurations power the Project Overview tab and the Configurations stat on
        the hero section.
      </p>

      <div>
        <label className="block text-xs font-bold text-[#151c27] mb-1 uppercase">Overview Summary</label>
        <textarea
          className="w-full border-[#c5c6cf] rounded-lg text-sm focus:ring-[#1a6b32] focus:border-[#1a6b32]"
          rows={3}
          value={form.overviewSummary}
          onChange={(e) => update("overviewSummary", e.target.value)}
          placeholder="A short paragraph shown at the top of the Overview tab"
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-[#151c27] mb-1 uppercase">Description</label>
        <textarea
          className="w-full border-[#c5c6cf] rounded-lg text-sm focus:ring-[#1a6b32] focus:border-[#1a6b32]"
          rows={4}
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
          placeholder="Shown on the project's detail page hero"
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-[#151c27] mb-1 uppercase">Main Image</label>
        <div className="flex items-center gap-4">
          {form.main_image && (
            <img src={form.main_image} alt="" className="w-24 h-24 object-cover rounded-lg border border-[#c5c6cf]" />
          )}
          <label className="cursor-pointer text-sm font-semibold text-[#1a6b32] border border-[#1a6b32] rounded-lg px-4 py-2 hover:bg-[#eaf4ef] transition-colors">
            {uploading ? "Uploading..." : form.main_image ? "Replace Image" : "Upload Image"}
            <input type="file" accept="image/*" className="hidden" onChange={handleMainImageUpload} disabled={uploading} />
          </label>
        </div>
        <p className="text-[10px] text-[#75777f] mt-1">
          Used as the hero image on the detail page and as the fallback image for floor plans without their own
          photo.
        </p>
      </div>

      <div>
        <label className="block text-xs font-bold text-[#151c27] mb-1 uppercase">Project Brochure (PDF)</label>
        <div className="flex items-center gap-4">
          {form.brochureUrl && (
            <a
              href={form.brochureUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-[#1a6b32] border border-[#c5c6cf] rounded-lg px-3 py-2"
            >
              <i className="fa-solid fa-file-pdf" /> View current brochure
            </a>
          )}
          <label className="cursor-pointer text-sm font-semibold text-[#1a6b32] border border-[#1a6b32] rounded-lg px-4 py-2 hover:bg-[#eaf4ef] transition-colors">
            {uploading ? "Uploading..." : form.brochureUrl ? "Replace Brochure" : "Upload Brochure"}
            <input type="file" accept="application/pdf" className="hidden" onChange={handleBrochureUpload} disabled={uploading} />
          </label>
        </div>
        <p className="text-[10px] text-[#75777f] mt-1">
          Powers the "Download Brochure" button on the project's detail page.
        </p>
      </div>

      <div>
        <label className="block text-xs font-bold text-[#151c27] mb-1 uppercase">Gallery Images</label>
        <div className="flex flex-wrap gap-3 mb-3">
          {form.gallery_images.map((url) => (
            <div key={url} className="relative">
              <img src={url} alt="" className="w-20 h-20 object-cover rounded-lg border border-[#c5c6cf]" />
              <button
                type="button"
                onClick={() => removeGalleryImage(url)}
                className="absolute -top-2 -right-2 bg-[#ba1a1a] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                aria-label="Remove image"
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <label className="cursor-pointer inline-block text-sm font-semibold text-[#1a6b32] border border-[#1a6b32] rounded-lg px-4 py-2 hover:bg-[#eaf4ef] transition-colors">
          {uploading ? "Uploading..." : "Add Gallery Images"}
          <input type="file" accept="image/*" multiple className="hidden" onChange={handleGalleryUpload} disabled={uploading} />
        </label>
        <p className="text-[10px] text-[#75777f] mt-1">Powers the "Gallery" tab on the project's detail page.</p>
      </div>

      <div>
        <label className="block text-xs font-bold text-[#151c27] mb-1 uppercase">Floor / Unit Options</label>
        <p className="text-[10px] text-[#75777f] mb-3">
          Upload one image per unit type — e.g. 3 BHK, 4 BHK, Penthouse. Powers the "Floor Plans" tab and the
          Overview tab on the detail page.
        </p>
        <div className="space-y-3">
          {form.floorPlans.map((plan, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row sm:items-center gap-3 border border-[#c5c6cf] rounded-lg p-3"
            >
              <input
                className="w-full sm:w-40 border-[#c5c6cf] rounded-lg text-sm focus:ring-[#1a6b32] focus:border-[#1a6b32]"
                value={plan.type || ""}
                onChange={(e) => updateFloorPlan(index, "type", e.target.value)}
                placeholder="e.g. 4 BHK"
              />
              <input
                className="w-full sm:w-36 border-[#c5c6cf] rounded-lg text-sm focus:ring-[#1a6b32] focus:border-[#1a6b32]"
                value={plan.area || ""}
                onChange={(e) => updateFloorPlan(index, "area", e.target.value)}
                placeholder="e.g. 1800 Sq.ft"
              />
              <div className="flex items-center gap-3 flex-1">
                {plan.image && (
                  <img src={plan.image} alt={plan.type} className="w-14 h-14 object-cover rounded-lg border border-[#c5c6cf]" />
                )}
                <label className="cursor-pointer text-xs font-semibold text-[#1a6b32] border border-[#1a6b32] rounded-lg px-3 py-2 hover:bg-[#eaf4ef] transition-colors whitespace-nowrap">
                  {plan.image ? "Replace Image" : "Upload Image"}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFloorPlanImageUpload(index, e)}
                    disabled={uploading}
                  />
                </label>
                <button
                  type="button"
                  onClick={() => removeFloorPlanRow(index)}
                  className="text-[#ba1a1a] text-xs font-semibold ml-auto"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addFloorPlanRow}
          className="mt-3 text-sm font-semibold text-[#1a6b32] border border-[#1a6b32] rounded-lg px-4 py-2 hover:bg-[#eaf4ef] transition-colors"
        >
          + Add Another Unit Type
        </button>
      </div>

      <div>
        <label className="block text-xs font-bold text-[#151c27] mb-1 uppercase">Amenities</label>
        <p className="text-[10px] text-[#75777f] mb-3">
          Powers the "Amenities" tab. Icon names use{" "}
          <a
            href="https://fonts.google.com/icons"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Google Material Symbols
          </a>{" "}
          names (e.g. pool, fitness_center, park, security). Leave empty to show the default amenity set.
        </p>
        <div className="space-y-2">
          {form.amenities.map((amenity, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                className="w-full sm:w-40 border-[#c5c6cf] rounded-lg text-sm focus:ring-[#1a6b32] focus:border-[#1a6b32]"
                value={amenity.icon || ""}
                onChange={(e) => updateAmenity(index, "icon", e.target.value)}
                placeholder="Icon, e.g. pool"
              />
              <input
                className="flex-1 border-[#c5c6cf] rounded-lg text-sm focus:ring-[#1a6b32] focus:border-[#1a6b32]"
                value={amenity.label || ""}
                onChange={(e) => updateAmenity(index, "label", e.target.value)}
                placeholder="Label, e.g. Swimming Pool"
              />
              <button
                type="button"
                onClick={() => removeAmenity(index)}
                className="text-[#ba1a1a] text-xs font-semibold"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addAmenity}
          className="mt-3 text-sm font-semibold text-[#1a6b32] border border-[#1a6b32] rounded-lg px-4 py-2 hover:bg-[#eaf4ef] transition-colors"
        >
          + Add Amenity
        </button>
      </div>

      <div>
        <label className="block text-xs font-bold text-[#151c27] mb-1 uppercase">Why Invest In This Project</label>
        <p className="text-[10px] text-[#75777f] mb-3">
          Short bullet points — powers the "Why {"{"}Project Name{"}"}" section on the Overview tab.
        </p>
        <div className="space-y-2">
          {form.whyInvest.map((point, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                className="flex-1 border-[#c5c6cf] rounded-lg text-sm focus:ring-[#1a6b32] focus:border-[#1a6b32]"
                value={point}
                onChange={(e) => updateWhyInvest(index, e.target.value)}
                placeholder="e.g. Iconic developer"
              />
              <button
                type="button"
                onClick={() => removeWhyInvest(index)}
                className="text-[#ba1a1a] text-xs font-semibold"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addWhyInvest}
          className="mt-3 text-sm font-semibold text-[#1a6b32] border border-[#1a6b32] rounded-lg px-4 py-2 hover:bg-[#eaf4ef] transition-colors"
        >
          + Add Point
        </button>
      </div>

      <HighlightsEditor
        presets={HIGHLIGHT_PRESETS.premium}
        value={form.highlights}
        onChange={(next) => update("highlights", next)}
      />

      <div>
        <label className="block text-xs font-bold text-[#151c27] mb-1 uppercase">FAQs</label>
        <p className="text-[10px] text-[#75777f] mb-3">Powers the "FAQs" tab on the project's detail page.</p>
        <div className="space-y-3">
          {form.faqs.map((faq, index) => (
            <div key={index} className="border border-[#c5c6cf] rounded-lg p-3 space-y-2">
              <div className="flex items-center gap-2">
                <input
                  className="flex-1 border-[#c5c6cf] rounded-lg text-sm focus:ring-[#1a6b32] focus:border-[#1a6b32]"
                  value={faq.question || ""}
                  onChange={(e) => updateFaq(index, "question", e.target.value)}
                  placeholder="Question"
                />
                <button type="button" onClick={() => removeFaq(index)} className="text-[#ba1a1a] text-xs font-semibold">
                  Remove
                </button>
              </div>
              <textarea
                className="w-full border-[#c5c6cf] rounded-lg text-sm focus:ring-[#1a6b32] focus:border-[#1a6b32]"
                rows={2}
                value={faq.answer || ""}
                onChange={(e) => updateFaq(index, "answer", e.target.value)}
                placeholder="Answer"
              />
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addFaq}
          className="mt-3 text-sm font-semibold text-[#1a6b32] border border-[#1a6b32] rounded-lg px-4 py-2 hover:bg-[#eaf4ef] transition-colors"
        >
          + Add FAQ
        </button>
      </div>

      <div>
        <label className="block text-xs font-bold text-[#151c27] mb-1 uppercase">Additional Notes</label>
        <textarea
          className="w-full border-[#c5c6cf] rounded-lg text-sm focus:ring-[#1a6b32] focus:border-[#1a6b32]"
          rows={4}
          value={form.notes}
          onChange={(e) => update("notes", e.target.value)}
          placeholder="Any extra info for the Overview tab that isn't covered by the fields above..."
        />
        <p className="text-[10px] text-[#75777f] mt-1">
          Plain text, shown at the bottom of the Overview tab. Leave blank to skip. Builder, Property Type, Price
          Note, Total Area, Total Units, Configurations, Overview Summary, brochure, floor/unit options, amenities,
          "Why Invest" points and FAQs are all managed by the dedicated fields above — no need to repeat them here.
        </p>
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={form.is_published}
          onChange={(e) => update("is_published", e.target.checked)}
          className="rounded border-[#c5c6cf] text-[#1a6b32] focus:ring-[#1a6b32]"
        />
        Published (visible on the live site)
      </label>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={form.is_featured}
          onChange={(e) => update("is_featured", e.target.checked)}
          className="rounded border-[#c5c6cf] text-[#1a6b32] focus:ring-[#1a6b32]"
        />
        Featured Property (also shown in the "Featured Properties" section on the homepage)
      </label>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={form.is_upcoming}
          onChange={(e) => update("is_upcoming", e.target.checked)}
          className="rounded border-[#c5c6cf] text-[#1a6b32] focus:ring-[#1a6b32]"
        />
        Upcoming Project (also shown in the "Upcoming Projects" section)
      </label>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={saving || uploading}
          className="bg-[#1a6b32] hover:bg-[#145126] text-white font-bold px-6 py-2.5 rounded-lg transition-colors disabled:opacity-70"
        >
          {saving ? "Saving..." : project ? "Save Changes" : "Create Project"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="text-[#45464e] font-semibold px-6 py-2.5 rounded-lg hover:bg-[#f0f3ff] transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}