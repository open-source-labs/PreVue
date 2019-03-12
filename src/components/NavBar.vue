<template>
  <v-toolbar dense id="toolbar">
    <v-toolbar-title id="nav" class="nav">
      <span>
        <v-icon class="save-icon" @click="saveState">save_alt</v-icon>
      </span>
      <v-spacer></v-spacer>
      <router-link :to="{ name: 'tree' }">
        <span id="tree-link" class="purple--text text--accent-2"
          >View Component Tree</span
        >
      </router-link>
      <router-link :to="{ name: 'home' }" class="prevue">
        <span class="white--text">Pre</span>
        <span class="green--text text--accent-2">Vue</span>
      </router-link>
    </v-toolbar-title>
  </v-toolbar>
</template>

<script>
import localforage from 'localforage';
export default {
  name: 'NavBar',
  props: ['route'],
  methods: {
    saveState() {
      const currentState = this.$store.state;
      localforage
        .setItem('state', currentState)
        .then(data => console.log(data));
    }
  }
};
</script>

<style scoped>
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
}

#toolbar {
  background-color: #393f4d;
}
/* .nav > .prevue {
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
} */

.save-icon:hover {
  cursor: pointer;
}
</style>
