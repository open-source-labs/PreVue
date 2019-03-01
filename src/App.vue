<template>
  <v-app>
    <div id="app">
      <nav id="nav">
        <br />
        <!-- <v-toolbar-side-icon flat app> -->
        <v-toolbar flat app>
          <v-toolbar-side-icon class="grey--text" @click="drawer = !drawer" />
          <v-toolbar-title>
            <span class="green--text">Pre</span>
            <span class="black--text">Vue</span>

            |
            <!-- <li>Home</li>
            <li>Tree</li>-->
          </v-toolbar-title>
          <router-link to="/tree">Tree</router-link>
        </v-toolbar>
      </nav>
      <v-content>
        <router-view />
      </v-content>
      <v-navigation-drawer right v-model="drawer" app>
        <Sidebar />
      </v-navigation-drawer>
    </div>
  </v-app>
</template>

<script>
import Sidebar from './components/SideBar';
export default {
  data() {
    return {
      drawer: false
    };
  },
  components: {
    Sidebar
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
