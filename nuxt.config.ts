import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  vite: { plugins: [tailwindcss()] },
  css: ["~/assets/css/main.css"],
  modules: [
    "@nuxt/content",
    "@nuxt/icon",
    "@nuxt/ui",
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/image",
  ],
  content: {
    preview: {
      api: "https://api.nuxt.studio",
      // gitInfo: {
      //   name: "rubbie-portfolio",
      //   owner: "rubbieKelvin",
      //   url: "https://github.com/rubbieKelvin/rubbie-portfolio",
      // },
    },
  },
});
