export default function ExpertCTA() {
  return (
    <section className="bg-[#f0fdf4] py-10 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 bg-white p-8 rounded-2xl shadow-sm border border-[#1a6b32]/10">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-[#1a6b32]/5 flex items-center justify-center rounded-full">
            <span className="material-symbols-outlined text-[#1a6b32] text-3xl">agriculture</span>
          </div>
          <div>
            <h3 className="text-xl font-bold">Can't Find the Right Land?</h3>
            <p className="text-sm text-gray-600 max-w-md">
              Our experts are here to help you find the perfect agricultural property for your needs.
            </p>
          </div>
        </div>
        <button className="bg-[#1a6b32] hover:bg-[#145126] text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shrink-0">
          Talk to Our Expert
          <span className="material-symbols-outlined text-base">arrow_forward</span>
        </button>
      </div>
    </section>
  );
}