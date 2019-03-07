<template>
  <v-app dark>
    <div id="app">
      <NavBar></NavBar>
      <v-content class="content">
        <router-view/>
      </v-content>
    </div>
  </v-app>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
export default {
  components: {
    NavBar
  }
};
</script>

<style lang="scss" scoped>
#app {
  height: 100%;
  .content {
    height: 100%;
  }
}
#nav {
  margin-left: 0;
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    .router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
