import { useState } from "react";

const TABS = ["Overview", "Amenities", "Floor Plans", "Location", "Gallery", "Developer", "FAQs"];

export default function TabsNav({ activeTab, onChange }) {
  return (
    <div className="bg-white rounded-xl shadow-sm px-6 py-4 flex gap-8 border-b border-gray-200 overflow-x-auto">
      {TABS.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`whitespace-nowrap font-medium transition-colors ${
            activeTab === tab
              ? "text-[#1a6b32] border-b-2 border-[#1a6b32] pb-4 -mb-4"
              : "text-gray-500 hover:text-gray-900"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}