<script setup lang="ts">
useSeoMeta({
  title: "Blog",
  description: "Checkout my blog posts",
  ogTitle: "Blog | Rubbie kelvin",
  ogDescription: "Checkout my blog posts",
  
});

// Use refresh to ensure data is fetched on both server and client
const { data: articles, refresh } = await useAsyncData("blog-articles", async () => {
  try {
    const result = await queryCollection("blog").order("date", "DESC").all();
    return result || [];
  } catch (error) {
    console.error("Error fetching blog articles:", error);
    return [];
  }
}, {
  default: () => [],
  server: true
});

// Ensure we have data on the client side
onMounted(() => {
  if (!articles.value || articles.value.length === 0) {
    refresh();
  }
});

// Format date to be more readable
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};
</script>

<template>
  <div class="flex-grow flex gap-4 flex-col">
    <div class="flex items-center justify-between">
      <h1 class="lg:text-8xl md:text-7xl text-5xl">Blog</h1>
      <NuxtLink to="/rss.xml" external class="muted hover:underline">~ $ wget rss.xml</NuxtLink>
    </div>
    <p v-if="!articles || articles.length === 0" class="xl:max-w-[60%] mute">
      I definitely have some articles coming up here. Follow me on x/twttr so
      you don't miss when that happens ;)
    </p>
    
    <div v-if="articles && articles.length > 0" class="space-y-5 mt-6">
      <article v-for="article in articles" :key="article.id" class="group">
        <NuxtLink
          :to="article.path"
          class="flex gap-4 md:items-center md:flex-row flex-col hover:bg-gray-50 dark:hover:bg-gray-900/30 p-4 rounded-lg transition-colors duration-200"
        >
          <div class="flex-grow space-y-2">
            <h2 class="text-lg font-medium group-hover:underline">~ {{ article.title }}</h2>
            <p class="text-sm mute leading-relaxed">{{ article.description }}</p>
          </div>

          <div class="border-b border-dotted border-gray-300 dark:border-gray-600 flex-grow hidden md:block mx-4" />

          <div class="flex-shrink-0">
            <time class="text-sm italic mute whitespace-nowrap" :datetime="article.date">
              {{ formatDate(article.date) }}
            </time>
          </div>
        </NuxtLink>
      </article>
    </div>
  </div>
</template>
