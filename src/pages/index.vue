<script setup lang="ts">
import DynLayout from "@/components/DynLayout.vue";
</script>

<template>
  <DynLayout>
    <!-- main -->
    <p class="font-fira md:text-base text-sm">Software developer ・Nigeria</p>
    <h1 class="lg:text-8xl md:text-7xl text-5xl">Rubbie Kelvin</h1>
    <hr class="w-[40%] md:w-[20%]" />
    <p class="xl:max-w-[60%]">
      <span class="">
        I'm a guy who likes solving complex problems, from writing low-level
        gimicks to building interfaces with nice UIs. I easily adapt to any tool
        and my expertise are in Python, C++ and Js/Ts.
      </span>
      <br />
      <span class=""
        >Currently playing with rust for the fun of a new challenge.</span
      >
    </p>
    <a
      href="https://drive.google.com/file/d/1OHI72FXBm46HS7XhxY_IObJM6buUcQ05/view?usp=sharing"
      target="_blank"
      class="font-fira mt-4 w-max dark:text-white old-link"
    >
      ~ $ wget resume.pdf
    </a>
  </DynLayout>
</template>
