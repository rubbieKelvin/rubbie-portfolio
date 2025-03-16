<script lang="ts" setup>
import { socialLinks } from "@/constants";
import { useStorage } from "@vueuse/core";
import { onMounted } from "vue";

const navigation_links = [
  { text: "~", hidden_text: "Home", link: { name: "Index" } },
  { text: "projects", link: { name: "Projects" } },
  { text: "articles", link: { name: "Articles" } },
  { text: "contacts", link: { name: "Contact" } },
];

const darkMode = useStorage("darkMode", true);

onMounted(() => {
  if (darkMode.value) {
    const html = document.getElementsByTagName("html")[0];
    html.classList.add("dark");
  } else {
    const html = document.getElementsByTagName("html")[0];
    html.classList.remove("dark");
  }
});

const setDarkMode = (value: boolean) => {
  const html = document.getElementsByTagName("html")[0];
  if (value) html.classList.add("dark");
  else html.classList.remove("dark");

  darkMode.value = html.classList.contains("dark");
};
</script>

<template>
  <div class="font-romans flex flex-col h-full">
    <!-- nav -->
    <div
      class="md:px-4 px-10 py-4 font-fira sticky top-0 bg-inherit border-b md:border-0"
    >
      <a href="/"> rubbiekelvin@localhost ~ $ </a>
    </div>
    <!-- body -->
    <div class="flex-grow flex gap-2 md:flex-row flex-col-reverse">
      <!-- lhs -->
      <div
        class="flex md:min-w-[20%] justify-center items-center md:border-0 border-t"
      >
        <div class="flex md:flex-col gap-6 md:p-0 py-4">
          <a
            v-for="link in socialLinks"
            :href="link.link"
            class="font-fira old-link"
            >{{ link.label }}</a
          >
        </div>
      </div>

      <!-- middle -->
      <div class="flex-grow flex flex-col md:justify-around justify-between">
        <div class="flex flex-col gap-4 md:p-0 px-10 py-4">
          <slot></slot>
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
            <br class="inline md:hidden" />
            <RouterLink
              :to="{ name: 'FAQ' }"
              class="italic underline hover:font-bold hover:cursor-pointer"
              >Why does your portfolio look plain?</RouterLink
            >
          </p>
        </div>
      </div>

      <!-- rhs -->
      <div
        class="flex items-center justify-center min-w-[30%] border-b md:border-0 py-4 md:py-0 sticky top-9"
      >
        <ul
          class="flex md:gap-8 md:flex-col flex-row md:w-auto w-full justify-around px-4"
        >
          <li v-for="(link, index) in navigation_links" :key="link.text">
            <RouterLink :to="link.link" class="font-fira group old-link">
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
