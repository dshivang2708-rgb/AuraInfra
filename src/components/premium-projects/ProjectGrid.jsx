import { useState } from "react";

const PROJECTS = [
  {
    key: "aura-greens",
    name: "Aura Greens",
    builder: "DLF",
    location: "Sector 82, Mohali",
    tags: ["🏠 2, 3.5 & 4 BHK", "🌳 Green Living", "📍 Prime Location"],
    price: "₹ 85 Lakh",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAe44Gq1udukqqaGdHsGIuWgywHPxpV5XiXXNv-gwr01jzwMx24ysKGGuSJE2_8PQcXF7k6ynLlbZ9A7Wi3pMruG6Yib4aEd2SunqNmrzVq_519bWbOTxs08JiAena54uOUKlejXt-pnoy_8VdyexP2v3bNe6DsSidxkzeEcCP2bI_DM04OjumDOEwIf-JX7Kp-BNgTG8U9Ly7s4qQpiHM5usXW5ImaMnEQ-lPM6D2gL4VsdIpdjnCw",
  },
  {
    key: "skyline-residency",
    name: "Skyline Residency",
    builder: "ATS",
    location: "Aero city, Mohali",
    tags: ["🏠 3 & 4 BHK", "💎 Premium Amenities", "📍 Prime Location"],
    price: "₹ 1.60 Cr",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDGmbtg2vB7GB3yje14LjRV9gvRxdtoSmJeeAX-aaU5MmSCpBTMQm-cJdbw8dRuLSG_mq9k5xxs2dLLMr3bxAehhYTP5rCgm7CxY0FW5GWIyaIdr4d8vOQGIGYZ_IjQyfjiAaJZvB7evTwXhxoooM1weI5aTsD65lkp4SQpCY-k81w8fMFhCTd2rBhU_Ena71JwiINh5PpIP6LkV-5zE-aQHOY1jKB_6QcLE2kfYwK4DYVdvALyPiuJ",
  },
  {
    key: "homeland-avenue",
    name: "Homeland Avenue",
    builder: "HOMELAND",
    location: "Sector 89, Mohali",
    tags: ["🏠 2, 3 & 5 BHK", "🏢 Clubhouse", "🌳 Park Facing"],
    price: "₹ 1.20 Cr",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCnQqZlPG2jRB7SSRJJ8KR8M6Kub8eBSN0zNT83kgVguMQ7Mzy0eRgmRmjcb1KeupSXSkc-4BorP9FZCpePNHaMDFLkwxX9-D14NNWQ1gRI4FyKDVEQwsrDSTbvpAtDL6AmvmNkyDIZQs5wXN6-n2FsRWohTa3ktQRfA2h5YY2Ijvny5wMPf0uEmCNSPTL9daRep4cbqElR131VNcNx03JSL-VasfVY12uJajU3E2mO0a4VqrkQb2K6",
  },
  {
    key: "aura-grande",
    name: "Aura Grande",
    builder: "LOHIA",
    location: "Sector 62, Mohali",
    tags: ["🏠 3 & 4 BHK", "🏢 Clubhouse", "🏞️ Club View"],
    price: "₹ 2.35 Cr",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDe03I2TOIhI9Gin9tbwpz38B8dEhEVhx5OxMyzVuEp9_vvZ-s3nnNS0TCZOX0FK5mWVMPdgYgk5Gyz2gqQFslleYC-ez0zLi1VQp8SdtRORjlkzyM3gcWQhtOi_D4NAVNaPgbDcX24C-Uqj7tuLiurP49g399qE1uchToEUKP2VSrS2yOTy4P8IUWtrZu3iAMwlGNw_oz7wzVB4UtxuLx_upldgRZrPJNQmtV7FR92hLVASe6Oke6v",
  },
  {
    key: "aurelia-heights",
    name: "Aurelia Heights",
    builder: "SBP",
    location: "Sector 79, Mohali",
    tags: ["🏠 3 & 4 BHK", "🏋️ Gym", "🛡️ 24x7 Security"],
    price: "₹ 1.45 Cr",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDd-iO3PXCglU5LOrh7DsyQsJNDKUYIJqjs717AAQTD6o6ARmC0YTaJtTWlEQC3jiVBY4PvlDwdG_ssijQ4GRg0HRHXngnfB6ZqQ8ByKdo0-RklJQvHmZguz0W723381KSnYsg0gZyRZY267FqkfB-jYxREl1OeBLHy5OUTieQOal3Sdv4qTafLiTurH6SZO29aD5ZtgY3QjOnq3AwVlhWdTSQYQDxzjCUCRpo9Gw8FFE7qMbfNYcfh",
  },
  {
    key: "elysian-heights",
    name: "Elysian Heights",
    builder: "TRIDENT",
    location: "Sector 102A, Mohali",
    tags: ["🏠 4 BHK", "🌊 Infinity Pool", "🏢 Clubhouse"],
    price: "₹ 3.20 Cr",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCi6ujvnToR_53Gm55glJe315L4PIe8lz72oezIpoMW5EodypY9y4eA5mx-c0VWWEg7D-9iS8ArMdUHlnMVhlPCE6Q7yUOLLn7aorn1CyKnmzFZKWcvbycXOh9cZijaVUkCHqsI8AJoVLBawU7f_bxeFSftkSn8qj6etxxzh9lUx0IJKAZ4kYtS8nUVVD-h8A7zbN6HIBa_1DySVdLUoxBcJ2NpgHqXKDCEWSBLb2P6A_elBM1a3jRc",
  },
  {
    key: "omaxe-new-launch",
    name: "Omaxe New Launch",
    builder: "OMAXE",
    location: "Sector 64, Mohali",
    tags: ["🏠 2, 3 & 4 BHK", "🛍️ Shopping Plaza", "📍 Prime Location"],
    price: "₹ 78 Lakh",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD_aleebf-pgQDdAz9Zl6Qk0wkcU_VtKv8PcGb78fVUSFImdDna3w0PRWD5KMOiVFQ6QfSPqvbVGR-AG2lIVqxRyX_MJIYrKkiTbYFK_kulGQ7Vg0OCDCUr1xsKtm_MX7T6iA_xTED2qG_Lp0RyKE_uEfOFoi2xkQoGW38GQTrVLValrgUrSIdorTiAZJyfnf-7xa_mr4Trd1H6Ir-VeHlu2TxkwaRe8uatWGV6E894G2TdihC7JSbQ",
  },
  {
    key: "eldeco-greens",
    name: "Eldeco Greens",
    builder: "ELDECO",
    location: "Sector 115, Mohali",
    tags: ["🏠 3 & 4 BHK", "🌳 Green Surroundings", "🏢 Clubhouse"],
    price: "₹ 1.35 Cr",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD0MVt6yZ5D2gq9PStGe3laLxl_KVUpfJILncX-bM9qqsW_3Nn8Ehj5Nb4zXnViHtuUt8qZSIy_eYHI7Vw6SPRjVhrXdJIe1ymSivynEj1xcwI19LHRWGvXvIVezrLDBI-zo4xBrW5yxx7q7uDbWzNR_1gd1fpR_Q6r_hDJmUwXeJEgY3RC3qL-R3-zkRXCzMcIOEungQIEmk2AwKYNFVGQ0os-a91_2I2iGgzdjr-_WDZQvNRuOzpS",
  },
  {
    key: "godrej-nature-plus",
    name: "Godrej Nature Plus",
    builder: "GODREJ",
    location: "Sector 66, Mohali",
    tags: ["🏠 2, 3 & 4 BHK", "🍃 Eco Friendly", "📍 Prime Location"],
    price: "₹ 1.10 Cr",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDLdzAPdVxBSimKnWN6hJ6TGgiNQswZwNURmFp3p-K4IDOuhgwgFZGqcGmc4VMTl1MQLf1ZwRMU37GF-L27RM_J4fc5i8m4Qkg4rWdyHPlRhARnSF79ipn2VwABXiKRemrei_n6cKDASzosUkEFN25jvsKWFHBwqe7vVniICUUCBDl-w1nkO5l6Q58Z-oahKZZn7JrO7AtQCzunWOb2_7u1cRZA2xz94b5klKJw0q9mAHORUJrWNsif",
  },
  {
    key: "suntec-city-homes",
    name: "Suntec City Homes",
    builder: "SUNTEC",
    location: "Sector 124, Mohali",
    tags: ["🏠 2, 3 & 4 BHK", "✨ Modern Amenities", "🌳 Park Facing"],
    price: "₹ 92 Lakh",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD7tCpGAAMpAbl1PC4EQhrzgnMIptY5PClaqNK5OKs6SufhLXmE5h2MIlo5FlqpYzVAERqy1_F0eQUGXlyktBsT5C2DHu_1lPa-ZujWcb3mmFA_2bJ2bg6ikWYKHv-VP_3SK-ivtYQjxpZ1Tnz1I0CXVSlV2Ai-Y0n5DPJOcRpXOPgsk9oGQ6QCv-X9VS11xPugGL18q_crnPm2ISMz5Qc_IWzBrnkh1K8b8ldlwS_liex-M_2q6SEY",
  },
  {
    key: "raheja-atharva",
    name: "Raheja Atharva",
    builder: "RAHEJA",
    location: "Sector 78, Mohali",
    tags: ["🏠 3 & 4 BHK", "🍸 Rooftop Lounge", "🏢 Clubhouse"],
    price: "₹ 1.75 Cr",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBXGoMP4N2-sns-tBUwgwaG8qVSkNtIdhX1K3d6nNrAj7_m9Vmct8EGcSvzwdCE8SrSEbLX9Z9CUSDiuZHjwTAg3zK77bQ3L4_tMcTbkTHBXBjAMjBffPzkb1bxgg0jjmtGQmWuYUqmTjpItWCfl7Cmijdwa06eMsjRJ1kaMbwhfpRGY7x-oiZd_CiGQ2qYf2a3L409BkhZyOwP2YMas0xugqwo7y4xR0USs69yJgUbP9Zyx_BvKKH3",
  },
  {
    key: "shivalik-skyview",
    name: "Shivalik Skyview",
    builder: "SHIVALIK",
    location: "Sector 127, Mohali",
    tags: ["🏠 3, 4 & 5 BHK", "🌉 Sky Deck", "🛡️ 24x7 Security"],
    price: "₹ 2.80 Cr",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBy65muPmeVyS1ESVLai8dHYAtHQEFYMIrJ686nnZ9fAziUrAiKpdkSgPkboInKUU87_Ba26fUW94HSD9CP0nIe-Fk_nJ12SjT7AGpRNI6NqpFPewCYnWKo1-I5pPxRil8WGHGbxQOKB_o2wQasA3Aw6B72KdE0F4DXM0UiOeJS9awGs7q_13KZyze8-0WXQixTiH0Zrso6T7kv8-fZ5o8hoQzE_9Cogc3VmAwlzh6FtTh9pxq19vP9",
  },
];

