// Shared data for agriculture property cards (ResultsGrid) and their detail pages.
// Each entry's `key` is used as the route slug: /properties/agriculture/:key

export const AGRICULTURE_PROPERTIES = [
  {
    key: "premium-agri-land",
    name: "Premium Agricultural Land",
    tagline: "Fertile Land. Better Future.",
    badge: "Agricultural Land",
    location: "Kharar, Mohali, Punjab",
    area: "15 Acre",
    price: "₹ 1.20 Cr",
    priceRange: "₹ 1.20 Cr - ₹ 1.80 Cr",
    priceNote: "₹ 8.00 L / Acre",
    soilType: "Loamy",
    possession: "Dec 2026",
    tags: [
      { icon: "verified", label: "RERA Approved" },
      { icon: "eco", label: "Agricultural Land" },
      { icon: "compost", label: "High Fertility Soil" },
      { icon: "map", label: "Prime Location" },
    ],
    description:
      "Premium Agricultural Land offers excellent soil fertility, ideal for farming, plantation or long-term investment. Located in a high potential area with easy access to major roads and markets.",
    areaOptions: [
      { size: "10 Acre", price: "₹ 80 Lakh" },
      { size: "15 Acre", price: "₹ 1.20 Cr" },
    ],
    nearby: [
      { icon: "directions_car", time: "05 mins", place: "Kharar Bus Stand" },
      { icon: "directions_car", time: "10 mins", place: "Kharar Railway Station" },
      { icon: "directions_car", time: "15 mins", place: "Chandigarh Airport" },
      { icon: "directions_car", time: "20 mins", place: "Mohali IT Park" },
    ],
    whyInvest: [
      "Prime location with high growth potential",
      "Excellent soil & water availability",
      "Perfect for farming or long-term investment",
      "Easy connectivity to Chandigarh & Mohali",
    ],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB5OS9Jo6WY0daixmpP_T8GJD884PyS2aW3ERJNu6tKiA-RDZclvuSgtRQMKiKsDNv75Pdbg91n0EJTPXFuza53ZwbwXxgEp02IjfevF7Ew8waPq-hszPGEWIvaTrXLcOwqKejR2IrCheFN_QwSIMWAtdTN36OaeuzL6L_jMUJYAElIwsSsrwmP0iWYFr-_M6LNPrqLtT8Gl2jBDcQ5qyL9T4p6aCKb3zl2eacfcmhXN71htYTvrMCj",
  },
  {
    key: "farmhouse-land",
    name: "Farmhouse Land",
    tagline: "Peaceful Living. Fertile Ground.",
    badge: "Farmhouse Land",
    location: "Zirakpur, Punjab",
    area: "6 Acre",
    price: "₹ 60.00 L",
    priceRange: "₹ 60.00 L - ₹ 90.00 L",
    priceNote: "₹ 10.00 L / Acre",
    soilType: "Alluvial",
    possession: "Ready to Move",
    tags: [
      { icon: "verified", label: "RERA Approved" },
      { icon: "cottage", label: "Farmhouse Land" },
      { icon: "compost", label: "Fertile Soil" },
      { icon: "map", label: "Prime Location" },
    ],
    description:
      "Farmhouse Land in Zirakpur offers a peaceful retreat with fertile ground, perfect for building your dream farmhouse or a weekend getaway close to the city.",
    areaOptions: [
      { size: "4 Acre", price: "₹ 40 Lakh" },
      { size: "6 Acre", price: "₹ 60 Lakh" },
    ],
    nearby: [
      { icon: "directions_car", time: "08 mins", place: "Zirakpur Bus Stand" },
      { icon: "directions_car", time: "12 mins", place: "Zirakpur Flyover" },
      { icon: "directions_car", time: "20 mins", place: "Chandigarh Airport" },
      { icon: "directions_car", time: "10 mins", place: "PR7 Highway" },
    ],
    whyInvest: [
      "Close to Zirakpur & Chandigarh city",
      "Fertile alluvial soil, easy to develop",
      "Perfect for a farmhouse or weekend retreat",
      "Growing real estate demand in the area",
    ],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBdSILMFwiqb0xF6JVGUMCzFR01xhLAMWL-DMxYsBAjz78xEW0xJPPhLSVlOD_EvymMMu_nsSPR9aBsx0xSOaYOIq5ngRQwxi80Dtk8U2As5w1z4UUZm4iBwgNg9qZZtcWVVTvJ3v4fMk93jg4ww3iU1n42YQQcEIL0jzesecgyyH8gcOeodQmfWS7F_wq11xrRVOMKPGPFRcHmUMB0eIpp8YDlDJ-jY9lZfpkbtgfc_Ry625LSC3FL",
  },
  {
    key: "mango-plantation",
    name: "Mango Plantation",
    tagline: "Established Orchard. Ready Yield.",
    badge: "Plantation",
    location: "Ropar, Punjab",
    area: "25 Acre",
    price: "₹ 2.25 Cr",
    priceRange: "₹ 2.25 Cr - ₹ 2.80 Cr",
    priceNote: "₹ 9.00 L / Acre",
    soilType: "Sandy Loam",
    possession: "Ready to Move",
    tags: [
      { icon: "verified", label: "RERA Approved" },
      { icon: "forest", label: "Established Plantation" },
      { icon: "compost", label: "Fertile Soil" },
      { icon: "map", label: "Prime Location" },
    ],
    description:
      "A well-established Mango Plantation with mature, fruit-bearing trees in Ropar. Ideal for an income-generating orchard investment or expansion of an existing agri-business.",
    areaOptions: [
      { size: "15 Acre", price: "₹ 1.35 Cr" },
      { size: "25 Acre", price: "₹ 2.25 Cr" },
    ],
    nearby: [
      { icon: "directions_car", time: "10 mins", place: "Ropar Bus Stand" },
      { icon: "directions_car", time: "15 mins", place: "Ropar Railway Station" },
      { icon: "directions_car", time: "40 mins", place: "Chandigarh Airport" },
      { icon: "directions_car", time: "05 mins", place: "Sutlej Riverbank" },
    ],
    whyInvest: [
      "Mature orchard with established yield",
      "Sandy loam soil ideal for fruit trees",
      "Strong local market for produce",
      "Good road connectivity to Ropar",
    ],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAfma_QUpcEq_mcdWTlYi1Nuv4oGkYuOz6MXlhxf7w31sVwuInZGgwvurfLbqQOQAjFpND87QgigNhyywg9596QVrpJi7cz0k8VNvtqsKOEuJkhjX2AJrRWOlZT_OL4MCcgkTws5ADmM1ZrdbgP0qfiTNQrvBxRPpv4fkDuBhHUslVjGRiG4PsR7C65AL-R77yKYuk7pAy3N57oyQUrHEIEXZ6rLJ6JkakdWCOvpA70TSzayvNEWojK",
  },
  {
    key: "horticulture-land",
    name: "Horticulture Land",
    tagline: "Bloom Where You're Planted.",
    badge: "Horticulture Land",
    location: "Derabassi, Punjab",
    area: "12 Acre",
    price: "₹ 1.10 Cr",
    priceRange: "₹ 1.10 Cr - ₹ 1.50 Cr",
    priceNote: "₹ 9.16 L / Acre",
    soilType: "Loamy",
    possession: "Dec 2026",
    tags: [
      { icon: "verified", label: "RERA Approved" },
      { icon: "local_florist", label: "Horticulture Land" },
      { icon: "compost", label: "High Fertility Soil" },
      { icon: "map", label: "Prime Location" },
    ],
    description:
      "Horticulture Land in Derabassi, well-suited for flower, vegetable, or fruit cultivation with good soil fertility and reliable water access.",
    areaOptions: [
      { size: "6 Acre", price: "₹ 55 Lakh" },
      { size: "12 Acre", price: "₹ 1.10 Cr" },
    ],
    nearby: [
      { icon: "directions_car", time: "07 mins", place: "Derabassi Bus Stand" },
      { icon: "directions_car", time: "12 mins", place: "Derabassi Railway Station" },
      { icon: "directions_car", time: "25 mins", place: "Chandigarh Airport" },
      { icon: "directions_car", time: "15 mins", place: "Zirakpur Highway" },
    ],
    whyInvest: [
      "Suited for flower, fruit & vegetable farming",
      "Good soil & water availability",
      "Growing horticulture demand nearby",
      "Easy connectivity to Chandigarh region",
    ],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA2z0-cb2g_HdvDPNiJczsmVPc0RQgDaWCUFE5_FT7e_l_mAuZG-Oes8NLsh06Xg1laVigXCNNj13LAsRHYvOLEVUoHdzeCsdiu8meujN2C1QGOuKfFTw-eZ6lloHxErt2IqxSOLa9-rrhXghTeFD4-cjCn4fP_46Zr1jaVDlAfGEbGjd_wyUdyJ1SrEPAd29epKnrzUbtq6lRQr_tQ71PA5IYg3t4L4uz30EVSJzmRWwZIHV3FWbxH",
  },
  {
    key: "dairy-farm-land",
    name: "Dairy Farm Land",
    tagline: "Room to Grow, Land to Graze.",
    badge: "Dairy / Farm Land",
    location: "Kharar, Punjab",
    area: "20 Acre",
    price: "₹ 1.80 Cr",
    priceRange: "₹ 1.80 Cr - ₹ 2.20 Cr",
    priceNote: "₹ 9.00 L / Acre",
    soilType: "Clay Loam",
    possession: "Ready to Move",
    tags: [
      { icon: "verified", label: "RERA Approved" },
      { icon: "agriculture", label: "Dairy / Farm Land" },
      { icon: "water_drop", label: "Good Water Access" },
      { icon: "map", label: "Prime Location" },
    ],
    description:
      "Spacious Dairy Farm Land in Kharar with ample grazing area and dependable water access — ideal for setting up or expanding a dairy operation.",
    areaOptions: [
      { size: "10 Acre", price: "₹ 90 Lakh" },
      { size: "20 Acre", price: "₹ 1.80 Cr" },
    ],
    nearby: [
      { icon: "directions_car", time: "10 mins", place: "Kharar Bus Stand" },
      { icon: "directions_car", time: "15 mins", place: "Kharar Railway Station" },
      { icon: "directions_car", time: "30 mins", place: "Chandigarh Airport" },
      { icon: "directions_car", time: "20 mins", place: "Mohali IT Park" },
    ],
    whyInvest: [
      "Ample grazing area for dairy operations",
      "Dependable water availability",
      "Strong local dairy market access",
      "Easy connectivity to Mohali & Chandigarh",
    ],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA1lrNmUQ29RlDtFTvCRbFW3IaM1T87FeB8YmMK_l1gTi1ZYx2Xo7n7Z3y5DAIGMVPpduCEONdZ7VDM1gC9y76dc4JubnT4YQDe6UlSj_i_QCfXCitPUFmpq5enI4hPsqSNzJ0-Bc4nDyGbMWi_oQp8SSnrPqncYsbXcAj2VFetNMvAWtGKHDUeMfnVN9-o87fYHMSpPX_XFGlx6pm7VBT-jgLxfRrMKpsLueeXXdQGbvtf6J9kYva_",
  },
  {
    key: "fertile-agri-land",
    name: "Fertile Agricultural Land",
    tagline: "Fertile Land. Better Future.",
    badge: "Agricultural Land",
    location: "Anandpur Sahib, Punjab",
    area: "30 Acre",
    price: "₹ 2.70 Cr",
    priceRange: "₹ 2.70 Cr - ₹ 3.20 Cr",
    priceNote: "₹ 9.00 L / Acre",
    soilType: "Loamy",
    possession: "Dec 2026",
    tags: [
      { icon: "verified", label: "RERA Approved" },
      { icon: "eco", label: "Agricultural Land" },
      { icon: "compost", label: "High Fertility Soil" },
      { icon: "map", label: "Prime Location" },
    ],
    description:
      "Large fertile agricultural landholding in Anandpur Sahib, ideal for farming, plantation, or long-term land banking with strong future appreciation potential.",
    areaOptions: [
      { size: "15 Acre", price: "₹ 1.35 Cr" },
      { size: "30 Acre", price: "₹ 2.70 Cr" },
    ],
    nearby: [
      { icon: "directions_car", time: "12 mins", place: "Anandpur Sahib Bus Stand" },
      { icon: "directions_car", time: "18 mins", place: "Anandpur Sahib Railway Station" },
      { icon: "directions_car", time: "50 mins", place: "Chandigarh Airport" },
      { icon: "directions_car", time: "10 mins", place: "Sutlej Riverbank" },
    ],
    whyInvest: [
      "Large landholding with growth potential",
      "Excellent soil & water availability",
      "Perfect for farming or long-term investment",
      "Peaceful setting near Anandpur Sahib",
    ],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDPRwvU6Hfw3F-z_QUEbRpcy4KRB5zB7_K-cZjSEK1LTL4RDvg8cS05VV7hDVbIX8HyZlZXbnN86LBvvLTDiRivfNxrZMsxR5jEz-le1EMWDxsOIvOctcjtCmcowh37Pq4DA1aMhwJffAlPTezMeLA3sKYvVU49tM7GhTgfqQbQAs-bVeeUo8NEsNkNCaa9iHN2OkGlnVyrlIzoT-j1tR07LCIb3MYjnhV7nPxoOpzgm_PYmwfKXUOd",
  },
];

export function getAgricultureProperty(key) {
  return AGRICULTURE_PROPERTIES.find((p) => p.key === key);
}