<script setup lang="ts">
useSeoMeta({
  title: "Rubbie kelvin",
  description: "Software developer ・Nigeria",
  ogTitle: "Rubbie kelvin",
  ogDescription: "Software developer ・Nigeria",
  
});
</script>
<template>
  <div class="flex-grow flex gap-4 flex-col">
    <p class="md:text-base text-sm">Software developer ・Nigeria</p>
    <h1 class="lg:text-8xl md:text-7xl text-5xl">Rubbie Kelvin</h1>

    <p class="xl:max-w-[60%]">
      <span class="mute">
        I'm a guy who likes solving complex problems, from writing low-level
        gimicks to building interfaces with nice UIs. I easily adapt to any tool
        and my expertise are in Python, C++ and Js/Ts.
      </span>

      <span class="mute">
        Currently playing with rust for the fun of a new challenge.
      </span>
    </p>

    <NuxtLink
      to="https://drive.google.com/file/d/1OHI72FXBm46HS7XhxY_IObJM6buUcQ05/view?usp=sharing"
      external
      target="_blank"
      class="mt-4 w-max hover:underline"
    >
      ~ $ wget resume.pdf
    </NuxtLink>
  </div>
</template>
