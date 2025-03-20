<script lang="ts" setup>
const config = useAppConfig();
</script>

<template>
  <div
    class="flex md:min-w-[20%] justify-center items-center border-t md:border-t-0 border-gray-300 min-w-[20%] max-w-[300px]"
  >
    <div class="flex md:flex-col gap-6 md:p-0 py-4">
      <NuxtLink
        v-for="link in config.socials"
        :key="link.label"
        :to="link.link"
        external
      >
        {{ link.label }}
      </NuxtLink>
    </div>
  </div>
</template>
