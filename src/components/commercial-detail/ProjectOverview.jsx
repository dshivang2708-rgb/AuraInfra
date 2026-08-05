export default function ProjectOverview({ property }) {
  const rows = [
    { icon: "fa-regular fa-building", label: "Property Type", value: property.type },
    { icon: "fa-solid fa-chart-area", label: "Total Area", value: property.totalArea },
    { icon: "fa-solid fa-cubes", label: "Total Units", value: property.totalUnits },
    { icon: "fa-solid fa-layer-group", label: "Configuration", value: property.configurations },
    { icon: "fa-regular fa-calendar-days", label: "Possession", value: property.possession },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Project Overview</h3>
      <p className="text-sm text-gray-600 mb-6 leading-relaxed">{property.overviewSummary}</p>
      <ul className="space-y-0">
        {rows.map((row, i) => (
          <li
            key={row.label}
            className={`flex justify-between py-3 text-sm ${
              i < rows.length - 1 ? "border-b border-dashed border-gray-200" : ""
            }`}
          >
            <span className="text-gray-500 flex items-center gap-2">
              <i className={`${row.icon} w-4 text-[#006D32]`} /> {row.label}
            </span>
            <span className="font-semibold text-gray-900 text-right">{row.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}