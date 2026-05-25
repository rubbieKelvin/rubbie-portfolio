// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://rubbietheone.com",
  vite: {
    resolve: {
      alias: {
        "@": "/src",
        "@/components": "/src/components",
        "@/layouts": "/src/layouts",
        "@/pages": "/src/pages",
        "@/assets": "/src/assets",
      },
    },
    plugins: [
      // @ts-ignore
      tailwindcss(),
    ],
  },
});
