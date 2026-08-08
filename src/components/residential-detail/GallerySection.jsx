export default function GallerySection({ property }) {
  const images = [property.image, ...(property.gallery || [])].filter(Boolean);

  if (images.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 border-l-4 border-[#1a6b32] pl-3">Gallery</h3>
        <p className="text-sm text-gray-500">Photos for this project will be published shortly.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4 border-l-4 border-[#1a6b32] pl-3">Gallery</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {images.map((src, i) => (
          <img
            key={src + i}
            src={src}
            alt={`${property.name} photo ${i + 1}`}
            className="w-full h-40 object-cover rounded-lg border border-gray-200"
          />
        ))}
      </div>
    </div>
  );
}
