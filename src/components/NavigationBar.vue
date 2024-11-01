<script setup lang="ts">
import { RouterLink } from "vue-router";

const links = [
  { label: "Home", to: { name: "Index" } },
  { label: "About", to: "#" },
  { label: "Projects", to: "#" },
  { label: "Writing", to: "#" },
  { label: "Visual Arts", to: "#" },
  { label: "Contacts", to: "#" },
];
</script>

<template>
  <div class="p-4 flex items-center justify-between bg-gray-100 border-b">
    <div>
      <h1 class="font-medium text-lg">Rubbie Kelvin</h1>
    </div>

    <div class="flex gap-6">
      <RouterLink v-for="link in links" :to="link.to" :key="link.label">
        {{ link.label }}
      </RouterLink>
    </div>
  </div>
</template>
