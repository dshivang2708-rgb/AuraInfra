// Maps a project's category to its detail-page route. Shared by any section
// that mixes projects from multiple categories together (Featured
// Properties, Upcoming Projects) and needs to link each card to the right
// place.
export const CATEGORY_DETAIL_ROUTES = {
  residential: "/properties/residential/$slug",
  commercial: "/properties/commercial/$slug",
  agriculture: "/properties/agriculture/$slug",
  premium: "/properties/premium-projects/$slug",
};