// Shared data for commercial property cards (ResultsGrid) and their detail pages.
// Each entry's `key` is used as the route slug: /properties/commercial/:key

export const COMMERCIAL_AMENITIES = [
  { icon: "fa-solid fa-door-open", label: "Reception Lobby" },
  { icon: "fa-solid fa-elevator", label: "High-Speed Elevators" },
  { icon: "fa-solid fa-car", label: "Ample Parking" },
  { icon: "fa-solid fa-snowflake", label: "Central AC" },
  { icon: "fa-solid fa-shield-halved", label: "24/7 Security" },
  { icon: "fa-solid fa-video", label: "CCTV" },
  { icon: "fa-solid fa-mug-saucer", label: "Cafeteria" },
  { icon: "fa-solid fa-users", label: "Conference Rooms" },
  { icon: "fa-solid fa-fire-extinguisher", label: "Fire Safety" },
  { icon: "fa-solid fa-wifi", label: "High-Speed WiFi" },
];

export const COMMERCIAL_PROPERTIES = [
  {
    key: "corporate-tower",
    name: "Corporate Tower",
    tagline: "A Landmark Address for Growing Businesses",
    type: "Office Space",
    badge: "Premium",
    location: "Sector 82, Mohali, Punjab",
    area: "4,500 sq ft",
    priceRange: "₹ 2.85 Cr",
    priceNote: "₹ 6,333 / sq ft",
    possession: "Ready to Move",
    totalArea: "1.8 Acres",
    totalUnits: "60+",
    configurations: "Office Floors, Retail Ground Floor",
    tags: ["RERA Approved", "Grade A Building", "Prime Location"],
    description:
      "Corporate Tower is a Grade A office development offering premium, ready-to-move commercial space in the heart of Sector 82, Mohali — built for businesses that want a landmark address.",
    overviewSummary:
      "Corporate Tower brings together modern architecture, efficient floor plates and premium finishes, designed for corporates who want a professional, future-ready workspace.",
    floorPlans: [
      { type: "Compact Office", area: "1,500 sq ft" },
      { type: "Mid-size Office", area: "3,000 sq ft" },
      { type: "Full Floor", area: "4,500 sq ft" },
    ],
    whyInvest: [
      "Prime location in Sector 82, Mohali",
      "Grade A construction quality",
      "High footfall commercial corridor",
      "Strong rental yield potential",
    ],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDdNkYp_Kshq1tO4n0SQRVYarZE9O6Iy5aKYRQ7JVKcN0aViblIBFpmEZNZgcB4cXLy2BrAkEvINn1zS2lhfF3MV-sgNJmNJscQzt4R9I49cA8QZv2HkOcQf217y7JlSLTJZCe8qqzHVMYixruvSNG4csgXJ0eq4UQueUkeSXVGQoL6mAWkR_8srIEdtU1-kzN0VpsD_aH6OX_plwKR_J0GxvEGDS4xG3x3LN2AeRV7ch7B6qAREiSR35YkKYFVJtYAcg",
  },
  {
    key: "high-street-retail",
    name: "High Street Retail",
    tagline: "Prime Frontage. Maximum Visibility.",
    type: "Retail Space",
    badge: "Featured",
    location: "Zirakpur, Punjab",
    area: "2,200 sq ft",
    priceRange: "₹ 1.65 Cr",
    priceNote: "₹ 7,500 / sq ft",
    possession: "Ready to Move",
    totalArea: "0.6 Acres",
    totalUnits: "18+",
    configurations: "Ground + First Floor Retail",
    tags: ["RERA Approved", "High Street Frontage", "High Footfall"],
    description:
      "High Street Retail offers premium retail frontage on one of Zirakpur's busiest commercial stretches, ideal for flagship stores, showrooms, or F&B outlets.",
    overviewSummary:
      "Positioned directly on a high-traffic commercial street, this development is built for retail brands that need visibility and footfall from day one.",
    floorPlans: [
      { type: "Ground Floor", area: "1,200 sq ft" },
      { type: "Ground + First", area: "2,200 sq ft" },
    ],
    whyInvest: [
      "Direct high street frontage & visibility",
      "Heavy daily footfall in Zirakpur",
      "Ready to move, immediate occupancy",
      "Strong retail rental demand nearby",
    ],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAewtLGivwCgQcVsypXVbJKCWNq26zSdZQaNe26_9hOOWFK35ETdK7dVWPKz02PjDbjPDSFQeipY5WjgbgOrInmDkoBkuEaJ_xHradn3XyWpUuAsTzaoAKsMM6FoeRwZDGmdckib9nt2sqtU58kINvXl48UIILyuJPwTk0hRf9FrDr-F8qEOWONUBWipy9tfs3J7JAcc5z7FYJQelv95HQKY4VyiPosAsP7NGGih4OqGgQ0mNAUb0SFA3wHRvDXORG_UQ",
  },
  {
    key: "nextgen-coworks",
    name: "NextGen CoWorks",
    tagline: "Flexible Space for Modern Teams",
    type: "Co-working Space",
    badge: "New",
    location: "Zirakpur, Punjab",
    area: "1,200 sq ft",
    priceRange: "₹ 75,000 / month",
    priceNote: null,
    possession: "Ready to Move",
    totalArea: "0.4 Acres",
    totalUnits: "40+ desks",
    configurations: "Hot Desks, Private Cabins, Meeting Rooms",
    tags: ["RERA Approved", "Fully Furnished", "Flexible Leasing"],
    description:
      "NextGen CoWorks offers fully furnished, flexible workspace with hot desks, private cabins and meeting rooms — built for startups, freelancers and growing teams.",
    overviewSummary:
      "A move-in-ready coworking space with flexible month-to-month leasing, designed for teams that need to scale up or down without long-term commitment.",
    floorPlans: [
      { type: "Hot Desk", area: "1 seat" },
      { type: "Private Cabin", area: "4-6 seats" },
      { type: "Full Floor Lease", area: "1,200 sq ft" },
    ],
    whyInvest: [
      "Fully furnished, move-in ready",
      "Flexible month-to-month leasing",
      "Ideal for startups & remote teams",
      "Shared meeting rooms & amenities included",
    ],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDbn4wJaTf5wICo98jM0CJHHH6Z-yiwarBQ3YwFjnPed6-J-hITAn8DOBJN2zkIYE0yC7q3AullfUrx_Y0wUVMlFOjQZtHiLkmDcA5woLNFHFywwEopFLMDT6c_IAqvtfZ9aqopsQ80PspbuvOI5inXYk7UV44b9EASHYPUs6ynVu2-I_htRNJtrYa5MAeGr6d88GeNykj1SnctL8uu8yUFxzLmPqBYKQ3cWSUyd1fpTEJPn4ZWvMVngxYJem0xz7pOkg",
  },
  {
    key: "industrial-warehouse",
    name: "Industrial Warehouse",
    tagline: "Built for Storage & Scale",
    type: "Warehouse / Industrial",
    badge: null,
    location: "Kharar, Punjab",
    area: "10,000 sq ft",
    priceRange: "₹ 3.20 Cr",
    priceNote: "₹ 3,200 / sq ft",
    possession: "Ready to Move",
    totalArea: "2.5 Acres",
    totalUnits: "1 unit",
    configurations: "Open Floor Warehouse + Loading Dock",
    tags: ["RERA Approved", "High Ceiling", "Highway Access"],
    description:
      "A large-format industrial warehouse in Kharar with high ceilings, a dedicated loading dock and direct highway access — suited for logistics, storage or light manufacturing.",
    overviewSummary:
      "Built for scale, this warehouse offers a clear-span open floor, heavy vehicle access, and strong connectivity to major highways for logistics operations.",
    floorPlans: [{ type: "Full Warehouse", area: "10,000 sq ft" }],
    whyInvest: [
      "Large clear-span open floor plan",
      "Direct highway & logistics access",
      "Dedicated loading dock",
      "Strong demand from logistics & 3PL firms",
    ],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDTT6PlHrR4FxVOSAwzC6eEd0G5uGYavxCl0VlZEPnPWzQhQ6lnyRx5zO-5dynB5nfyPz1aQApiHmxJaQQ3WRBoKVa9yOyTyc-foR60TpccOdIXwKTdjM_ZdnH-qILg-lp0SBj-fOlh6JBXKBjuRt2efwa9dP0nHiFh9P8H0DYr3etx8pPuRV59lPS1BndvKGQu9Z_GAS9ByOnZM9_kB7JQrW_jC4Sfbo6js9F9g3_izmFOYPHjOmP2UOVLlMbL9SrMdw",
  },
  {
    key: "premium-showroom",
    name: "Premium Showroom",
    tagline: "Make an Impression on Every Visitor",
    type: "Showroom",
    badge: null,
    location: "Chandigarh Highway, Mohali",
    area: "3,000 sq ft",
    priceRange: "₹ 2.40 Cr",
    priceNote: "₹ 8,000 / sq ft",
    possession: "Ready to Move",
    totalArea: "0.9 Acres",
    totalUnits: "8+",
    configurations: "Double-Height Display Floor",
    tags: ["RERA Approved", "Highway Frontage", "Double Height"],
    description:
      "Premium Showroom offers double-height display space with direct Chandigarh Highway frontage — ideal for automobile, furniture, or lifestyle brand showrooms.",
    overviewSummary:
      "Positioned for maximum visibility on Chandigarh Highway, this showroom space is built with a double-height display floor to give brands a striking storefront presence.",
    floorPlans: [{ type: "Showroom Floor", area: "3,000 sq ft" }],
    whyInvest: [
      "Direct highway frontage & visibility",
      "Double-height display floor",
      "High traffic commercial corridor",
      "Suited for premium retail brands",
    ],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBNU1P8m--Z2s9TBaZ1kGtrO3YJ-au8V16UUc6RScmelexVl6_GZahRX2uNya9zZaIqWsKifNSx3WUrLTZumtyrFe9p27Z3ph-uqXqTS_SDYCoq-SQL4BzjukxNMRsBXwEm426FCkITOB4hPAlFClEpm4c8czzBpyjDD7nDiWh5MB-6QbWlYNQEmcFIkXiQHKWFuJ7xkf3LNtGg5QK2XVRp6oRhm-YzcGC4gMRay3n88HqBjHWrso6CvBRpvbYvBfpLMw",
  },
  {
    key: "business-park-office",
    name: "Business Park Office",
    tagline: "Work Smarter in a Managed Campus",
    type: "Office Space",
    badge: null,
    location: "Sector 70, Mohali",
    area: "2,100 sq ft",
    priceRange: "₹ 1.35 Cr",
    priceNote: "₹ 6,428 / sq ft",
    possession: "Mar 2027",
    totalArea: "3.2 Acres",
    totalUnits: "90+",
    configurations: "Managed Office Floors",
    tags: ["RERA Approved", "IT Park", "Managed Campus"],
    description:
      "Business Park Office is a managed office space within Sector 70's growing IT corridor, offering efficient floor plates and campus-style amenities.",
    overviewSummary:
      "Located within a professionally managed business park, this office space offers efficient layouts, shared campus amenities and strong connectivity for IT & corporate occupiers.",
    floorPlans: [
      { type: "Compact Office", area: "1,100 sq ft" },
      { type: "Full Floor", area: "2,100 sq ft" },
    ],
    whyInvest: [
      "Located in growing Sector 70 IT corridor",
      "Professionally managed business park",
      "Efficient, modern floor plates",
      "Good connectivity to Mohali & Chandigarh",
    ],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBILhx2HhQxm2hFsXExuLL1fqgT7i43xcS9Fp3BolgRBVUPHxRnqFf_nYkIkwac1cxiuDR4pXSagiVjyfaQpD4iGxfyi0BJqbl2bwA5lLzn2qbbeQ8paV3dN3o42SGScd8q6uVSibt_WEjZLSY9sHNGdI09c3bk5QK9CeapP8gxsamk87e1eIDmusCmuohO4yWycwKoGHa1z53oYc63fJpQw8jcTfKiW07w-lDey-RUi_AyP8LVH9AplWp_fxrlXzpKXA",
  },
];

export function getCommercialProperty(key) {
  return COMMERCIAL_PROPERTIES.find((p) => p.key === key);
}