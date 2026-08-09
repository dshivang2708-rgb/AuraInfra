export default function ProjectOverview({ property }) {
  const rows = [
    { icon: "apartment", label: "Builder", value: property.builder },
    { icon: "home_work", label: "Property Type", value: property.propertyType },
    { icon: "square_foot", label: "Total Area", value: property.totalArea },
    { icon: "layers", label: "Total Units", value: property.totalUnits },
    { icon: "grid_view", label: "Configurations", value: property.configurations },
    { icon: "event_available", label: "Possession", value: property.possession },
  ].filter((row) => row.value);

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Project Overview</h3>
      {property.overviewSummary && (
        <p className="text-sm text-gray-600 mb-6 leading-relaxed">{property.overviewSummary}</p>
      )}
      {rows.length === 0 ? (
        <p className="text-sm text-gray-500">No additional overview details have been added for this project yet.</p>
      ) : (
        <ul className="space-y-0">
          {rows.map((row, i) => (
            <li
              key={row.label}
              className={`flex justify-between py-3 text-sm ${
                i < rows.length - 1 ? "border-b border-dashed border-gray-200" : ""
              }`}
            >
              <span className="text-gray-500 flex items-center gap-2">
                <span className="material-symbols-outlined text-base text-[#1a6b32]">{row.icon}</span> {row.label}
              </span>
              <span className="font-semibold text-gray-900 text-right">{row.value}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}