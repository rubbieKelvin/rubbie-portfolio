<template>
  <NavBar class="text-base text-textBlack"/>
  <router-view class="text-base text-textBlack"/>
  <BottomBar class="text-base text-textBlack"/>
</template>

<script>
  import NavBar from './components/NavBar.vue';
  import BottomBar from './components/BottomBar.vue';

  export default {
    components: {
      NavBar,
      BottomBar
    }
  }
</script>
