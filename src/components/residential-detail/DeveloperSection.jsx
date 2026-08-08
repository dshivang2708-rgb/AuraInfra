import { Link } from "@tanstack/react-router";

export default function DeveloperSection() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4 border-l-4 border-[#1a6b32] pl-3">Developer</h3>
      <div className="flex items-start gap-4">
        <div className="w-14 h-14 rounded-lg bg-[#e8f3ec] flex items-center justify-center text-[#1a6b32] font-bold text-xl flex-shrink-0">
          AI
        </div>
        <div>
          <p className="font-bold text-gray-900">Aura Infra</p>
          <p className="text-sm text-gray-600 leading-relaxed mt-1">
            This project is developed and marketed directly by Aura Infra. We focus on transparent pricing, RERA-compliant
            documentation, and end-to-end support from booking through possession.
          </p>
        </div>
      </div>
      <Link
        to="/contact"
        className="inline-flex items-center gap-2 text-sm font-semibold text-[#1a6b32] mt-4 hover:underline"
      >
        Contact our team <i className="fa-solid fa-arrow-right" />
      </Link>
    </div>
  );
}
