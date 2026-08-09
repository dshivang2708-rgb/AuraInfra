import { Link } from "@tanstack/react-router";

const CATEGORIES = [
  {
    key: "residential",
    icon: "home",
    title: "Residential",
    to: "/properties/residential",
    description: (
      <>
        Flats • Houses • Villas
        <br />
        Plots • Apartments
      </>
    ),
    bg: "#eef7f2",
    border: "#e2efe7",
    accent: "#2e8b57",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBZd0uZIttAPQXGtfrHY11Gr_EmlNZZ83SeNzCDxWOAW3_SqP373XiWxUv994GZiBVmoNQbWc9rTmfE9GGST7AnLh8Rjai5ZkfNL9BwxtBXA3ssgje-wfktHbXgK0xUIznadydBkrvIXZPQuo7snpz_jvZei5uqRSkyh96O1ypn5drg2lfy4tADHeZyNojFLmzyqT46_rKsw0uaArSPwfcryucfaPGaKDmWkOvKAD_g-eEEJ1apeqh0jSW1xHY0jghfXmQ",
    alt: "Modern residential property",
  },
  {
    key: "commercial",
    icon: "corporate_fare",
    title: "Commercial",
    to: "/properties/commercial",
    description: (
      <>
        Offices • Shops • Showrooms
        <br />
        Warehouses • Showrooms
      </>
    ),
    bg: "#eef4ff",
    border: "#e2ecfe",
    accent: "#4285f4",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCujoU65dxgMLNnLXw8b7t6fSDkAJaSF0frV6-iE5zMVMz7-CxKgsPnjScKfq3xT3rDTrMSnLjghBL-n_q-3R3QNGXwIB174E4-sU4NDw6smqIHRbf0jH23A5XGgPQBIsSEzoGwb_7y1dDh9Q-Q8vdEjoiAzCwWWOrd8iJbntw7xT2OtRI1O_wC0u6EviCu6X1TtOFjlMzTujN05AGezbf4vTqgdaCuGbHOQH8PAtJaFmSlqJjymbBIUSzVNGNhB2uD8F8",
    alt: "Modern commercial office building",
  },
  {
    key: "agriculture",
    icon: "hvac_max_defrost",
    title: "Agriculture",
    to: "/properties/agriculture",
    description: (
      <>
        Farm Land • Plots
        <br />
        Orchards • Agricultural Land
      </>
    ),
    bg: "#f5f8f0",
    border: "#ecf1e6",
    accent: "#558b2f",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDjYCXf3QuZYt3Pdh3BSBUqV9q1ygKnTl8ay6Wk-IbvwTIf72SrxwyE7aoPZIYudKEhLDX5yJWMgT3i-_Dkbkz4RnnOHi1LiY3pLoV5EjXuExb5G_tjkX2fGosr-OVIqyyEppAvMLENr3fCbG91vgLs6zSljjRnpIU0jCQxX3rfpvCMLu57ouXy8Xsh5VxYicIYxFCuQrrIg925U1VvRgct7N7Ra2iMusWoFvkrU6ThGVI5vSlzDf2SDyUxgIVz2LelrKg",
    alt: "Lush green agricultural landscape with misty mountains",
  },
  {
    key: "upcoming",
    icon: "engineering",
    title: "Upcoming Projects",
    to: "/properties/upcoming",
    description: (
      <>
        Builder Projects • Ready
        <br />
        To Move • Under Construction
      </>
    ),
    bg: "#f3efff",
    border: "#e9e4ff",
    accent: "#7c4dff",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCObCl7qpgX5Y2UhsEkUPx0hbCHWs2nwRPkIJQM3eBW38SVuARLCpKpZ0KQlSiLAq62uPPIzH3rY0AkpbMxWAuQAiuJF1iPHn8pUcZrLq9doc9K1PvN6BRqVq82Ef7077iYaQptYuHEDM0XQnLfueIknePH5jO5EEwVtsiXJtJufhNIes-QUw67KejrZ4tDvqilWBThCLHzDCCn2vvF_QCeVtakLX7eAh6RSDAIpzf7uDK-1z27_LDERCQ360eRQ_uq6Mc",
    alt: "New construction project with crane",
  },
];

function CategoryCard({ category }) {
  const CardWrapper = category.to ? Link : "div";
  const wrapperProps = category.to ? { to: category.to } : {};

  return (
    <CardWrapper
      {...wrapperProps}
      className="relative group rounded-2xl h-[240px] overflow-hidden transition-all hover:shadow-lg border border-[#c5c6cf]/20 block"
    >
      {/* Full-card background image */}
      <img
        alt={category.alt}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
        src={category.image}
      />

      <div className="relative z-10 h-full p-4 flex flex-col justify-between items-start">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-white shadow-md"
          style={{ backgroundColor: category.accent }}
        >
          <span className="material-symbols-outlined text-base">{category.icon}</span>
        </div>

        <div>
          <h3 className="text-lg font-bold text-black mb-1">{category.title}</h3>
          <p className="text-xs text-black/75 leading-tight">{category.description}</p>
        </div>

        <span
          className="w-8 h-8 rounded-full text-white flex items-center justify-center transition-transform group-active:scale-90 group-hover:scale-105 shadow-md"
          style={{ backgroundColor: category.accent }}
          aria-label={`Explore ${category.title}`}
        >
          <span className="material-symbols-outlined text-base">arrow_forward</span>
        </span>
      </div>
    </CardWrapper>
  );
}

export default function CategorySection() {
  return (
    <section
      className="pt-20 pb-8 bg-[#f9f9ff]"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold tracking-tight text-[#071837] mb-1">Explore by Category</h2>
          <p className="text-sm text-[#45464e]">Find the right property for your needs</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {CATEGORIES.map((category) => (
            <CategoryCard key={category.key} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}