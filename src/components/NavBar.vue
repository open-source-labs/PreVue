<template>
  <nav
    class="navbar"
    id="navbar"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="navbar-brand">
      <router-link :to="{ name: 'home' }" class="navbar-item" href="#">
        <img
          src="https://bulma.io/images/bulma-logo.png"
          width="112"
          height="28"
        />
      </router-link>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <router-link :to="{ name: 'tree' }" class="navbar-item" href="#">
          <i class="fas fa-tree fa-lg"></i>
        </router-link>
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
// import { addProject } from '../store/types';
// import localforage from 'localforage';

export default {
  name: 'NavBar',
  props: ['route'],
  components: {
    SaveProjectComponent,
    OpenProjectComponent,
    NewProjectComponent,
    ExportProjectComponent
  }
};
</script>

<style scoped>
#navbar {
  background-color: #d4d4dc;
  height: 50px;
}

.save-icon:hover {
  cursor: pointer;
}

button {
  margin: 5px;
  font-size: 15px;
  background: none;
  border: none;
}
button:hover {
  color: #00c4a7;
}
</style>
