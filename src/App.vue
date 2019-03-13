<template>
  <div id="app">
    <v-app dark>
      <NavBar></NavBar>
      <v-content>
        <v-container fluid class="container">
          <router-view />
        </v-container>
      </v-content>
    </v-app>
  </div>
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
html {
  box-sizing: border-box;
  font-size: 10px;
}
*,
*:before,
*:after {
  box-sizing: inherit;
}
body {
  padding: 0;
  margin: 0;

  line-height: 2;
}
a {
  text-decoration: none;
  color: black;
}

#app {
  height: 100%;
  box-sizing: border-box;
  .container {
    height: 100%;
  }
}
</style>
