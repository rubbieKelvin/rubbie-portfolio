<script setup lang="ts">
import DynLayout from "@/components/DynLayout.vue";
import { socialLinks } from "@/constants";

// Create contact descriptions for each social link
const contactDescriptions: Record<string, string> = {
  X: "Follow me for updates and thoughts",
  Github: "Check out my code and projects",
  LinkedIn: "Connect with me professionally", 
  Mail: "Reach out for work inquiries"
};
</script>

<template>
  <DynLayout>
    <h1 class="lg:text-8xl md:text-7xl text-5xl">Wanna reach out?</h1>
    <hr class="w-[40%] md:w-[20%] mb-6" />

    <div class="xl:max-w-[70%] mb-8">
      <p class="text-lg">
        I'm most active on X/Twitter, but feel free to email me if you'd like to
        discuss work. Don't forget to follow me on GitHub and X/Twitter! If you've
        got a job offer, let's connect on LinkedIn. ;)
      </p>
    </div>

    <div class="grid md:grid-cols-2 gap-6 mt-6">
      <div
        v-for="social in socialLinks"
        :key="social.label"
        class="contact-card p-5 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300"
      >
        <a :href="social.link" target="_blank" rel="noopener noreferrer" class="block">
          <h2 class="text-xl font-semibold">{{ social.label }}</h2>
          <p class="text-gray-700 dark:text-gray-300 font-fira text-sm mt-1">
            {{ contactDescriptions[social.label] || `Connect with me on ${social.label}` }}
          </p>
        </a>
      </div>
    </div>
  </DynLayout>
</template>

<style scoped>
.contact-card {
  background-color: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(4px);
}
</style>
