<script setup lang="ts">
useSeoMeta({
  title: "Blog",
  description: "Checkout my blog posts",
});

const { data: articles_data } = await useAsyncData("articles", () => {
  return queryCollection("blog").order("date", "DESC").all();
});

const articles = computed(() => {
  return articles_data.value ?? [];
});
</script>

<template>
  <div class="flex-grow flex gap-4 flex-col">
    <h1 class="lg:text-8xl md:text-7xl text-5xl">Blog</h1>
    <p v-if="articles.length === 0" class="xl:max-w-[60%]">
      I definitely have some articles coming up here. Follow my on twitter so
      you dont miss when that happens ;)
    </p>
    <div v-for="article in articles" :key="article.id">
      <NuxtLink :to="article.path" class="flex gap-2 md:items-center md:flex-row flex-col">
        <div>
          <h2>~ {{ article.title }}</h2>
          <p class="text-xs italic mute">{{ article.description }}</p>
        </div>

        <div class="border-b border-dotted my-2 flex-grow hidden md:block" />

        <p class="text-xs italic">{{ article.date }}</p>
      </NuxtLink>
    </div>
  </div>
</template>
