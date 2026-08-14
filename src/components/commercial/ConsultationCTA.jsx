import { Building2, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

export default function ConsultationCTA() {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 mb-16">
      <div className="bg-[#F6F9F8] rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-green-50">
        <div className="flex items-center gap-6">
          <div className="bg-white p-4 rounded-full shadow-sm">
            <div className="bg-[#eaf4ef] p-4 rounded-full text-[#1a6b32]">
              <Building2 size={40} />
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Can't Find the Right Space?</h2>
            <p className="text-gray-500 max-w-md">
              Tell us your requirement and our expert will help you find the perfect property.
            </p>
          </div>
        </div>
        <Link
          to="/contact"
          className="bg-[#1a6b32] hover:bg-[#145126] text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shrink-0"
        >
          Contact Our Expert
          <ArrowRight size={20} />
        </Link>
      </div>
    </section>
  );
}