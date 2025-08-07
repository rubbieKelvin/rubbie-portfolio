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
    "@nuxt/content",
    "@nuxt/icon",
    "@nuxt/ui",
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@nuxt/image",
  ],
  site: {
    url: "https://iam.rubbietheone.com",
    name: "Rubbie Kelvin - Software Developer Portfolio",
    description:
      "Professional portfolio of Rubbie Kelvin, a skilled software developer from Nigeria specializing in Python, C++, JavaScript/TypeScript, and Rust.",
    defaultLocale: "en",
  },
  app: {
    head: {
      link: [
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/favicon.png",
        },
        { rel: "apple-touch-icon", href: "/favicon.png" },
      ],
    },
  },
  content: {
    preview: {
      api: "https://api.nuxt.studio",
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
  // Image optimization
  image: {
    format: ["webp", "avif", "png", "jpg"],
    quality: 80,
  },

  // Runtime config for environment variables
  runtimeConfig: {
    public: {
      googleAnalyticsId: process.env.GOOGLE_ANALYTICS_ID || 'G-XXXXXXXXXX'
    }
  },
});
