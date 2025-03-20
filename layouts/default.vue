<script lang="ts" setup>
useDarkTheme();
</script>

<template>
  <div class="default-layout h-screen flex flex-col">
    <PageHeader />
    <div class="flex flex-grow md:flex-row flex-col-reverse">
      <ContactLinks />
      <div class="flex-grow flex flex-col px-5 md:px-0 pt-[10%] md:pt-[14%]">
        <slot class="" />
        <PageFooter />
      </div>
      <NavigationLinks />
    </div>
  </div>
</template>
