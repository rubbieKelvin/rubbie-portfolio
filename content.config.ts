import { defineContentConfig, defineCollection, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: "page",
      source: "**/*.md",
      schema: z.object({
        title: z.string(),
        tags: z.array(z.string()).optional(),
        description: z.string(),
        date: z.string(),
      }),
    }),
  },
});
