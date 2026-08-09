const DEFAULT_AMENITIES = [
  { icon: "pool", label: "Swimming Pool" },
  { icon: "fitness_center", label: "Gym" },
  { icon: "park", label: "Landscaped Gardens" },
  { icon: "security", label: "24x7 Security" },
  { icon: "local_parking", label: "Ample Parking" },
  { icon: "groups", label: "Clubhouse" },
];

export default function Amenities({ property }) {
  const amenities = property.amenities?.length ? property.amenities : DEFAULT_AMENITIES;

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-6">Amenities</h3>
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-6 text-center">
        {amenities.map((item) => (
          <div key={item.label} className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-[#eaf4ef] flex items-center justify-center text-[#1a6b32]">
              <span className="material-symbols-outlined text-xl">{item.icon}</span>
            </div>
            <span className="text-xs text-gray-600 font-medium">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}