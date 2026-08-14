// Google Maps embed (no API key required) — uses the public /maps embed URL.
// Same coordinates previously used for the Leaflet pin (Sector 82, Mohali, Punjab).
const OFFICE_COORDS = "30.6491102,76.7394671";
const MAP_EMBED_SRC = `https://www.google.com/maps?q=${OFFICE_COORDS}&z=15&output=embed`;

export default function MapEmbed() {
  return (
    <iframe
      title="Aura Infra Office Location"
      src={MAP_EMBED_SRC}
      className="absolute inset-0 w-full h-full border-0"
      loading="lazy"
      allowFullScreen
      referrerPolicy="no-referrer-when-downgrade"
    />
  );
}