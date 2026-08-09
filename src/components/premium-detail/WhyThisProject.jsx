export default function WhyThisProject({ property }) {
  const points = property.whyInvest || [];

  if (points.length === 0) return null;

  return (
    <div className="bg-[#eaf4ef] rounded-2xl p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Why {property.name}</h3>
      <ul className="space-y-3">
        {points.map((point) => (
          <li key={point} className="flex items-start gap-2 text-sm text-gray-700">
            <span className="material-symbols-outlined text-[#1a6b32] text-base mt-0.5">check_circle</span>
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}