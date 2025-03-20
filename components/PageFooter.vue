<script lang="ts" setup>
const { isDark, setDarkMode } = useDarkTheme();
</script>

<template>
  <div class="pt-2 pb-4">
    <!-- buttons -->
    <div class="flex gap-2 font-fira">
      <button
        class="bg-transparent"
        :class="{ 'underline font-bold': !isDark }"
        @click="() => setDarkMode(false)"
      >
        Light
      </button>
      <p>/</p>
      <button
        class="bg-transparent"
        :class="{ 'underline font-bold': isDark }"
        @click="() => setDarkMode(true)"
      >
        Dark
      </button>
    </div>

    <!-- copyright -->
    <p class="text-sm">
      <span>Rubbie kelvin © {{ new Date().getFullYear() }} Made with ❤️ & vue</span>
      <span class="hidden md:inline">&nbsp;·&nbsp;</span>&nbsp;&middot;

      <NuxtLink
        to="faq"
        class="italic underline hover:font-bold hover:cursor-pointer"
        >Why does your portfolio look plain?
      </NuxtLink>
    </p>
  </div>
</template>
