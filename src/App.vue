<template>
  <v-card id="app">
    <v-layout>
      <NavBar
        v-if="!$route.meta.hideNavbar"
        id="nav"
        imageUrl="../src/assets/logo.png"
      ></NavBar>

      <v-main style="min-height: 300px"><router-view /></v-main>
    </v-layout>
  </v-card>
</template>

<script>
import NavBar from '@/components/NavBar.vue';

export default {
  components: {
    NavBar
  }
};
</script>

<style lang="scss">
#app {
  height: 105vh;
}
#nav {
  display: flex;
  justify-content: space-between;
}
</style>
