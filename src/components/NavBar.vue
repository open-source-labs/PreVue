<template>
  <v-toolbar flat app>
    <v-toolbar-title id="nav" class="nav">
      <router-link :to="{ name: 'home' }" class="prevue">
        <span class="white--text">Pre</span>
        <span class="green--text text--accent-2">Vue</span>
      </router-link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <router-link :to="{ name: 'tree' }">
        <span id="tree-link" class="purple--text text--accent-2">View Component Tree</span>
      </router-link>
    </v-toolbar-title>
  </v-toolbar>
</template>

<script>
export default {
  name: 'NavBar',
  props: ['route']
};
</script>

<style scoped>
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
}
.nav > .prevue {
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 1.5em;
  color: #39b982;
  text-decoration: none;
}
.nav .nav-item {
  box-sizing: border-box;
  margin: 0 5px;
  color: rgba(0, 0, 0, 0.5);
  text-decoration: none;
}
.nav .nav-item.router-link-exact-active {
  color: #39b982;
  border-bottom: solid 2px #39b982;
}

.tree-link {
  float: right;
}

a {
  text-decoration: none;
}
</style>