function ProjectCard({ project }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow group">
      <div className="relative h-56">
        <img alt={project.name} className="w-full h-full object-cover" src={project.image} />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-2 py-1 rounded shadow-sm">
          <span className="text-[10px] font-bold text-slate-700">{project.builder}</span>
        </div>
        <div className="absolute top-4 right-4 flex gap-2">
          <span className="bg-green-600 text-white text-[10px] font-bold px-2 py-1 rounded">Premium Project</span>
          <button
            className="bg-white/80 p-1.5 rounded-full text-slate-600 hover:text-red-500 transition-colors"
            aria-label="Save project"
          >
            <span className="material-symbols-outlined text-base block">favorite</span>
          </button>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold mb-1">{project.name}</h3>
        <p className="text-xs text-slate-400 mb-4 flex items-center gap-1">
          <span className="material-symbols-outlined text-sm">location_on</span>
          {project.location}
        </p>
        <div className="grid grid-cols-2 gap-y-2 mb-6">
          {project.tags.map((tag) => (
            <div key={tag} className="text-[11px] flex items-center gap-1.5 text-slate-600">
              {tag}
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center pt-4 border-t border-slate-50">
          <div>
            <p className="text-[10px] text-slate-400 uppercase font-bold">Starting at</p>
            <p className="text-lg font-bold text-green-700">{project.price}</p>
          </div>
          <a
            className="text-xs font-bold text-slate-500 hover:text-green-700 flex items-center gap-1 group-hover:translate-x-1 transition-transform"
            href="#"
          >
            View Project
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function ProjectGrid() {
  const [gridView, setGridView] = useState(true);

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <p className="text-sm font-medium text-slate-500">Showing 1 – 12 of 28 Premium Projects</p>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-500">Sort by:</span>
            <select className="border-slate-200 rounded-lg text-sm font-semibold focus:ring-green-500">
              <option>Newest First</option>
            </select>
          </div>
          <div className="flex border border-slate-200 rounded-lg overflow-hidden">
            <button
              className={`p-2 ${gridView ? "bg-slate-100 text-green-700" : "text-slate-400 hover:text-slate-600"}`}
              onClick={() => setGridView(true)}
              aria-label="Grid view"
            >
              <span className="material-symbols-outlined text-lg block">grid_view</span>
            </button>
            <button
              className={`p-2 ${!gridView ? "bg-slate-100 text-green-700" : "text-slate-400 hover:text-slate-600"}`}
              onClick={() => setGridView(false)}
              aria-label="List view"
            >
              <span className="material-symbols-outlined text-lg block">view_list</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.key} project={project} />
        ))}
      </div>
    </>
  );
}