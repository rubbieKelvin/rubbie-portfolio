<script lang="ts" setup>
useDarkTheme();
</script>

<template>
  <div class="default-layout max-h-full h-full flex flex-col">
    <PageHeader />
    <div class="flex flex-grow md:flex-row flex-col-reverse h-0 max-h-full">
      <ContactLinks />
      <div
        class="flex-grow flex flex-col px-5 md:px-0 max-h-full h-full overflow-y-auto"
      >
        <div class="min-h-[3vh] md:min-h-[14vh]" />
        <slot />

        <PageFooter />
      </div>
      <NavigationLinks />
    </div>
  </div>
</template>
