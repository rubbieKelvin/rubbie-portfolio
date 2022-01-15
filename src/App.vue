<template>
  <NavBar/>
  <router-view/>
  <BottomBar/>
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
