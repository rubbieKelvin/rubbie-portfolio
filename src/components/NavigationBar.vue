<script setup lang="ts">
import { RouterLink } from "vue-router";

const links = [
  { label: "Home", to: { name: "Index" } },
  { label: "About", to: "#" },
  { label: "Projects", to: "#" },
  { label: "Writing", to: "#" },
  { label: "Arts", to: "#" },
  { label: "Contacts", to: "#" },
];
</script>

<template>
  <div
    class="md:p-4 p-2 flex md:flex-row flex-col z-20 sticky top-0 gap-2 items-center justify-between bg-gray-100 border-b"
  >
    <h1 class="font-bold font-pixel">
      <span class="hidden text-2xl md:block">
        Rubbie Kelvin
        <span class="text-orange-400">.</span>
      </span>
      <span class="md:hidden text-4xl">
        <span>R</span>
        <span class="text-orange-400">.</span>
        <span>K</span>
      </span>
    </h1>

    <div class="flex gap-6">
      <RouterLink v-for="link in links" :to="link.to" :key="link.label">
        {{ link.label }}
      </RouterLink>
    </div>
  </div>
</template>
