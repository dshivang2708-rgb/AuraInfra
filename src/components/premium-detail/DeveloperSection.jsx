import { Link } from "@tanstack/react-router";

export default function DeveloperSection({ property }) {
  const builder = property.builder;

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Developer</h3>
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-lg bg-[#eaf4ef] flex items-center justify-center text-[#1a6b32] font-bold text-xl flex-shrink-0">
          {builder ? builder.slice(0, 2).toUpperCase() : "AI"}
        </div>
        <div>
          <p className="font-bold text-gray-900">{builder || "Aura Infra"}</p>
          <p className="text-sm text-gray-600 leading-relaxed mt-1">
            {builder
              ? `${property.name} is developed by ${builder} and marketed by Aura Infra. We focus on transparent pricing, RERA-compliant documentation, and end-to-end support from booking through possession.`
              : "This project is developed and marketed directly by Aura Infra. We focus on transparent pricing, RERA-compliant documentation, and end-to-end support from booking through possession."}
          </p>
        </div>
      </div>
      <Link to="/contact" className="inline-flex items-center gap-2 text-sm font-semibold text-[#1a6b32] mt-4 hover:underline">
        Contact our team <span className="material-symbols-outlined text-base">arrow_forward</span>
      </Link>
    </div>
  );
}