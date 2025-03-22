<script setup lang="ts">
const config = useAppConfig();
useSeoMeta({
  title: "Projects",
  description: "Projects by Rubbie Kelvin",
  ogTitle: "Projects | Rubbie kelvin",
  ogDescription: "Projects by Rubbie Kelvin",
  
});
</script>

<template>
  <div class="flex-grow flex gap-4 flex-col">
    <h1 class="lg:text-8xl md:text-7xl text-5xl">Projects</h1>

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
      <div
        v-for="project in config.projects"
        :key="project.title"
        class="project-card p-4 rounded-lg border border-gray-200 dark:border-gray-700 duration-300 hover:border-gray-300 dark:hover:border-gray-600"
      >
        <a :href="project.link" class="block h-full">
          <h2 class="text-xl font-semibold mb-2">{{ project.title }}</h2>
          <p class="mute text-sm">
            {{ project.description }}
          </p>
        </a>
      </div>
    </div>
  </div>
</template>
