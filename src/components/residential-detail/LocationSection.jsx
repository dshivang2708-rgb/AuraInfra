export default function LocationSection({ property }) {
  const mapQuery = encodeURIComponent(`${property.name}, ${property.location}`);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4 border-l-4 border-[#1a6b32] pl-3">Location</h3>
      <p className="text-sm text-gray-600 flex items-center gap-2 mb-4">
        <i className="fa-solid fa-location-dot text-[#1a6b32]" /> {property.location}
      </p>
      <div className="w-full h-80 rounded-lg overflow-hidden border border-gray-200">
        <iframe
          title={`Map showing ${property.name}`}
          className="w-full h-full"
          loading="lazy"
          src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
        />
      </div>
    </div>
  );
}
