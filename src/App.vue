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
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300&display=swap');
#app {
  height: 105vh;
  font-family: 'Nunito', sans-serif;
}
#nav {
  display: flex;
  justify-content: space-between;
}
</style>
