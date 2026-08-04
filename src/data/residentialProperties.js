// Shared data for residential property cards (PropertyGrid) and their detail pages.
// Each entry's `key` is used as the route slug: /properties/residential/:key

export const AMENITIES = [
  { icon: "fa-solid fa-house-chimney-user", label: "Clubhouse" },
  { icon: "fa-solid fa-water-ladder", label: "Swimming Pool" },
  { icon: "fa-solid fa-dumbbell", label: "Gym" },
  { icon: "fa-solid fa-person-running", label: "Jogging Track" },
  { icon: "fa-solid fa-child-reaching", label: "Kids Play Area" },
  { icon: "fa-brands fa-pagelines", label: "Garden" },
  { icon: "fa-solid fa-spa", label: "Yoga Deck" },
  { icon: "fa-solid fa-shield-halved", label: "24/7 Security" },
  { icon: "fa-solid fa-video", label: "CCTV" },
  { icon: "fa-solid fa-car-battery", label: "Power Backup" },
];

export const RESIDENTIAL_PROPERTIES = [
  {
    key: "aura-greens",
    name: "Aura Greens",
    tagline: "Luxury Homes for a Greener Tomorrow",
    badge: "Premium",
    location: "Sector 82, Mohali, Punjab",
    beds: "2, 3, 3.5 & 4 BHK",
    area: "1200 - 2400 Sq.ft",
    price: "₹ 85 Lakh – 1.80 Cr",
    priceRange: "₹ 85 Lakh - ₹ 1.8 Cr",
    priceNote: null,
    possession: "Dec 2026",
    totalArea: "5.8 Acres",
    totalUnits: "280+",
    configurations: "2 BHK, 3 BHK, 4 BHK",
    tags: [
      { icon: "fa-solid fa-circle-check", label: "RERA Approved" },
      { icon: "fa-solid fa-gem", label: "Luxury Project" },
      { icon: "fa-solid fa-leaf", label: "Green Living" },
      { icon: "fa-solid fa-map-pin", label: "Prime Location" },
    ],
    description:
      "Aura Greens is a premium residential project that blends modern architecture with sustainable living. Designed for a better tomorrow, it offers spacious homes, green spaces and world-class amenities in the heart of Mohali.",
    overviewSummary:
      "Aura Greens is a thoughtfully designed residential community that brings together luxury, comfort and sustainability. With spacious homes, lush green surroundings and modern amenities, it's the perfect place to build your future.",
    floorPlans: [
      { type: "2 BHK", area: "1200 Sq.ft" },
      { type: "3 BHK", area: "1600 Sq.ft" },
      { type: "4 BHK", area: "2400 Sq.ft" },
    ],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBhpPMQEROcgq6pUiN9L9zExF3gX5KH6Zpn86Z9bTTKbPFKALMhXFktnCRMtn3gKTGzWKhnJBd_1zurPSiuYvFD1G8X-bUZNwtmqtd5PHeom9sstoPz618YAGn0ElPmG8PEVWIqJ6hEQMawG5gimoJ3NUtO03ac9XjAw37QrAhU_xKrKLol1yV65X2UjgDHtbYuj_OdZGPORYpYtK_9TDqUt9U090YiZpJymqH7fdAS1SLjtGDMWD4KFhKBOZ__yFJDHA",
  },
  {
    key: "skyline-residency",
    name: "Skyline Residency",
    tagline: "Elevated Living in the Heart of the City",
    badge: "New Launch",
    location: "Aerocity, Mohali, Punjab",
    beds: "3 & 4 BHK",
    area: "1100 - 2200 Sq.ft",
    price: "₹ 1.60 Cr",
    priceRange: "₹ 1.60 Cr Onwards",
    priceNote: "Onwards",
    possession: "Jun 2027",
    totalArea: "4.2 Acres",
    totalUnits: "180+",
    configurations: "3 BHK, 4 BHK",
    tags: [
      { icon: "fa-solid fa-circle-check", label: "RERA Approved" },
      { icon: "fa-solid fa-building", label: "New Launch" },
      { icon: "fa-solid fa-plane", label: "Near Airport" },
      { icon: "fa-solid fa-map-pin", label: "Prime Location" },
    ],
    description:
      "Skyline Residency offers elevated city living with modern high-rise towers, panoramic views and premium amenities, ideally located in Mohali's fast-growing Aerocity.",
    overviewSummary:
      "Skyline Residency is a modern high-rise development designed for professionals and families who want easy connectivity, contemporary design and a strong sense of community.",
    floorPlans: [
      { type: "3 BHK", area: "1600 Sq.ft" },
      { type: "4 BHK", area: "2200 Sq.ft" },
    ],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDJSIpNQiM1TTiFV_jv7OCKKeU9azG72tY8vPTz9nRKyqGFbPpRXWCw7QmxEUnKl_hidqhVTLkFONUdPBDuzlSGbdhC_obG68rkl6EIIdwjAT--kT9lK-G6D193oymf8JfXUQn3IGzF8Er8eA9X732i97mimcOoeGuwgQ5aeL9v1y6nO8J4NOTa8BQknIsQpnDG1uegTtXJV2SuJSnM4RZv8IdNzf6hy6nntPMPOn5laMzPCAvaxgBIKsqOU7Qt1e4sLQ",
  },
  {
    key: "homeland-avenue",
    name: "Homeland Avenue",
    tagline: "Spacious Family Living, Redefined",
    badge: "Ready to Move",
    location: "Sector 88, Mohali, Punjab",
    beds: "3, 4 & 5 BHK",
    area: "1500 - 3000 Sq.ft",
    price: "₹ 1.20 Cr",
    priceRange: "₹ 1.20 Cr Onwards",
    priceNote: "Onwards",
    possession: "Ready to Move",
    totalArea: "6.5 Acres",
    totalUnits: "320+",
    configurations: "3 BHK, 4 BHK, 5 BHK",
    tags: [
      { icon: "fa-solid fa-circle-check", label: "RERA Approved" },
      { icon: "fa-solid fa-key", label: "Ready to Move" },
      { icon: "fa-solid fa-tree", label: "Park Facing" },
      { icon: "fa-solid fa-map-pin", label: "Prime Location" },
    ],
    description:
      "Homeland Avenue offers spacious, ready-to-move family homes with generous layouts, dedicated green spaces and a strong sense of community in Sector 88, Mohali.",
    overviewSummary:
      "Homeland Avenue is built for families who want more room to grow — large layouts, park-facing residences and a well-established neighborhood, ready to move in today.",
    floorPlans: [
      { type: "3 BHK", area: "1500 Sq.ft" },
      { type: "4 BHK", area: "2200 Sq.ft" },
      { type: "5 BHK", area: "3000 Sq.ft" },
    ],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDW4UgRHov8gJpAb0oNQAHjYCqu4WL8wl7cUQ33einXWQAUnOdEGc7xemRWLGfnMht9n-Z-iC36XX74kQHDYW06hB5MHwOmQUExytvm3IEBmdRUARNHFn8755jVw_8uMa7MRold-SbNA1cADm6DELDcM97hugFRydpacBraSi67aPtztDhsAa2aLy90r4NXmpVTErfBXbmV_nxHZEJOzzMkekwUwM5C2xq0oq5rWpwT1HxHSDIteK-bi4jgV5mFXWe2Hg",
  },
  {
    key: "aura-grande",
    name: "Aura Grande",
    tagline: "Grand Living, Timeless Design",
    badge: "Premium",
    location: "Sector 82, Mohali, Punjab",
    beds: "3 & 4 BHK",
    area: "1300 - 2500 Sq.ft",
    price: "₹ 2.35 Cr",
    priceRange: "₹ 2.35 Cr Onwards",
    priceNote: "Onwards",
    possession: "Mar 2027",
    totalArea: "5.0 Acres",
    totalUnits: "210+",
    configurations: "3 BHK, 4 BHK",
    tags: [
      { icon: "fa-solid fa-circle-check", label: "RERA Approved" },
      { icon: "fa-solid fa-gem", label: "Luxury Project" },
      { icon: "fa-solid fa-tree", label: "Club View" },
      { icon: "fa-solid fa-map-pin", label: "Prime Location" },
    ],
    description:
      "Aura Grande is a premium address offering expansive homes, clubhouse views and timeless architectural design in one of Mohali's most sought-after sectors.",
    overviewSummary:
      "Aura Grande combines grand-scale architecture with thoughtful interior planning, offering residents a refined lifestyle backed by premium amenities and club views.",
    floorPlans: [
      { type: "3 BHK", area: "1800 Sq.ft" },
      { type: "4 BHK", area: "2500 Sq.ft" },
    ],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBrBio0MZ7S3yJT7HPaHW8rey9qVualM9QuYYgr8mwZcGE1QFJsllFPbMemFOJyHKdELGTg2IwXBwOpHIxhtmmVJbHCNNA7LUqw0kwUTAcgD4gKZnKLCg7gPynlwyou6hFTrzywAi4pkxeFAPCosQJ1b3WYBN0Nys7j1aja2Ro0DpwYKDhecZZmO80oe5bB84oyjeg4SbhmvrU6HWEEMj6Cj_lse74rlAuCq38vr7iIkvEFo6ZDQKAUFLlG9uaUB51L-w",
  },
  {
    key: "aurelia-heights",
    name: "Aurelia Heights",
    tagline: "Modern Comfort, Elevated Standards",
    badge: "New Launch",
    location: "Sector 79, Mohali, Punjab",
    beds: "3 & 4 BHK",
    area: "1250 - 2300 Sq.ft",
    price: "₹ 1.45 Cr",
    priceRange: "₹ 1.45 Cr Onwards",
    priceNote: "Onwards",
    possession: "Sep 2027",
    totalArea: "4.5 Acres",
    totalUnits: "190+",
    configurations: "3 BHK, 4 BHK",
    tags: [
      { icon: "fa-solid fa-circle-check", label: "RERA Approved" },
      { icon: "fa-solid fa-building", label: "New Launch" },
      { icon: "fa-solid fa-shield-halved", label: "Gated Community" },
      { icon: "fa-solid fa-map-pin", label: "Prime Location" },
    ],
    description:
      "Aurelia Heights brings modern comfort and elevated design standards to Sector 79, with a gated community setting and a full suite of lifestyle amenities.",
    overviewSummary:
      "Aurelia Heights is designed for those who want modern comfort without compromise — secure, well-planned, and equipped with everything a growing family needs.",
    floorPlans: [
      { type: "3 BHK", area: "1650 Sq.ft" },
      { type: "4 BHK", area: "2300 Sq.ft" },
    ],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDjxWsQCNFYJagae7ZaYluBwM1Wl1QRPMGYzRSJ9s0movzmwEUKqr6ED61nm_C9_8ClTPCzSAHr3awArJ0-mzlrE1mFyPQVX1TAFqwIqVzQnpy3HAN97gzhFcxod_kpRk3j_jDdPzcybE8DWzj7P6CJrFSXVHkvBa9OEKwRtcCL89TLOs_B4v2xQFb0Yap7PG_sTxu-LPptx2F9aredST0-DqrXLALnDKIneOG8FFy7sMeQZi029-S-qlwfB4lmlutDxg",
  },
  {
    key: "elysian-heights",
    name: "Elysian Heights",
    tagline: "Where Elevated Living Meets Serenity",
    badge: "Premium",
    location: "Sector 82A, Mohali, Punjab",
    beds: "4 BHK",
    area: "2000 - 3500 Sq.ft",
    price: "₹ 3.20 Cr",
    priceRange: "₹ 3.20 Cr Onwards",
    priceNote: "Onwards",
    possession: "Dec 2027",
    totalArea: "7.2 Acres",
    totalUnits: "150+",
    configurations: "4 BHK",
    tags: [
      { icon: "fa-solid fa-circle-check", label: "RERA Approved" },
      { icon: "fa-solid fa-gem", label: "Luxury Project" },
      { icon: "fa-solid fa-leaf", label: "Green Living" },
      { icon: "fa-solid fa-map-pin", label: "Prime Location" },
    ],
    description:
      "Elysian Heights is an ultra-premium 4 BHK residential address offering serene surroundings, expansive layouts and an unmatched suite of amenities in Sector 82A.",
    overviewSummary:
      "Elysian Heights sets a new benchmark for luxury in Mohali — spacious 4 BHK residences, generous green cover, and amenities designed for a truly elevated lifestyle.",
    floorPlans: [{ type: "4 BHK", area: "3000 Sq.ft" }],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB-wWIgrWV_NdmjS1JciwJgA7AMbEa0XuN7teGThztTS2bl07ChBv6esjshEZFgZtCg6m592CyQZy-cGpXcuAG0TBKNkhhZTA77yf4EeribnHDvMo0gLI-CtcBajk7CbOXm4wQJYiguTW6xcsP0tg2mNPIVbPZiFMDhSrynUArtzAajng39SGQR615np0KP-9rsgOnkkRIgFY58ldk-7M5Gr6xyV9SCZ3T8QSQ1DIQIxdfARWjHCRdU4xlnyN_gK4_ycw",
  },
];

export function getResidentialProperty(key) {
  return RESIDENTIAL_PROPERTIES.find((p) => p.key === key);
}