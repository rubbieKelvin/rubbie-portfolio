// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: "https://rubbietheone.com",
  integrations: [mdx()],
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
