<script lang="ts" setup>
useDarkTheme();
</script>

<template>
  <div class="default-layout h-screen flex flex-col">
    <PageHeader />
    <div class="flex flex-grow">
      <ContactLinks />
      <div class="flex-grow flex flex-col">
        <slot />
        <PageFooter />
      </div>
      <NavigationLinks />
    </div>
  </div>
</template>
