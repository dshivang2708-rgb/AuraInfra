import { Link } from "@tanstack/react-router";

function initialsFor(name) {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (!words.length) return "AI";
  return words.slice(0, 2).map((w) => w[0].toUpperCase()).join("");
}

export default function DeveloperSection({ property }) {
  const developerName = property?.developer?.trim() || "Aura Infra";
  const isDefault = developerName === "Aura Infra";

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Developer</h3>
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-lg bg-[#E6F4EC] flex items-center justify-center text-[#006D32] font-bold text-xl flex-shrink-0">
          {initialsFor(developerName)}
        </div>
        <div>
          <p className="font-bold text-gray-900">{developerName}</p>
          <p className="text-sm text-gray-600 leading-relaxed mt-1">
            {isDefault
              ? "This property is developed and marketed directly by Aura Infra. We focus on transparent pricing, RERA-compliant documentation, and end-to-end support from booking through possession."
              : `This property is developed by ${developerName} and marketed by Aura Infra. We focus on transparent pricing, RERA-compliant documentation, and end-to-end support from booking through possession.`}
          </p>
        </div>
      </div>
      <Link to="/contact" className="inline-flex items-center gap-2 text-sm font-semibold text-[#006D32] mt-4 hover:underline">
        Contact our team <i className="fa-solid fa-arrow-right" />
      </Link>
    </div>
  );
}