<template>
  <nav
    class="navbar is-mobile is-fixed-top"
    id="navbar"
    role="navigation"
    aria-label="main navigation"
  >
    <img src="../assets/logo.png" id="prevue-logo" @click="routeHome" />

    <div id="navbarBasicExample" class="navbar-menu is-mobile">
      <div class="navbar-start">
        <div class="navbar-item">
          <div>
            <h1 id="prevue">PreVue</h1>
          </div>
        </div>
        <div class="navbar-item">
          <button @click="routeTree">
            <i class="fas fa-tree fa-lg"></i>

            <br />
            <span class="white--text">Tree</span>
          </button>
        </div>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <SaveProjectComponent />
          <OpenProjectComponent />
          <NewProjectComponent />
          <ExportProjectComponent />
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex';
import fs from 'fs-extra';
import path from 'path';
import { addProject, changeTabName } from '../store/types';
import localforage from 'localforage';
import SaveProjectComponent from '@/components/SaveProjectComponent.vue';
import OpenProjectComponent from '@/components/OpenProjectComponent.vue';
import NewProjectComponent from '@/components/NewProjectComponent.vue';
import ExportProjectComponent from '@/components/ExportProjectComponent.vue';

const ipc = require('electron').ipcRenderer;
const Mousetrap = require('mousetrap');

// hot key commands
// add save as
// add new tab

export default {
  name: 'NavBar',
  props: ['route', 'imageURL'],

  components: {
    SaveProjectComponent,
    OpenProjectComponent,
    NewProjectComponent,
    ExportProjectComponent
  },
  methods: {
    routeHome() {
      this.$router.push({ path: '/' });
    },
    routeTree() {
      this.$router.push({ path: '/tree' });
    }
  }
};
</script>

<style scoped>
#prevue {
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 2.5em;
  color: #39b982;
  text-decoration: none;
}
#prevue-logo {
  height: 80px;
  width: 70px;
  padding-left: 2em;
  padding-bottom: 2.75em;
}

#prevue-logo:hover {
  cursor: pointer;
}
#navbar {
  background-color: #d4d4dc;
  height: 50px;
}

.save-icon:hover {
  cursor: pointer;
}

button {
  margin: 5px;
  font-size: 12px;
  background: none;
  border: none;
}
button:hover {
  color: #00c4a7;
}
</style>
