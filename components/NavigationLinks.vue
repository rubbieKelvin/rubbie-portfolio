<script setup lang="ts">
const navigation_links = [
  { text: "~", hidden_text: "Home", link: { name: "index" } },
  { text: "projects", link: { name: "projects" } },
  { text: "articles", link: { name: "blog" } },
  { text: "contacts", link: { name: "contact" } },
];
</script>

<template>
  <div
    class="flex items-center justify-center min-w-[20%] border-b md:border-b-0 py-4 md:py-0 sticky top-10 bg"
  >
    <ul
      class="flex md:gap-8 md:flex-col flex-row md:w-auto w-full justify-around"
    >
      <li v-for="(link, index) in navigation_links" :key="link.text">
        <NuxtLink :to="link.link" class="font-fira group old-link">
          <span class="md:inline hidden">0{{ index }} ./</span>
          <span :class="{ 'group-hover:hidden': link.hidden_text }">
            {{ link.text }}
          </span>
          <span v-if="link.hidden_text" class="hidden group-hover:inline">{{
            link.hidden_text
          }}</span>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
