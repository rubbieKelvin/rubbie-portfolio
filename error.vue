<script setup lang="ts">
import type { NuxtError } from "#app";

defineProps({
  error: {
    type: Object as () => NuxtError,
    default: () => ({}),
  },
});
</script>

<template>
  <div class="default-layout max-h-full h-full flex flex-col">
    <PageHeader />
    <div class="flex flex-grow md:flex-row flex-col-reverse h-0 max-h-full">
      <ContactLinks />
      <div
        class="flex-grow flex flex-col px-5 md:px-0 max-h-full h-full overflow-y-auto"
      >
        <div class="min-h-[3vh] md:min-h-[14vh]" />

        <div class="flex flex-col gap-4 flex-grow">
          <h1 class="lg:text-8xl md:text-7xl text-5xl">:(</h1>
          <h2 class="text-2xl">
            {{ error.statusCode ?? 404 }}
            <span v-if="error.statusMessage"> &middot; </span>
            {{ error.statusMessage }}
          </h2>
          <p class="xl:max-w-[60%]">
            <span v-if="error.statusCode === 404">
              I'm sure this is embarrasing, but the page you are looking for
              does not exist.
            </span>
            
            <span v-else>
              I'm sure this is embarrasing, but some shit happened that you
              shouldn't have to deal with.
            </span>
          </p>
          <div class="flex gap-2 flex-col">
            <NuxtLink to="/blog" class="text-sm"
              >~ Go back to the <span class="underline">blog</span></NuxtLink
            >
            <NuxtLink to="/" class="text-sm"
              >~ Go back to the
              <span class="underline">home page</span></NuxtLink
            >
          </div>
        </div>

        <PageFooter />
      </div>
      <NavigationLinks />
    </div>
  </div>
</template>
