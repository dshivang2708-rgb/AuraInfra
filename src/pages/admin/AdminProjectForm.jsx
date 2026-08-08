import { useState } from "react";
import { api } from "../../lib/api.js";

const CATEGORIES = ["residential", "commercial", "agriculture", "premium"];

const DETAILS_PLACEHOLDER = {
  residential: `{
  "beds": "2, 3 & 4 BHK",
  "totalArea": "5.8 Acres",
  "totalUnits": "280+",
  "configurations": "2 BHK, 3 BHK, 4 BHK",
  "overviewSummary": "A short paragraph for the Overview tab..."
}`,
  commercial: `{
  "type": "Office Space",
  "totalArea": "1.8 Acres",
  "totalUnits": "60+",
  "configurations": "Office Floors, Retail Ground Floor",
  "overviewSummary": "A short paragraph for the Overview tab...",
  "floorPlans": [{ "type": "Full Floor", "area": "4500 sq ft" }],
  "whyInvest": ["Prime location", "Grade A construction"]
}`,
  agriculture: `{
  "soilType": "Loamy",
  "areaOptions": [{ "size": "10 Acre", "price": "₹ 80 Lakh" }],
  "nearby": [{ "icon": "directions_car", "time": "05 mins", "place": "Bus Stand" }],
  "whyInvest": ["Prime location", "Excellent soil & water"]
}`,
  premium: `{
  "builder": "DLF"
}`,
};

const DEFAULT_FLOOR_PLANS = () => [
  { type: "2 BHK", area: "", image: "" },
  { type: "3 BHK", area: "", image: "" },
  { type: "4 BHK", area: "", image: "" },
];

const emptyForm = {
  category: "residential",
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
  floorPlans: DEFAULT_FLOOR_PLANS(),
  is_published: true,
};

// brochureUrl / faqs / (residential) floorPlans are managed by their own
// dedicated controls now, so strip them out of the raw JSON textarea to
// avoid editing the same data in two places at once.
function detailsTextFor(details, category) {
  if (!details) return "";
  const { brochureUrl, faqs, floorPlans, ...rest } = details;
  if (category !== "residential" && floorPlans) rest.floorPlans = floorPlans;
  return Object.keys(rest).length ? JSON.stringify(rest, null, 2) : "";
}

export default function AdminProjectForm({ project, onSaved, onCancel }) {
  const [form, setForm] = useState(() => {
    if (!project) return emptyForm;
    const d = project.details || {};
    return {
      ...emptyForm,
      ...project,
      tagsText: Array.isArray(project.tags)
        ? project.tags.map((t) => (typeof t === "string" ? t : t.label)).join(", ")
        : "",
      detailsText: detailsTextFor(project.details, project.category),
      brochureUrl: d.brochureUrl || "",
      faqs: Array.isArray(d.faqs) && d.faqs.length ? d.faqs : [],
      floorPlans:
        project.category === "residential"
          ? Array.isArray(d.floorPlans) && d.floorPlans.length
            ? d.floorPlans
            : DEFAULT_FLOOR_PLANS()
          : [],
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

  // ---- Floor plans (residential only, uploaded one BHK type at a time) ----

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

    const cleanFaqs = form.faqs
      .map((f) => ({ question: f.question.trim(), answer: f.answer.trim() }))
      .filter((f) => f.question && f.answer);
    if (cleanFaqs.length) details.faqs = cleanFaqs;

    if (form.category === "residential") {
      const cleanFloorPlans = form.floorPlans
        .map((fp) => ({ type: fp.type.trim(), area: fp.area.trim(), image: fp.image }))
        .filter((fp) => fp.type && fp.image);
      if (cleanFloorPlans.length) details.floorPlans = cleanFloorPlans;
    }

    const tags = form.tagsText
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const payload = {
      category: form.category,
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-[#151c27] mb-1 uppercase">Category</label>
          <select
            className="w-full border-[#c5c6cf] rounded-lg text-sm focus:ring-[#1a6b32] focus:border-[#1a6b32]"
            value={form.category}
            onChange={(e) => {
              const category = e.target.value;
              setForm((f) => ({
                ...f,
                category,
                floorPlans: category === "residential" && f.floorPlans.length === 0 ? DEFAULT_FLOOR_PLANS() : f.floorPlans,
              }));
            }}
            disabled={!!project}
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c[0].toUpperCase() + c.slice(1)}
              </option>
            ))}
          </select>
          {project && <p className="text-[10px] text-[#75777f] mt-1">Category can't be changed after creation.</p>}
        </div>
        <div>
          <label className="block text-xs font-bold text-[#151c27] mb-1 uppercase">
            Slug (used in the URL)
          </label>
          <input
            className="w-full border-[#c5c6cf] rounded-lg text-sm focus:ring-[#1a6b32] focus:border-[#1a6b32]"
            value={form.slug}
            onChange={(e) => update("slug", e.target.value)}
            placeholder="e.g. aura-greens"
            required
          />
        </div>
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

      {/* Description — text */}
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

      {/* Main image — upload */}
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

      {/* Brochure — PDF upload */}
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

      {/* Gallery images — multi upload */}
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

      {/* Floor Plans — residential only, uploaded one BHK type at a time */}
      {form.category === "residential" && (
        <div>
          <label className="block text-xs font-bold text-[#151c27] mb-1 uppercase">Floor Plans (by BHK)</label>
          <p className="text-[10px] text-[#75777f] mb-3">
            Upload one floor plan image per configuration — e.g. 2 BHK, 3 BHK, 4 BHK. Powers the "Floor Plans" tab.
          </p>
          <div className="space-y-3">
            {form.floorPlans.map((plan, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row sm:items-center gap-3 border border-[#c5c6cf] rounded-lg p-3"
              >
                <input
                  className="w-full sm:w-32 border-[#c5c6cf] rounded-lg text-sm focus:ring-[#1a6b32] focus:border-[#1a6b32]"
                  value={plan.type}
                  onChange={(e) => updateFloorPlan(index, "type", e.target.value)}
                  placeholder="e.g. 2 BHK"
                />
                <input
                  className="w-full sm:w-36 border-[#c5c6cf] rounded-lg text-sm focus:ring-[#1a6b32] focus:border-[#1a6b32]"
                  value={plan.area}
                  onChange={(e) => updateFloorPlan(index, "area", e.target.value)}
                  placeholder="e.g. 1200 Sq.ft"
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
            + Add Another Configuration
          </button>
        </div>
      )}

      {/* FAQs */}
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

      {/* Category-specific extras */}
      <div>
        <label className="block text-xs font-bold text-[#151c27] mb-1 uppercase">
          Additional Details (JSON) — powers the detail page's Overview tab
        </label>
        <textarea
          className="w-full border-[#c5c6cf] rounded-lg text-xs font-mono focus:ring-[#1a6b32] focus:border-[#1a6b32]"
          rows={8}
          value={form.detailsText}
          onChange={(e) => update("detailsText", e.target.value)}
          placeholder={DETAILS_PLACEHOLDER[form.category]}
        />
        <p className="text-[10px] text-[#75777f] mt-1">
          Leave blank to skip. Expected fields for "{form.category}" shown as placeholder above.
          {form.category === "residential" && " Floor plans, brochure and FAQs are managed by the dedicated fields above — no need to repeat them here."}
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
