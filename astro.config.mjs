// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

import sanity from "@sanity/astro";

// https://astro.build/config
export default defineConfig({
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
  integrations: [
    sanity({
      projectId: "16odtdyl",
      dataset: "production",
      useCdn: false,
    }),
  ],
});
