import { useState } from "react";

export default function FAQsSection({ property }) {
  const faqs = property.faqs || [];
  const [openIndex, setOpenIndex] = useState(0);

  if (faqs.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4 border-l-4 border-[#1a6b32] pl-3">FAQs</h3>
        <p className="text-sm text-gray-500">
          No FAQs have been added for this project yet — reach out to us for any questions.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4 border-l-4 border-[#1a6b32] pl-3">
        Frequently Asked Questions
      </h3>
      <div className="divide-y divide-gray-100">
        {faqs.map((faq, i) => {
          const open = openIndex === i;
          return (
            <div key={i} className="py-3">
              <button
                type="button"
                onClick={() => setOpenIndex(open ? -1 : i)}
                className="w-full flex items-center justify-between text-left"
              >
                <span className="font-medium text-gray-900 text-sm">{faq.question}</span>
                <i className={`fa-solid fa-chevron-down text-xs text-gray-400 transition-transform ${open ? "rotate-180" : ""}`} />
              </button>
              {open && <p className="text-sm text-gray-600 mt-2 leading-relaxed">{faq.answer}</p>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
