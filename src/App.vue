<template>
  <v-app dark>
    <div id="app">
      <NavBar :show="$route.name" @click="drawer = !drawer"></NavBar>
      <v-content>
        <router-view />
      </v-content>
      <v-navigation-drawer right v-model="drawer" app>
        <Sidebar header="Create" />
      </v-navigation-drawer>
    </div>
  </v-app>
</template>

<script>
import Sidebar from './components/SideBar';
import NavBar from '@/components/NavBar.vue';
export default {
  data() {
    return {
      drawer: false
    };
  },
  components: {
    Sidebar,
    NavBar
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: grid;
  grid-template-columns: 8fr 2fr;
  grid-template-areas: 'componentDisplay sidebar';
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
</style>
