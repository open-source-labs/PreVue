<template>
  <v-toolbar flat app>
    <v-toolbar-side-icon
      v-if="show === 'home'"
      class="grey--text"
      v-on="$listeners"
    >
      <v-icon>add_circle_outline</v-icon>
    </v-toolbar-side-icon>
    <v-toolbar-side-icon v-if="show === 'tree'" class="grey--text" flat>
      <v-icon>landscape</v-icon>
    </v-toolbar-side-icon>
    <v-toolbar-title id="nav" class="nav">
      <router-link :to="{ name: 'home' }" class="prevue">
        <span class="white--text">Pre</span>
        <span class="green--text text--accent-2">Vue</span>
      </router-link>
      <nav>
        <router-link :to="{ name: 'tree' }">
          <span class="purple--text text--accent-2">Tree</span>
        </router-link>
      </nav>
    </v-toolbar-title>
  </v-toolbar>
</template>

<script>
export default {
  name: 'NavBar',
  props: ['show']
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
</style>
