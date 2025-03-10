<script setup lang="ts">
import DynLayout from "@/components/DynLayout.vue";
import { ref } from "vue";

interface Article {
  title: string;
  date: string;
  tags: string[];
  path: string;
  excerpt: string;
}

const search = ref("");

const articles = ref<Article[]>([
  {
    title: "Getting Started with Vue 3",
    date: "July 20, 2023",
    tags: ["vue", "javascript", "frontend"],
    path: "/articles/getting-started-with-vue3.html",
    excerpt:
      "Vue 3 is the latest major version of Vue.js, bringing significant improvements in performance, TypeScript support, and a more modular architecture.",
  },
  {
    title: "Building Modern UIs",
    date: "August 15, 2023",
    tags: ["ui", "design", "frontend"],
    path: "/articles/building-modern-uis.html",
    excerpt:
      "Creating modern user interfaces requires a combination of design principles, technical know-how, and attention to user experience.",
  },
  {
    title: "Web Development Best Practices",
    date: "September 5, 2023",
    tags: ["web", "development", "best practices"],
    path: "/articles/web-development-best-practices.html",
    excerpt:
      "Following best practices in web development leads to better code quality, easier maintenance, and better user experience.",
  },
  {
    title: "Getting Started with Vue 3x",
    date: "July 20, 2023",
    tags: ["vue", "javascript", "frontend"],
    path: "/articles/getting-started-with-vue3.html",
    excerpt:
      "Vue 3 is the latest major version of Vue.js, bringing significant improvements in performance, TypeScript support, and a more modular architecture.",
  },
  {
    title: "Building Modern UIsx",
    date: "August 15, 2023",
    tags: ["ui", "design", "frontend"],
    path: "/articles/building-modern-uis.html",
    excerpt:
      "Creating modern user interfaces requires a combination of design principles, technical know-how, and attention to user experience.",
  },
  {
    title: "Web Development Best Practicesx",
    date: "September 5, 2023",
    tags: ["web", "development", "best practices"],
    path: "/articles/web-development-best-practices.html",
    excerpt:
      "Following best practices in web development leads to better code quality, easier maintenance, and better user experience.",
  },
  {
    title: "Getting Started with Vue 3e",
    date: "July 20, 2023",
    tags: ["vue", "javascript", "frontend"],
    path: "/articles/getting-started-with-vue3.html",
    excerpt:
      "Vue 3 is the latest major version of Vue.js, bringing significant improvements in performance, TypeScript support, and a more modular architecture.",
  },
  {
    title: "Building Modern UIse",
    date: "August 15, 2023",
    tags: ["ui", "design", "frontend"],
    path: "/articles/building-modern-uis.html",
    excerpt:
      "Creating modern user interfaces requires a combination of design principles, technical know-how, and attention to user experience.",
  },
  {
    title: "Web Development Best Practicese",
    date: "September 5, 2023",
    tags: ["web", "development", "best practices"],
    path: "/articles/web-development-best-practices.html",
    excerpt:
      "Following best practices in web development leads to better code quality, easier maintenance, and better user experience.",
  },
]);
</script>

<template>
  <DynLayout>
    <div class="flex gap-4 justify-between">
      <h1 class="lg:text-8xl md:text-7xl text-5xl">Articles</h1>
      <div class="flex items-center gap-2">
        <input
          v-model="search"
          type="text"
          class="w-full min-w-[20rem] p-4 bg-transparent border-b border-gray-300 outline-none focus:outline-none"
          placeholder="Search articles"
        />
      </div>
    </div>
    <hr class="w-[40%] md:w-[20%] mb-6" />

    <div class="mt-6 h-[34rem] overflow-y-auto">
      <div class="newspaper-grid">
        <div
          v-for="article in articles.filter((article) =>
            article.title.toLowerCase().includes(search.toLowerCase())
          )"
          :key="article.title"
          class="newspaper-article pb-8 mb-8"
        >
          <a
            :href="article.path"
            target="_blank"
            rel="noopener"
            class="block group"
          >
            <h2 class="text-3xl font-romans mb-2 group-hover:underline">
              {{ article.title }}
            </h2>
            <div
              class="text-sm text-gray-500 dark:text-gray-400 mb-4 font-fira !no-underline"
            >
              <div>{{ article.date }}</div>
              <div class="italic mt-1">{{ article.tags.join(", ") }}</div>
            </div>
            <p
              class="font-fira text-gray-700 dark:text-gray-300 leading-relaxed"
            >
              {{ article.excerpt }}
            </p>
            <div class="mt-4 text-sm font-fira group-hover:underline">
              Read full article →
            </div>
          </a>
        </div>
      </div>
    </div>
  </DynLayout>
</template>

<style scoped>
@media (min-width: 768px) {
  .newspaper-grid {
    column-count: 1;
    column-gap: 2rem;
  }
}

@media (min-width: 1024px) {
  .newspaper-grid {
    column-count: 2;
    column-gap: 3rem;
  }
}

.newspaper-article {
  break-inside: avoid;
}
</style>
