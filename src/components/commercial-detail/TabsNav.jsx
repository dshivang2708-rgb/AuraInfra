const TABS = ["Overview", "Amenities", "Floor Plans", "Location", "Gallery", "Developer", "FAQs"];

export default function TabsNav({ activeTab, onChange }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-2 mb-6 flex gap-2 overflow-x-auto">
      {TABS.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
            activeTab === tab
              ? "bg-[#E6F4EC] text-[#006D32]"
              : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}