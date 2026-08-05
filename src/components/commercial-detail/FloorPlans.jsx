export default function FloorPlans({ property }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Floor / Unit Options</h3>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {property.floorPlans.map((plan) => (
          <div key={plan.type} className="min-w-[150px] border border-gray-200 rounded-xl p-3 text-center">
            <img alt={plan.type} className="w-full h-32 object-cover rounded-lg mb-2" src={property.image} />
            <p className="font-bold text-gray-900 text-sm">{plan.type}</p>
            <p className="text-xs text-gray-500">{plan.area}</p>
          </div>
        ))}
      </div>
    </div>
  );
}