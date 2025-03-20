<script lang="ts" setup>
const { socials } = useAppConfig();

useSeoMeta({
  title: "Contact",
  description: "Wanna reach out? Here's how",
});
</script>

<template>
  <div class="flex-grow pt-[20%] flex gap-2 flex-col">
    <h1 class="lg:text-8xl md:text-7xl text-5xl">Wanna reach out?</h1>

    <div class="xl:max-w-[70%] mb-8">
      <p class="text-lg">
        I'm most active on X/Twitter, but feel free to email me if you'd like to
        discuss work. Don't forget to follow me on GitHub and X/Twitter! If
        you've got a job offer, let's connect on LinkedIn. ;)
      </p>
    </div>

    <div class="grid md:grid-cols-2 gap-6 mt-6">
      <div
        v-for="social in socials"
        :key="social.label"
        class="p-5 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300"
      >
        <NuxtLink
          :to="social.link"
          target="_blank"
          external
          rel="noopener noreferrer"
          class="block"
        >
          <h2 class="text-xl font-semibold">{{ social.label }}</h2>
          <p class="text-gray-700 dark:text-gray-300 font-fira text-sm mt-1">
            {{ social.description }}
          </p>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
