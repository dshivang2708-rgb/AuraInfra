export default function WhyThisProject({ property }) {
  return (
    <div className="bg-[#E6F4EC] rounded-2xl p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Why {property.name}</h3>
      <ul className="space-y-3">
        {property.whyInvest.map((point) => (
          <li key={point} className="flex items-start gap-2 text-sm text-gray-700">
            <i className="fa-solid fa-circle-check text-[#006D32] mt-0.5" />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}