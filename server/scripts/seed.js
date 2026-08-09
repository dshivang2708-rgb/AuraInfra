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
      propertyType: p.propertyType,
      beds: p.beds,
      totalArea: p.totalArea,
      totalUnits: p.totalUnits,
      configurations: p.configurations,
      overviewSummary: p.overviewSummary,
      floorPlans: p.floorPlans ?? [],
    },
  };
}