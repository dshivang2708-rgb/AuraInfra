import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Approximate coordinates for Sector 82, Mohali, Punjab — adjust if you have the exact address pin.
const OFFICE_LOCATION = { lat: 30.6942, lng: 76.7304 };

const PIN_ICON = L.divIcon({
  className: "",
  html: `
    <div style="position:relative;width:40px;height:40px;">
      <div style="position:absolute;inset:0;background:#1a6b32;opacity:0.25;border-radius:9999px;transform:scale(1.8);animation:map-pulse 2.2s infinite ease-out;"></div>
      <div style="position:relative;width:40px;height:40px;background:#071837;border:3px solid white;border-radius:9999px;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 12px rgba(7,24,55,0.4);">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
          <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
        </svg>
      </div>
    </div>
  `,
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});

export default function MapEmbed() {
  const containerRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current || !containerRef.current) return;

    const map = L.map(containerRef.current, {
      center: [OFFICE_LOCATION.lat, OFFICE_LOCATION.lng],
      zoom: 15,
      scrollWheelZoom: false,
      zoomControl: true,
    });
    mapRef.current = map;

    // CARTO Positron — a clean, modern, light-mode basemap (free, no API key required).
    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: "abcd",
      maxZoom: 19,
    }).addTo(map);

    L.marker([OFFICE_LOCATION.lat, OFFICE_LOCATION.lng], { icon: PIN_ICON }).addTo(map);

    // Leaflet caches the container size at init time; if the container's size is
    // still settling (flex layout, font loading, etc.) the tiles can render
    // offset or only partially. Force a recheck shortly after mount and on resize.
    const fixSize = () => map.invalidateSize();
    const timeoutId = setTimeout(fixSize, 200);
    window.addEventListener("resize", fixSize);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", fixSize);
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <>
      <style>{`
        @keyframes map-pulse {
          0% { transform: scale(1); opacity: 0.35; }
          100% { transform: scale(2.4); opacity: 0; }
        }
        .leaflet-control-zoom { border: none !important; box-shadow: 0 2px 8px rgba(0,0,0,0.15) !important; }
        .leaflet-control-zoom a { color: #071837 !important; }
        .leaflet-control-attribution { font-size: 9px !important; background: rgba(255,255,255,0.8) !important; }
      `}</style>
      <div ref={containerRef} className="absolute inset-0 w-full h-full" />
    </>
  );
}