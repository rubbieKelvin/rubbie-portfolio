<script setup lang="ts">
const config = useAppConfig();
const articles = config.articles;

useSeoMeta({
  title: "Blog",
  description: "Checkout my blog posts",
});
</script>

<template>
  <div class="flex-grow pt-[20%] flex gap-2 flex-col">
    <!-- <h1 class="lg:text-8xl font-romans md:text-7xl text-5xl">Blog</h1> -->

    <h1 class="lg:text-8xl md:text-7xl text-5xl">Articles</h1>
    <p v-if="articles.length === 0" class="font-fira text-sm">
      I definitely have some articles coming up here. Follow my on twitter so
      you dont miss when that happens ;)
    </p>
  </div>
</template>
