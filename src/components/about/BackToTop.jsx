import { useEffect, useState } from "react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      className={`fixed bottom-8 right-8 w-12 h-12 bg-white text-[#071837] rounded-full shadow-2xl flex items-center justify-center transition-all duration-500 z-[60] border border-[#c5c6cf]/30 ${
        visible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
    >
      <span className="material-symbols-outlined">arrow_upward</span>
    </button>
  );
}