import { useState } from "react";
import { api } from "../../../lib/api.js";
import { CATEGORY_TABS } from "../../../components/agriculture/CategoryTabs.jsx";

const PROPERTY_TYPE_OPTIONS = CATEGORY_TABS.filter((t) => t.key !== "all");

const CATEGORY = "agriculture";

const DETAILS_PLACEHOLDER = `{
  "soilType": "Loamy",
  "areaOptions": [{ "size": "10 Acre", "price": "₹ 80 Lakh" }],
  "nearby": [{ "icon": "directions_car", "time": "05 mins", "place": "Bus Stand" }],
  "whyInvest": ["Prime location", "Excellent soil & water"]
}`;

const emptyForm = {
  category: CATEGORY,
  slug: "",
  name: "",
  tagline: "",
  badge: "",
  location: "",
  city: "",
  sector: "",
  price_display: "",
  price_range: "",
  area_display: "",
  possession: "",
  description: "",
  main_image: "",
  gallery_images: [],
  tagsText: "",
  detailsText: "",
  brochureUrl: "",
  faqs: [],
  propertyType: "",
  is_published: true,
  is_featured: false,
  is_upcoming: false,
};

// brochureUrl / faqs are managed by their own dedicated controls, so strip
// them out of the raw JSON textarea to avoid editing the same data in two
// places at once.
function detailsTextFor(details) {
  if (!details) return "";
  const { brochureUrl, faqs, propertyType, ...rest } = details;
  return Object.keys(rest).length ? JSON.stringify(rest, null, 2) : "";
}

export default function AgricultureProjectForm({ project, onSaved, onCancel }) {
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
      detailsText: detailsTextFor(project.details),
      brochureUrl: d.brochureUrl || "",
      faqs: Array.isArray(d.faqs) && d.faqs.length ? d.faqs : [],
      propertyType: d.propertyType || "",
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

    let details = {};
    if (form.detailsText.trim()) {
      try {
        details = JSON.parse(form.detailsText);
      } catch {
        setError("Additional Details must be valid JSON — check the syntax.");
        return;
      }
    }

    if (form.brochureUrl) details.brochureUrl = form.brochureUrl;
    if (form.propertyType) details.propertyType = form.propertyType;

    const cleanFaqs = form.faqs
      .map((f) => ({ question: f.question.trim(), answer: f.answer.trim() }))
      .filter((f) => f.question && f.answer);
    if (cleanFaqs.length) details.faqs = cleanFaqs;

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
          placeholder="e.g. aura-greens"
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

      <div>
        <label className="block text-xs font-bold text-[#151c27] mb-1 uppercase">Property Type</label>
        <select
          className="w-full border-[#c5c6cf] rounded-lg text-sm focus:ring-[#1a6b32] focus:border-[#1a6b32]"
          value={form.propertyType}
          onChange={(e) => update("propertyType", e.target.value)}
          required
        >
          <option value="" disabled>
            Select a category...
          </option>
          {PROPERTY_TYPE_OPTIONS.map((opt) => (
            <option key={opt.key} value={opt.key}>
              {opt.label}
            </option>
          ))}
        </select>
        <p className="text-[11px] text-[#6b7280] mt-1">
          Determines which tab (All / Agricultural Land / Farmhouse Land / ...) this project shows up under on
          the Agriculture listing page.
        </p>
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
            placeholder="e.g. Mohali"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-[#151c27] mb-1 uppercase">Full Location</label>
        <input
          className="w-full border-[#c5c6cf] rounded-lg text-sm focus:ring-[#1a6b32] focus:border-[#1a6b32]"
          value={form.location}
          onChange={(e) => update("location", e.target.value)}
          placeholder="e.g. Sector 82, Mohali, Punjab"
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
            placeholder="₹ 85 Lakh"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-[#151c27] mb-1 uppercase">Price Range (detail page)</label>
          <input
            className="w-full border-[#c5c6cf] rounded-lg text-sm focus:ring-[#1a6b32] focus:border-[#1a6b32]"
            value={form.price_range}
            onChange={(e) => update("price_range", e.target.value)}
            placeholder="₹ 85 Lakh - ₹ 1.8 Cr"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-[#151c27] mb-1 uppercase">Area</label>
          <input
            className="w-full border-[#c5c6cf] rounded-lg text-sm focus:ring-[#1a6b32] focus:border-[#1a6b32]"
            value={form.area_display}
            onChange={(e) => update("area_display", e.target.value)}
            placeholder="1200 - 2400 Sq.ft"
          />
        </div>
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

      <div>
        <label className="block text-xs font-bold text-[#151c27] mb-1 uppercase">Description</label>
        <textarea
          className="w-full border-[#c5c6cf] rounded-lg text-sm focus:ring-[#1a6b32] focus:border-[#1a6b32]"
          rows={4}
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
          placeholder="Shown on the project's detail page"
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
        <label className="block text-xs font-bold text-[#151c27] mb-1 uppercase">FAQs</label>
        <p className="text-[10px] text-[#75777f] mb-3">Powers the "FAQs" tab on the project's detail page.</p>
        <div className="space-y-3">
          {form.faqs.map((faq, index) => (
            <div key={index} className="border border-[#c5c6cf] rounded-lg p-3 space-y-2">
              <div className="flex items-center gap-2">
                <input
                  className="flex-1 border-[#c5c6cf] rounded-lg text-sm focus:ring-[#1a6b32] focus:border-[#1a6b32]"
                  value={faq.question}
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
                value={faq.answer}
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
        <label className="block text-xs font-bold text-[#151c27] mb-1 uppercase">
          Additional Details (JSON) — powers the detail page's Overview tab
        </label>
        <textarea
          className="w-full border-[#c5c6cf] rounded-lg text-xs font-mono focus:ring-[#1a6b32] focus:border-[#1a6b32]"
          rows={8}
          value={form.detailsText}
          onChange={(e) => update("detailsText", e.target.value)}
          placeholder={DETAILS_PLACEHOLDER}
        />
        <p className="text-[10px] text-[#75777f] mt-1">
          Leave blank to skip. Property Type, brochure and FAQs are managed by the dedicated fields above — no
          need to repeat them here.
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