<template>
  <v-toolbar flat app>
    <v-toolbar-title id="nav" class="nav">
      <router-link :to="{ name: 'home' }" class="prevue">
        <span class="white--text">Pre</span>
        <span class="green--text text--accent-2">Vue</span>
      </router-link>
      <router-link :to="{ name: 'tree' }">
        <span id="tree-link" class="purple--text text--accent-2"
          >View Component Tree</span
        >
      </router-link>
      <button class="white--text" @click="exportProject">
        EXPORT YOUR PROJECT
      </button>
      <span>
        <v-icon class="save-icon" @click="saveState">save_alt</v-icon>
        <span>save</span>
      </span>
    </v-toolbar-title>
  </v-toolbar>
</template>

<script>
import fs from 'fs-extra';
import path from 'path';
// const { remote } = require('electron');
const ipc = require('electron').ipcRenderer;

import localforage from 'localforage';
export default {
  name: 'NavBar',
  props: ['route'],
  methods: {
    exportProject: function() {
      ipc.send('show-dialog');
    },
    saveState() {
      const currentState = this.$store.state;
      localforage
        .setItem('state', currentState)
        .then(data => console.log(data));
    }
  },
  mounted() {
    ipc.on('project-location', (event, data) => {
      console.log(data);
      if (!fs.existsSync(data)) {
        fs.mkdirSync(data);
        console.log('FOLDER CREATED!');
      }
      fs.writeFileSync(path.join(data, 'hello.txt'), 'HELLO');
      fs.copySync('./../vue-boiler-plate', data);
    });
  }
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

.save-icon:hover {
  cursor: pointer;
}
</style>
