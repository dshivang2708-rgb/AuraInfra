// Preset "highlight" checklist points shown on each category's project
// detail page (the small checklist inside the pricing card at the top
// right). Admins can pick any of these 6-8 presets and/or add their own
// custom points per project — see HighlightsEditor.jsx.
//
// `iconType` tells the UI (both the admin editor and the live sidebar)
// whether `icon` is a Font Awesome class ("fa") or a Material Symbols
// ligature name ("material").

export const HIGHLIGHT_PRESETS = {
  residential: {
    iconType: "fa",
    defaultCustomIcon: "fa-solid fa-circle-check",
    options: [
      { label: "RERA Approved", icon: "fa-solid fa-shield-halved" },
      { label: "Premium Quality Construction", icon: "fa-solid fa-building" },
      { label: "Excellent Location", icon: "fa-solid fa-location-dot" },
      { label: "High Appreciation Potential", icon: "fa-solid fa-arrow-trend-up" },
      { label: "Gated Community & 24x7 Security", icon: "fa-solid fa-lock" },
      { label: "Ready to Move", icon: "fa-solid fa-key" },
      { label: "Bank Loan Available", icon: "fa-solid fa-landmark" },
      { label: "Clear Title & Legal Verified", icon: "fa-solid fa-gavel" },
    ],
  },
  commercial: {
    iconType: "fa",
    defaultCustomIcon: "fa-solid fa-circle-check",
    options: [
      { label: "RERA Approved", icon: "fa-solid fa-shield-halved" },
      { label: "Grade A Construction", icon: "fa-solid fa-building" },
      { label: "Prime Business Location", icon: "fa-solid fa-location-dot" },
      { label: "High Rental Yield", icon: "fa-solid fa-arrow-trend-up" },
      { label: "Ample Parking Space", icon: "fa-solid fa-square-parking" },
      { label: "High Footfall Area", icon: "fa-solid fa-people-group" },
      { label: "Bank Loan Available", icon: "fa-solid fa-landmark" },
      { label: "Ready to Move", icon: "fa-solid fa-key" },
    ],
  },
  agriculture: {
    iconType: "material",
    defaultCustomIcon: "check_circle",
    options: [
      { label: "RERA Approved", icon: "verified" },
      { label: "Clear Title & Legal Verified", icon: "gavel" },
      { label: "Fertile & Cultivable Land", icon: "grass" },
      { label: "Good Water Availability", icon: "water_drop" },
      { label: "High Appreciation Potential", icon: "trending_up" },
      { label: "Road Connectivity", icon: "signpost" },
      { label: "Electricity Connection Available", icon: "bolt" },
      { label: "Boundary Wall / Fencing", icon: "fence" },
    ],
  },
  premium: {
    iconType: "material",
    defaultCustomIcon: "check_circle",
    options: [
      { label: "RERA Approved", icon: "verified" },
      { label: "Premium Quality Construction", icon: "apartment" },
      { label: "Prime Location", icon: "location_on" },
      { label: "High Appreciation Potential", icon: "trending_up" },
      { label: "World-Class Amenities", icon: "spa" },
      { label: "24x7 Security & Concierge", icon: "security" },
      { label: "Bank Loan Available", icon: "account_balance" },
      { label: "Ready to Move", icon: "vpn_key" },
    ],
  },
};