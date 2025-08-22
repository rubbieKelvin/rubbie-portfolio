import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  vite: { plugins: [tailwindcss()] },
  css: ["~/assets/css/main.css"],
  modules: [
    "@nuxtjs/sitemap",
    "@nuxtjs/seo",
    "nuxt-schema-org",
    "@nuxt/icon",
    "@nuxt/eslint",
  ],
  app: {
    head: {
      link: [
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon.png",
        },
      ],
    },
  },
  nitro: {
    prerender: {
      routes: ["/rss.xml", "/sitemap.xml"],
    },
  },
  // SEO and Performance optimizations
  experimental: {
    payloadExtraction: false, // Better performance
  },
});
