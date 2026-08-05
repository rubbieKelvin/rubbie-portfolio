import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const posts = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/posts" }),
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
  loader: glob({ pattern: "**/*.json", base: "./src/content/authors" }),
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
  loader: glob({ pattern: "**/*.json", base: "./src/content/categories" }),
  schema: z.object({
    title: z.string(),
    is_project_category: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    description: z.string().nullable().default(null),
    url: z.string().default(""),
    mainImage: z.string().nullable().default(null),
    categories: z.array(z.string()).default([]),
  }),
});

const projectDetails = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/project-details" }),
  schema: z.object({
    stack: z.array(z.string()).default([]),
    description: z.string().optional(),
  }),
});

export const collections = { posts, authors, categories, projects, projectDetails };
