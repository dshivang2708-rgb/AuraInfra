# Aura Infra

React + Tailwind CSS real estate landing page (Vite).

## Structure

```
aura-infra/
├── index.html
├── package.json
├── tailwind.config.js       # brand colors live here (brand-green, brand-navy, etc.)
├── postcss.config.js
├── vite.config.js
├── public/                  # static assets (logo, favicon, etc.)
└── src/
    ├── main.jsx              # React entry point
    ├── index.css             # Tailwind directives + base styles
    ├── App.jsx                # renders the current page
    ├── pages/
    │   └── Home.jsx            # assembles homepage sections in order
    └── components/
        └── HeroSection.jsx      # first homepage section
```

## Workflow for adding new sections

1. Drop the new component file into `src/components/` (e.g. `AboutSection.jsx`).
2. Import it in `src/pages/Home.jsx` and place it where it belongs in the page order:

```jsx
import HeroSection from "../components/HeroSection.jsx";
import AboutSection from "../components/AboutSection.jsx";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
    </main>
  );
}
```

3. For a new page entirely (e.g. Buy Property page), add it under `src/pages/` and wire it up once routing is added (React Router or TanStack Router).

## Run locally

```bash
npm install
npm run dev
```

## Known TODOs

- Swap the placeholder logo in `HeroSection.jsx` for the real Aura Infra logo once it re-uploads correctly.
- Background/logo images currently point to temporary Stitch preview URLs — replace with permanently hosted assets before launch.
