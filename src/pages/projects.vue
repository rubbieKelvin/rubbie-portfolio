<script setup lang="ts">
import DynLayout from "@/components/DynLayout.vue";
import { projects } from "@/constants";
</script>

<template>
  <DynLayout>
    <h1 class="lg:text-8xl md:text-7xl text-5xl">Projects</h1>
    <hr class="w-[40%] md:w-[20%] my-2" />

    <ul class="flex gap-3 flex-col">
      <li v-for="project in projects">
        <div class="flex items-center gap-3">
          <p class="text-gray-500 !no-underline">-</p>
          <a :href="project.link">
            <h2 class="text-xl">{{ project.title }}</h2>
            <p
              class="text-gray-700 dark:text-gray-300 italic font-fira text-sm"
            >
              {{ project.description }}
            </p>
          </a>
        </div>
      </li>
    </ul>
  </DynLayout>
</template>
