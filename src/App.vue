<script setup lang="ts">
import { RouterView } from "vue-router";
import JsonLd from "./components/JsonLd.vue";
</script>

<template>
  <JsonLd />
  <RouterView class="h-full" />
</template>
