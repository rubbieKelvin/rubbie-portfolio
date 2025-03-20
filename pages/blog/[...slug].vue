<script lang="ts" setup>
const route = useRoute();

const slug = computed(() => {
  if (Array.isArray(route.params.slug)) {
    return route.params.slug[0];
  }
  return route.params.slug;
});

const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection("blog").path(`/blog/${slug.value}`).first();
});

useSeoMeta({
  title: page.value?.title ?? "404",
  description: page.value?.description ?? "Blog post not found",
});
</script>

<template>
  <div class="flex-grow flex gap-4 flex-col">
    <template v-if="page">
      <h1 class="lg:text-6xl md:text-5xl text-4xl">{{ page.title }}</h1>
      <div class="flex gap-2 items-center">
        <p class="text-xs italic">{{ page.date }}</p>
        <span v-if="page.tags" class="text-xs italic">&middot;</span>
        <div v-if="page.tags" class="flex gap-2 flex-wrap">
          <p
            v-for="tag in page.tags"
            :key="tag"
            class="text-xs italic bg-gray-500 text-white rounded px-1"
          >
            {{ tag }}
          </p>
        </div>
      </div>

      <ContentRenderer class="content-renderer" :value="page" />
    </template>

    <template v-else>
      <h1 class="lg:text-8xl md:text-7xl text-5xl">:(</h1>
      <h2 class="text-2xl">404 &middot; Blog post not found</h2>
      <p class="xl:max-w-[60%]">
        I'm sure this is embarrasing, but the page you are looking for does not
        exist.
      </p>
      <div class="flex gap-2 flex-col">
        <NuxtLink to="/blog" class="text-sm"
          >~ Go back to the <span class="underline">blog</span></NuxtLink
        >
        <NuxtLink to="/" class="text-sm"
          >~ Go back to the <span class="underline">home page</span></NuxtLink
        >
      </div>
    </template>
  </div>
</template>
