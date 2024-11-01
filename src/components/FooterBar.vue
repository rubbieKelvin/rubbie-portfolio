<script setup lang="ts">
// @ts-ignore
import SvgIcon from "@jamescoyle/vue-icon";
import { socialLinks } from "@/constants";
import { mdiVuejs } from "@mdi/js";

const date = new Date();
const year = date.getFullYear();
</script>

<template>
  <div
    class="flex items-center flex-col gap-2 md:flex-row justify-between p-6 md:p-4 bg-black text-white md:text-gray-900 md:bg-gray-100 border-t"
  >
    <span class="text-sm">
      Copyright Rubbie kelvin &copy; {{ year }}. All rights reserved.
    </span>
    <span class="hidden md:block text-sm"> ——— </span>
    <span class="text-sm">
      Made with &#10084;&#65039; and
      <SvgIcon
        type="mdi"
        :path="mdiVuejs"
        size="18"
        class="text-green-600 inline"
      />
    </span>

    <div class="flex gap-4 md:gap-2">
      <a
        v-for="sl in socialLinks"
        :key="sl.label"
        :href="sl.link"
        :title="sl.label"
        class="flex text-gray-600 hover:text-gray-900 rounded-full"
      >
        <SvgIcon type="mdi" :path="sl.icon" class=" w-18 md:w-4" />
      </a>
    </div>
  </div>
</template>
