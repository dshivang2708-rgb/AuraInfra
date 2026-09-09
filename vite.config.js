import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // Split rarely-changing vendor code into its own chunk(s) so it
        // can be cached across deploys independently of app code, and so
        // it doesn't get bundled with — and inflate — the main entry
        // chunk. This doesn't shrink the total JS shipped on first
        // visit, but it removes the "chunk larger than 500 kB" warning
        // and means most deploys only invalidate the (smaller) app
        // chunk, not this one.
        manualChunks: {
          "vendor-react": ["react", "react-dom"],
          "vendor-router": ["@tanstack/react-router"],
        },
      },
    },
  },
});