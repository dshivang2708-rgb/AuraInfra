export default function LocationSection({ property }) {
  const mapQuery = encodeURIComponent(`${property.name}, ${property.location}`);

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Location</h3>
      <p className="text-sm text-gray-600 flex items-center gap-2 mb-4">
        <span className="material-symbols-outlined text-base text-[#1a6b32]">location_on</span> {property.location}
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