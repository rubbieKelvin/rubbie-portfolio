<script setup lang="ts">
// @ts-ignore
import SvgIcon from "@jamescoyle/vue-icon";
import { socialLinks } from "@/constants";

const date = new Date();
const year = date.getFullYear();
</script>

<template>
  <div class="flex items-center justify-between p-4 bg-gray-100 border-t">
    <p class="text-sm text-gray-900">Copyright Rubbie kelvin &copy; {{ year }}. All rights reserved.</p>

    <div class="flex gap-2">
      <a
        v-for="sl in socialLinks"
        :key="sl.label"
        :href="sl.link"
        :title="sl.label"
        class="flex text-gray-600 hover:text-gray-900 rounded-full"
      >
        <SvgIcon type="mdi" :path="sl.icon" size="16" />
      </a>
    </div>
  </div>
</template>
