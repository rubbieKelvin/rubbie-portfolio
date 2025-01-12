<script lang="ts" setup>
import { socialLinks } from "@/constants";
import { onMounted, ref } from "vue";

const navigation_links = [
  { text: "~", hidden_text: "Home", link: "#" },
  { text: "projects", link: "#" },
  { text: "articles", link: "#" },
  { text: "contacts", link: "#" },
];

const darkMode = ref(false);

onMounted(() => {
  const html = document.getElementsByTagName("html")[0];
  darkMode.value = html.classList.contains("dark");
});

const setDarkMode = (value: boolean) => {
  const html = document.getElementsByTagName("html")[0];
  if (value) html.classList.add("dark");
  else html.classList.remove("dark");
  darkMode.value = html.classList.contains("dark");
};
</script>

<template>
  <div
    class="font-romans flex flex-col h-full bg-white dark:bg-[#131313] dark:text-white"
  >
    <!-- nav -->
    <div class="md:px-4 px-10 py-4 font-fira">rubbiekelvin@localhost ~ $</div>
    <!-- body -->
    <div class="flex-grow flex gap-2 md:flex-row flex-col-reverse">
      <!-- lhs -->
      <div
        class="flex md:min-w-[20%] justify-center items-center md:border-0 border-t border-gray-200"
      >
        <div class="flex md:flex-col gap-6 md:p-0 py-4">
          <a v-for="link in socialLinks" :href="link.link" class="font-fira">{{
            link.label
          }}</a>
        </div>
      </div>

      <!-- middle -->
      <div class="flex-grow flex flex-col md:justify-around justify-between">
        <!-- main -->
        <div class="flex flex-col gap-4 md:p-0 px-10 py-4">
          <p class="font-fira md:text-base text-sm">
            Software developer ・Nigeria
          </p>
          <h1 class="lg:text-8xl md:text-7xl text-5xl">Rubbie Kelvin</h1>
          <hr class="w-[40%] md:w-[20%]" />
          <p class="text-sm xl:max-w-[60%]">
            <span class="font-fira"
              >I’m a guy who thrives on solving complex problems, from writing
              low-level functionalities to crafting intuitive front-end designs.
              Although i easily adapt to any tool, my expertise are in Python,
              C++ and Js/Ts.</span
            >
            <br />
            <br />
            <span
              >* Currently playing with rust for the fun of a new
              challenge.</span
            >
          </p>
          <a
            href="https://drive.google.com/file/d/12qISjwJ74seuPHEd0V1qg5XGZdV2QkNl/view?usp=drive_link"
            target="_blank"
            class="font-fira mt-4 w-max"
          >
            Download resume
          </a>
        </div>

        <!-- footer -->
        <div class="px-10 md:px-0">
          <!-- buttons -->
          <div class="flex gap-2 font-fira">
            <button
              @click="() => setDarkMode(false)"
              :class="{ 'underline font-bold': !darkMode }"
            >
              Light
            </button>
            <p>/</p>
            <button
              @click="() => setDarkMode(true)"
              :class="{ 'underline font-bold': darkMode }"
            >
              Dark
            </button>
          </div>

          <!-- copyrit -->
          <p class="">
            <span>Rubbie kelvin © 2025 Made with love and vue</span>
            <span class="hidden md:inline">&nbsp;·&nbsp;</span>
            <span
              class="italic underline hover:font-bold hover:cursor-pointer md:inline hidden"
              >Copyright</span
            >
          </p>
        </div>
      </div>

      <!-- rhs -->
      <div
        class="flex items-center justify-center min-w-[30%] border-y md:border-0 py-4 md:py-0"
      >
        <ul
          class="flex md:gap-8 md:flex-col flex-row md:w-auto w-full justify-around px-4"
        >
          <li v-for="(link, index) in navigation_links" :key="link.text">
            <RouterLink :to="link.link" class="font-fira group">
              <span class="md:inline hidden">0{{ index }} ./</span>
              <span :class="{ 'group-hover:hidden': link.hidden_text }">
                {{ link.text }}
              </span>
              <span v-if="link.hidden_text" class="hidden group-hover:inline">{{
                link.hidden_text
              }}</span>
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
a {
  @apply hover:font-medium hover:underline;
}
</style>
