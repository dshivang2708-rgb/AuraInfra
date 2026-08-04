export default function ProjectOverview({ property }) {
  const rows = [
    { icon: "fa-regular fa-building", label: "Project Type", value: "Residential" },
    { icon: "fa-solid fa-chart-area", label: "Total Area", value: property.totalArea },
    { icon: "fa-solid fa-cubes", label: "Total Units", value: property.totalUnits },
    { icon: "fa-solid fa-bed", label: "Configurations", value: property.configurations },
    { icon: "fa-regular fa-calendar-days", label: "Possession", value: property.possession },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4 border-l-4 border-[#1a6b32] pl-3">Project Overview</h3>
      <p className="text-sm text-gray-600 mb-6 leading-relaxed">{property.overviewSummary}</p>
      <ul className="space-y-4 text-sm">
        {rows.map((row, i) => (
          <li
            key={row.label}
            className={`flex justify-between pb-2 ${i < rows.length - 1 ? "border-b border-gray-100" : ""}`}
          >
            <span className="text-gray-500 flex items-center gap-2">
              <i className={`${row.icon} w-4`} /> {row.label}
            </span>
            <span className="font-medium text-gray-900">{row.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}