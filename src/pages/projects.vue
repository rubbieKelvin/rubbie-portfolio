<script setup lang="ts">
import DynLayout from "@/components/DynLayout.vue";
import { projects } from "@/constants";
</script>

<template>
  <DynLayout>
    <h1 class="lg:text-8xl md:text-7xl text-5xl">Projects</h1>
    <hr class="w-[40%] md:w-[20%] my-2" />

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
      <div
        v-for="project in projects"
        :key="project.title"
        class="project-card p-4 rounded-lg border border-gray-200 dark:border-gray-700 duration-300 hover:border-gray-300 dark:hover:border-gray-600"
      >
        <a :href="project.link" class="block h-full">
          <h2 class="text-xl font-semibold mb-2">{{ project.title }}</h2>
          <p class="text-gray-700 dark:text-gray-300 font-fira text-sm">
            {{ project.description }}
          </p>
        </a>
      </div>
    </div>
  </DynLayout>
</template>

<style scoped>
.project-card {
  background-color: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(4px);
}
</style>
