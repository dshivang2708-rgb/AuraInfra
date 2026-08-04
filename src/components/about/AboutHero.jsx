const HERO_POINTS = [
  {
    icon: "verified_user",
    title: "Quality First",
    description: "We never compromise on quality and trust in every brick we lay.",
  },
  {
    icon: "groups",
    title: "Customer Centric",
    description: "Your dreams are at the heart of everything we do and build.",
  },
  {
    icon: "eco",
    title: "Sustainable Future",
    description: "Creating a greener and better tomorrow through eco-friendly initiatives.",
  },
];

export default function AboutHero() {
  return (
    <header className="relative overflow-hidden flex flex-col pt-14 min-h-[560px]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 z-10"
          style={{ background: "linear-gradient(to bottom, rgba(7,24,55,0.25), rgba(7,24,55,0.65))" }}
        />
        <img
          className="w-full h-full object-cover object-center"
          alt="A luxurious modern architectural villa at twilight"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4e3Px5zkhtaJUlpfm4f5DMwnuncQHH6oGw27MAFxDQbRDO5GJLeX0SZ_dQUMBtha7TxzQV3xZimRbSzcPDVyF0YL6P0Iisb1lC6g5wA_uUpQkbaKbl5Q7bSotIVey86wnNy7vRkCaTj8jdSDZQ3MXqOhF3Ih7utMPKtlQ8cggJpEWo_S1m8USEekrWmWxHwfU98TTgZQSEdktkFYyE0lM8FFkuKJhgV5UxyqT6N2K5W1DffJQR3bcc6N4TbXko4-yx7E=w2400"
        />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-8 text-white w-full py-12 flex-grow flex flex-col justify-center">
        <nav className="flex gap-2 mb-8 text-xs text-white/80">
          <a className="hover:text-white" href="#">
            Home
          </a>
          <span>&gt;</span>
          <span className="text-white">About Us</span>
        </nav>

        <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tighter">
          About <span className="text-[#89fa9b]">Aura Infra</span>
        </h1>
        <p className="text-base md:text-lg max-w-2xl text-white/90 mb-10 leading-relaxed">
          Building spaces that inspire and communities that last for generations.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {HERO_POINTS.map((point) => (
            <div key={point.title} className="flex items-start gap-3">
              <div className="bg-[#89fa9b]/20 p-2 rounded-full">
                <span className="material-symbols-outlined text-[#89fa9b] text-[18px]">{point.icon}</span>
              </div>
              <div>
                <h3 className="text-sm font-bold mb-0.5">{point.title}</h3>
                <p className="text-xs text-white/70">{point.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}