import { useState } from "react";
import { api } from "../../../lib/api.js";
import { CATEGORY_TABS } from "../../../components/agriculture/CategoryTabs.jsx";

const PROPERTY_TYPE_OPTIONS = CATEGORY_TABS.filter((t) => t.key !== "all");

const CATEGORY = "agriculture";

const DETAILS_PLACEHOLDER = `{
  "priceNote": "Negotiable"
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
  soilType: "",
  waterSource: "",
  irrigationType: "",
  soilWaterNotes: "",
  areaOptions: [],
  nearby: [],
  whyInvest: [],
  landDetails: [],
  documents: [],
  is_published: true,
  is_featured: false,
  is_upcoming: false,
};

// brochureUrl / faqs are managed by their own dedicated controls, so strip
// them out of the raw JSON textarea to avoid editing the same data in two
// places at once.
function detailsTextFor(details) {
  if (!details) return "";
  const {
    brochureUrl,
    faqs,
    propertyType,
    soilType,
    waterSource,
    irrigationType,
    soilWaterNotes,
    areaOptions,
    nearby,
    whyInvest,
    landDetails,
    documents,
    ...rest
  } = details;
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
      soilType: d.soilType || "",
      waterSource: d.waterSource || "",
      irrigationType: d.irrigationType || "",
      soilWaterNotes: d.soilWaterNotes || "",
      areaOptions: Array.isArray(d.areaOptions) && d.areaOptions.length ? d.areaOptions : [],
      nearby: Array.isArray(d.nearby) && d.nearby.length ? d.nearby : [],
      whyInvest: Array.isArray(d.whyInvest) && d.whyInvest.length ? d.whyInvest : [],
      landDetails: Array.isArray(d.landDetails) && d.landDetails.length ? d.landDetails : [],
      documents: Array.isArray(d.documents) && d.documents.length ? d.documents : [],
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

  // ---- Area Options ----

  const updateAreaOption = (index, key, value) => {
    setForm((f) => {
      const next = [...f.areaOptions];
      next[index] = { ...next[index], [key]: value };
      return { ...f, areaOptions: next };
    });
  };

  const addAreaOption = () => setForm((f) => ({ ...f, areaOptions: [...f.areaOptions, { size: "", price: "" }] }));
  const removeAreaOption = (index) =>
    setForm((f) => ({ ...f, areaOptions: f.areaOptions.filter((_, i) => i !== index) }));

  // ---- Land Details (key-value facts) ----

  const updateLandDetail = (index, key, value) => {
    setForm((f) => {
      const next = [...f.landDetails];
      next[index] = { ...next[index], [key]: value };
      return { ...f, landDetails: next };
    });
  };

  const addLandDetail = () =>
    setForm((f) => ({ ...f, landDetails: [...f.landDetails, { label: "", value: "" }] }));
  const removeLandDetail = (index) =>
    setForm((f) => ({ ...f, landDetails: f.landDetails.filter((_, i) => i !== index) }));

  // ---- Nearby Places ----

  const updateNearby = (index, key, value) => {
    setForm((f) => {
      const next = [...f.nearby];
      next[index] = { ...next[index], [key]: value };
      return { ...f, nearby: next };
    });
  };

  const addNearby = () =>
    setForm((f) => ({ ...f, nearby: [...f.nearby, { icon: "directions_car", time: "", place: "" }] }));
  const removeNearby = (index) => setForm((f) => ({ ...f, nearby: f.nearby.filter((_, i) => i !== index) }));

  // ---- Why Invest (simple list of points) ----

  const updateWhyInvest = (index, value) => {
    setForm((f) => {
      const next = [...f.whyInvest];
      next[index] = value;
      return { ...f, whyInvest: next };
    });
  };

  const addWhyInvest = () => setForm((f) => ({ ...f, whyInvest: [...f.whyInvest, ""] }));
  const removeWhyInvest = (index) =>
    setForm((f) => ({ ...f, whyInvest: f.whyInvest.filter((_, i) => i !== index) }));

  // ---- Documents (label + uploaded file) ----

  const updateDocument = (index, key, value) => {
    setForm((f) => {
      const next = [...f.documents];
      next[index] = { ...next[index], [key]: value };
      return { ...f, documents: next };
    });
  };

  const addDocument = () => setForm((f) => ({ ...f, documents: [...f.documents, { label: "", url: "" }] }));
  const removeDocument = (index) =>
    setForm((f) => ({ ...f, documents: f.documents.filter((_, i) => i !== index) }));

  const handleDocumentUpload = async (index, e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const { url } = await api.adminUploadFile(file);
      updateDocument(index, "url", url);
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
    if (form.soilType.trim()) details.soilType = form.soilType.trim();
    if (form.waterSource.trim()) details.waterSource = form.waterSource.trim();
    if (form.irrigationType.trim()) details.irrigationType = form.irrigationType.trim();
    if (form.soilWaterNotes.trim()) details.soilWaterNotes = form.soilWaterNotes.trim();

    const cleanAreaOptions = form.areaOptions
      .map((o) => ({ size: o.size.trim(), price: o.price.trim() }))
      .filter((o) => o.size && o.price);
    if (cleanAreaOptions.length) details.areaOptions = cleanAreaOptions;

    const cleanLandDetails = form.landDetails
      .map((l) => ({ label: l.label.trim(), value: l.value.trim() }))
      .filter((l) => l.label && l.value);
    if (cleanLandDetails.length) details.landDetails = cleanLandDetails;

    const cleanNearby = form.nearby
      .map((n) => ({ icon: n.icon.trim() || "place", time: n.time.trim(), place: n.place.trim() }))
      .filter((n) => n.place && n.time);
    if (cleanNearby.length) details.nearby = cleanNearby;

    const cleanWhyInvest = form.whyInvest.map((w) => w.trim()).filter(Boolean);
    if (cleanWhyInvest.length) details.whyInvest = cleanWhyInvest;

    const cleanDocuments = form.documents
      .map((doc) => ({ label: doc.label.trim(), url: doc.url }))
      .filter((doc) => doc.label && doc.url);
    if (cleanDocuments.length) details.documents = cleanDocuments;

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

      {/* ---- Soil & Water ---- */}
      <div>
        <label className="block text-xs font-bold text-[#151c27] mb-1 uppercase">Soil &amp; Water</label>
        <p className="text-[10px] text-[#75777f] mb-3">Powers the "Soil &amp; Water" tab on the project's detail page.</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
          <input
            className="w-full border-[#c5c6cf] rounded-lg text-sm focus:ring-[#1a6b32] focus:border-[#1a6b32]"
            value={form.soilType}
            onChange={(e) => update("soilType", e.target.value)}
            placeholder="Soil Type — e.g. Loamy"
          />
          <input
            className="w-full border-[#c5c6cf] rounded-lg text-sm focus:ring-[#1a6b32] focus:border-[#1a6b32]"
            value={form.waterSource}
            onChange={(e) => update("waterSource", e.target.value)}
            placeholder="Water Source — e.g. Borewell + Canal"
          />
          <input
            className="w-full border-[#c5c6cf] rounded-lg text-sm focus:ring-[#1a6b32] focus:border-[#1a6b32]"
            value={form.irrigationType}
            onChange={(e) => update("irrigationType", e.target.value)}
            placeholder="Irrigation Type — e.g. Drip Irrigation"
          />
        </div>
        <textarea
          className="w-full border-[#c5c6cf] rounded-lg text-sm focus:ring-[#1a6b32] focus:border-[#1a6b32]"
          rows={2}
          value={form.soilWaterNotes}
          onChange={(e) => update("soilWaterNotes", e.target.value)}
          placeholder="Optional extra notes about soil quality, water table depth, etc."
        />
      </div>

      {/* ---- Area Options ---- */}
      <div>
        <label className="block text-xs font-bold text-[#151c27] mb-1 uppercase">Area Options</label>
        <p className="text-[10px] text-[#75777f] mb-3">
          Powers the "Overview" tab's plot-size list on the project's detail page.
        </p>
        <div className="space-y-3">
          {form.areaOptions.map((opt, index) => (
            <div key={index} className="flex flex-col sm:flex-row items-center gap-3 border border-[#c5c6cf] rounded-lg p-3">
              <input
                className="w-full sm:w-40 border-[#c5c6cf] rounded-lg text-sm focus:ring-[#1a6b32] focus:border-[#1a6b32]"
                value={opt.size}
                onChange={(e) => updateAreaOption(index, "size", e.target.value)}
                placeholder="e.g. 10 Acre"
              />
              <input
                className="flex-1 w-full border-[#c5c6cf] rounded-lg text-sm focus:ring-[#1a6b32] focus:border-[#1a6b32]"
                value={opt.price}
                onChange={(e) => updateAreaOption(index, "price", e.target.value)}
                placeholder="e.g. ₹ 80 Lakh"
              />
              <button
                type="button"
                onClick={() => removeAreaOption(index)}
                className="text-[#ba1a1a] text-xs font-semibold whitespace-nowrap"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addAreaOption}
          className="mt-3 text-sm font-semibold text-[#1a6b32] border border-[#1a6b32] rounded-lg px-4 py-2 hover:bg-[#eaf4ef] transition-colors"
        >
          + Add Area Option
        </button>
      </div>

      {/* ---- Land Details ---- */}
      <div>
        <label className="block text-xs font-bold text-[#151c27] mb-1 uppercase">Land Details</label>
        <p className="text-[10px] text-[#75777f] mb-3">
          Extra facts (fencing, road width, khasra number, zoning, etc.) shown on the "Land Details" tab, in
          addition to Property Type / Area / Soil Type / Possession which are already shown automatically.
        </p>
        <div className="space-y-3">
          {form.landDetails.map((row, index) => (
            <div key={index} className="flex flex-col sm:flex-row items-center gap-3 border border-[#c5c6cf] rounded-lg p-3">
              <input
                className="w-full sm:w-48 border-[#c5c6cf] rounded-lg text-sm focus:ring-[#1a6b32] focus:border-[#1a6b32]"
                value={row.label}
                onChange={(e) => updateLandDetail(index, "label", e.target.value)}
                placeholder="Label — e.g. Road Width"
              />
              <input
                className="flex-1 w-full border-[#c5c6cf] rounded-lg text-sm focus:ring-[#1a6b32] focus:border-[#1a6b32]"
                value={row.value}
                onChange={(e) => updateLandDetail(index, "value", e.target.value)}
                placeholder="Value — e.g. 20 ft"
              />
              <button
                type="button"
                onClick={() => removeLandDetail(index)}
                className="text-[#ba1a1a] text-xs font-semibold whitespace-nowrap"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addLandDetail}
          className="mt-3 text-sm font-semibold text-[#1a6b32] border border-[#1a6b32] rounded-lg px-4 py-2 hover:bg-[#eaf4ef] transition-colors"
        >
          + Add Land Detail
        </button>
      </div>

      {/* ---- Nearby Places ---- */}
      <div>
        <label className="block text-xs font-bold text-[#151c27] mb-1 uppercase">Nearby Places</label>
        <p className="text-[10px] text-[#75777f] mb-3">
          Powers the "Location" and "Nearby" tabs on the project's detail page. Icon uses{" "}
          <a
            href="https://fonts.google.com/icons"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Google Material Symbols
          </a>{" "}
          names, e.g. directions_car, school, local_hospital, storefront.
        </p>
        <div className="space-y-3">
          {form.nearby.map((item, index) => (
            <div key={index} className="flex flex-col sm:flex-row items-center gap-3 border border-[#c5c6cf] rounded-lg p-3">
              <input
                className="w-full sm:w-32 border-[#c5c6cf] rounded-lg text-sm focus:ring-[#1a6b32] focus:border-[#1a6b32]"
                value={item.icon}
                onChange={(e) => updateNearby(index, "icon", e.target.value)}
                placeholder="Icon"
              />
              <input
                className="w-full sm:w-24 border-[#c5c6cf] rounded-lg text-sm focus:ring-[#1a6b32] focus:border-[#1a6b32]"
                value={item.time}
                onChange={(e) => updateNearby(index, "time", e.target.value)}
                placeholder="e.g. 05 mins"
              />
              <input
                className="flex-1 w-full border-[#c5c6cf] rounded-lg text-sm focus:ring-[#1a6b32] focus:border-[#1a6b32]"
                value={item.place}
                onChange={(e) => updateNearby(index, "place", e.target.value)}
                placeholder="e.g. Bus Stand"
              />
              <button
                type="button"
                onClick={() => removeNearby(index)}
                className="text-[#ba1a1a] text-xs font-semibold whitespace-nowrap"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addNearby}
          className="mt-3 text-sm font-semibold text-[#1a6b32] border border-[#1a6b32] rounded-lg px-4 py-2 hover:bg-[#eaf4ef] transition-colors"
        >
          + Add Nearby Place
        </button>
      </div>

      {/* ---- Why Invest ---- */}
      <div>
        <label className="block text-xs font-bold text-[#151c27] mb-1 uppercase">
          Why Invest in {form.name || "This Project"}
        </label>
        <p className="text-[10px] text-[#75777f] mb-3">
          Bullet points shown in the "Why Invest" section on the project's detail page.
        </p>
        <div className="space-y-2">
          {form.whyInvest.map((point, index) => (
            <div key={index} className="flex items-center gap-3">
              <input
                className="flex-1 border-[#c5c6cf] rounded-lg text-sm focus:ring-[#1a6b32] focus:border-[#1a6b32]"
                value={point}
                onChange={(e) => updateWhyInvest(index, e.target.value)}
                placeholder="e.g. Excellent soil & water availability"
              />
              <button
                type="button"
                onClick={() => removeWhyInvest(index)}
                className="text-[#ba1a1a] text-xs font-semibold whitespace-nowrap"
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

      {/* ---- Documents ---- */}
      <div>
        <label className="block text-xs font-bold text-[#151c27] mb-1 uppercase">Documents</label>
        <p className="text-[10px] text-[#75777f] mb-3">
          Additional downloadable documents (title deed, mutation certificate, etc.) shown on the "Documents"
          tab, alongside the Project Brochure uploaded below.
        </p>
        <div className="space-y-3">
          {form.documents.map((doc, index) => (
            <div key={index} className="flex flex-col sm:flex-row sm:items-center gap-3 border border-[#c5c6cf] rounded-lg p-3">
              <input
                className="w-full sm:w-48 border-[#c5c6cf] rounded-lg text-sm focus:ring-[#1a6b32] focus:border-[#1a6b32]"
                value={doc.label}
                onChange={(e) => updateDocument(index, "label", e.target.value)}
                placeholder="e.g. Title Deed"
              />
              <div className="flex items-center gap-3 flex-1">
                {doc.url && (
                  <a
                    href={doc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#1a6b32] underline whitespace-nowrap"
                  >
                    View file
                  </a>
                )}
                <label className="cursor-pointer text-xs font-semibold text-[#1a6b32] border border-[#1a6b32] rounded-lg px-3 py-2 hover:bg-[#eaf4ef] transition-colors whitespace-nowrap">
                  {doc.url ? "Replace File" : "Upload File"}
                  <input
                    type="file"
                    accept="application/pdf,image/*"
                    className="hidden"
                    onChange={(e) => handleDocumentUpload(index, e)}
                    disabled={uploading}
                  />
                </label>
                <button
                  type="button"
                  onClick={() => removeDocument(index)}
                  className="text-[#ba1a1a] text-xs font-semibold ml-auto whitespace-nowrap"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addDocument}
          className="mt-3 text-sm font-semibold text-[#1a6b32] border border-[#1a6b32] rounded-lg px-4 py-2 hover:bg-[#eaf4ef] transition-colors"
        >
          + Add Document
        </button>
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
          Leave blank to skip. Property Type, Soil &amp; Water, Area Options, Land Details, Nearby Places, Why
          Invest, Documents, brochure, and FAQs are all managed by the dedicated fields above — no need to
          repeat them here. Use this only for a one-off extra field (e.g. priceNote).
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