import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages project site: https://tanmay4141.github.io/portfolio/
export default defineConfig({
  plugins: [react()],
  base: "/portfolio/",
});
