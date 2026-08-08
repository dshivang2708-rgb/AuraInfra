export default function FloorPlans({ property }) {
  const plans = property.floorPlans || [];

  if (plans.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 relative">
        <h3 className="text-lg font-bold text-gray-900 mb-4 border-l-4 border-[#1a6b32] pl-3">Floor Plans</h3>
        <p className="text-sm text-gray-500">Floor plans for this project will be published shortly.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 relative">
      <h3 className="text-lg font-bold text-gray-900 mb-4 border-l-4 border-[#1a6b32] pl-3">Floor Plans</h3>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {plans.map((plan) => (
          <div key={plan.type} className="min-w-[140px] border border-gray-200 rounded-lg p-2 text-center">
            <img
              alt={plan.type}
              className="w-full h-32 object-contain mb-2 rounded"
              src={plan.image || property.image}
            />
            <p className="font-bold text-gray-900 text-sm">{plan.type}</p>
            {plan.area && <p className="text-xs text-gray-500">{plan.area}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}