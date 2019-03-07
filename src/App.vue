<template>
  <v-app dark>
    <div id="app">
      <NavBar :show="$route.name"></NavBar>
      <v-content class="content">
        <router-view />
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

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  width: 100%;
}
#nav {
  margin-left: 0;
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.content {
  width: 100%;
  height: 100%;
}
</style>
