import { defineCollection, z } from "astro:content";

const posts = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    publishedAt: z.date(),
    description: z.string().nullable().default(null),
    author: z.string().nullable().default(null),
    categories: z.array(z.string()).default([]),
    mainImage: z.string().nullable().default(null),
    external_link: z.string().optional(),
  }),
});

const authors = defineCollection({
  type: "data",
  schema: z.object({
    name: z.string(),
    slug: z.string(),
    image: z.string().nullable().default(null),
    bio: z.string().default(""),
    links: z
      .array(
        z.object({
          title: z.string(),
          url: z.string(),
        })
      )
      .default([]),
  }),
});

const categories = defineCollection({
  type: "data",
  schema: z.object({
    title: z.string(),
    is_project_category: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  type: "data",
  schema: z.object({
    title: z.string(),
    description: z.string().nullable().default(null),
    url: z.string().default(""),
    mainImage: z.string().nullable().default(null),
    categories: z.array(z.string()).default([]),
  }),
});

export const collections = { posts, authors, categories, projects };
