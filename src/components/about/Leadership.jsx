import { useRef } from "react";
import virendraFounderImage from "../../assets/honey-director.png";
import sarabjitDirectorImage from "../../assets/Sarabjit-director.png";

const TEAM = [
  {
    key: "sarabjit",
    name: "Sarabjeet Singh Gulati",
    role: "Founder",
    image: sarabjitDirectorImage,
    alt: "sarabjit's Image",
  },
  {
    key: "Virendra",
    name: "Dewan Varender Partap Singh",
    role: "Co-Founder",
    image: virendraFounderImage,
    alt: "virendra's Image",
  },
  
];

const LinkedinIcon = () => (
  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

export default function Leadership() {
  const carouselRef = useRef(null);

  const scrollBy = (amount) => {
    carouselRef.current?.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section className="bg-[#f9f9ff] py-20 relative overflow-hidden" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-start gap-12 relative">
          {/* Left header */}
          <div className="lg:w-1/4 lg:-mt-3">
            <h6 className="text-[#005320] text-xs tracking-widest mb-4 font-semibold">OUR LEADERSHIP</h6>
            <h2 className="text-[32px] leading-tight font-bold mb-6 text-[#071837]">
              Meet the People Behind <span className="text-[#005320]">Aura Infra</span>
            </h2>
            <p className="text-sm text-[#45464e] mb-8">
              A team of passionate professionals dedicated to building a better tomorrow.
            </p>
            <button className="bg-[#005320] text-white px-6 py-3 rounded-lg flex items-center gap-2 group hover:gap-3 transition-all">
              <span className="text-[18px] font-bold">Meet Our Team</span>
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>

            <div className="flex gap-4 mt-8">
              <button
                className="w-12 h-12 rounded-full border border-[#75777f] flex items-center justify-center hover:bg-[#071837] hover:text-white transition-all"
                onClick={() => scrollBy(-300)}
                aria-label="Previous team member"
              >
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button
                className="w-12 h-12 rounded-full border border-[#75777f] flex items-center justify-center hover:bg-[#071837] hover:text-white transition-all"
                onClick={() => scrollBy(300)}
                aria-label="Next team member"
              >
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>

          {/* Carousel */}
          <div className="lg:w-3/4 w-full relative">
            <div
              ref={carouselRef}
              className="flex overflow-x-auto gap-6 pb-4 snap-x snap-mandatory scroll-smooth"
            >
              {TEAM.map((member) => (
                <div
                  key={member.key}
                  className="w-[220px] h-[300px] flex-shrink-0 bg-white rounded-xl shadow-sm border border-[#c5c6cf]/10 snap-start group overflow-hidden flex flex-col"
                >
                  <div className="w-full h-[220px] relative shrink-0">
                    <img
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                      alt={member.alt}
                      src={member.image}
                    />
                  </div>
                  <div className="p-4 flex justify-between items-start gap-2 h-[80px]">
                    <div className="min-w-0">
                      <h3 className="text-sm font-bold text-[#151c27] truncate">{member.name}</h3>
                      <p className="text-xs text-[#45464e] line-clamp-2">{member.role}</p>
                    </div>
                    {/* <div className="text-[#0077b5] shrink-0">
                      <LinkedinIcon />
                    </div> */}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-2 mt-4">
              <div className="h-2 w-2 rounded-full bg-[#005320]" />
              <div className="h-2 w-2 rounded-full bg-[#c5c6cf]/30" />
              <div className="h-2 w-2 rounded-full bg-[#c5c6cf]/30" />
            </div>
          </div>
        </div>

        {/* <div className="mt-12 text-center">
          <button className="border-2 border-[#071837] text-[#071837] px-10 py-4 rounded-lg font-bold hover:bg-[#071837] hover:text-white transition-all">
            Meet Our Entire Team
          </button>
        </div> */}
      </div>
    </section>
  );
}