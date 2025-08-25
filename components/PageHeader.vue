<template>
  <div class="p-5 sticky top-0 bg dark:bg-bg-dark flex flex-col">
    <NuxtLink to="/"
      >rubbiekelvin@localhost ~ $ <span class="">status</span></NuxtLink
    >
    <div aria-hidden="true">
      <span class="dark:text-gray-500!">11-08-25 - </span>
      <span class="dark:text-yellow-500!"> [warning] </span>
      <span class="">
        This site is under development & some parts are broken.
      </span>
    </div>
    <div aria-hidden="true">
      <span class="dark:text-gray-500!">25-08-25 - </span>
      <span class="dark:text-blue-500!"> [info] </span>
      <span class="">
        This site is outdated and has moved to
        <NuxtLink
          to="www.rubbietheone.com"
          external
          class="underline text-blue-500!"
          >www.rubbietheone.com</NuxtLink
        >
      </span>
    </div>
    <div aria-hidden="true">
      <span class="dark:text-gray-500!">25-08-25 - </span>
      <span class="dark:text-blue-500!"> [info] </span>
      <span class=""> You'll be redirected in {{ timeLeft }} seconds </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
const timeLeft = ref(5);
let timeoutHandler: NodeJS.Timeout | null = null;

onMounted(() => {
  if (!window.origin.startsWith("http://localhost")) {
    timeoutHandler = setInterval(() => {
      if (timeLeft.value == 0) {
        if (timeoutHandler) clearInterval(timeoutHandler);
        window.location = "https://www.rubbietheone.com" as any;
        return
      }

      timeLeft.value -= 1;
    }, 1000);
  }
});
</script>
