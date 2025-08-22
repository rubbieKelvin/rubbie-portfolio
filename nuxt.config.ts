import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  vite: {
    plugins: [
      // @ts-expect-error Tailwind is not typed
      tailwindcss(),
    ],
  },
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
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
        },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "anonymous",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Google+Sans+Code:ital,wght@0,300..800;1,300..800&family=Mozilla+Text:wght@200..700&display=swap",
        },
      ],
    },
  },
  nitro: {
    prerender: {
      routes: ["/rss.xml", "/sitemap.xml"],
    },
  },
});
