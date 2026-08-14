import { Link } from "@tanstack/react-router";

const ACCENT = "#0a5d34";

/**
 * Shared shell for simple text/policy pages (Terms & Conditions, Privacy
 * Policy, etc). Renders a hero strip with title + last-updated date, then
 * whatever section content is passed as children.
 */
export default function LegalPageLayout({ title, effectiveDate, children }) {
  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Hero strip */}
      <section className="bg-[#0f1719] pt-32 pb-14 px-8">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs uppercase tracking-widest font-semibold mb-3" style={{ color: "#6ddd81" }}>
            Aura Infra
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">{title}</h1>
          <p className="text-gray-400 text-sm">Last updated: {effectiveDate}</p>
        </div>
      </section>

      {/* Body */}
      <section className="bg-white py-14 px-8">
        <div className="max-w-4xl mx-auto space-y-10 text-[#45464e] text-sm leading-relaxed">
          {children}
        </div>
      </section>

      {/* Footer CTA back to contact */}
      <section className="bg-[#f9f9ff] py-10 px-8">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-sm text-[#45464e]">
            Questions about this page? Reach out and we'll be happy to help.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 text-white font-semibold py-2.5 px-6 rounded-lg transition-colors"
            style={{ backgroundColor: ACCENT }}
          >
            Contact Us
            <span className="material-symbols-outlined text-white text-lg">arrow_forward</span>
          </Link>
        </div>
      </section>
    </div>
  );
}

export function LegalSection({ heading, children }) {
  return (
    <div>
      <h2 className="text-lg font-bold text-[#071837] mb-3">{heading}</h2>
      <div className="space-y-3">{children}</div>
    </div>
  );
}