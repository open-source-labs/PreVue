<template>
  <!--the navbar on the main and tree views-->
  <v-app-bar
    id="navbar"
    color="blue-grey-lighten-4"
    role="navigation"
    aria-label="main navigation"
  >
    <img src="../assets/logo.png" id="prevue-logo" @click="routeHome" />
    <h1 id="prevue">PreVue</h1>
    <button @click="routeTree">
      <i class="fas fa-tree fa-lg"></i>
      <br />
      <span class="white--text">Tree</span>
    </button>
    <SaveProjectComponent v-if="validUser"></SaveProjectComponent>
    <ExportProjectComponent></ExportProjectComponent>
    <OpenProjectComponent v-if="validUser"></OpenProjectComponent>
    <LogOutComponent v-if="validUser" ></LogOutComponent>
  </v-app-bar>
</template>

<script>
// import { mapState } from 'vuex';
// import fs from 'fs-extra';
// import path from 'path';
// import { addProject, changeTabName } from '../store/types';
// import localforage from 'localforage';
import SaveProjectComponent from '@/components/SaveProjectComponent.vue';
import OpenProjectComponent from '@/components/OpenProjectComponent.vue';
// import NewProjectComponent from '@/components/NewProjectComponent.vue';
import ExportProjectComponent from '@/components/ExportProjectComponent.vue';
import LogOutComponent from './LogOutComponent.vue';
// import ExportProjectComponent from './ExportProjectComponent.vue';

// const ipc = require('electron').ipcRenderer;
// const Mousetrap = require('mousetrap');

// hot key commands
// add save as
// add new tab

export default {
  name: 'NavBar',
  props: ['route', 'imageURL'],

  components: {
    SaveProjectComponent,
    OpenProjectComponent,
    // NewProjectComponent,
    LogOutComponent,
    ExportProjectComponent,
  },
  methods: {
    // routing to homepage and tree view
    routeHome() {
      this.$router.push({ path: '/home' });
    },
    routeTree() {
      this.$router.push({ path: '/tree' });
    }
  },
  computed: {
    validUser(){
      return this.$store.state.loggedIn;
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
  margin-right: 10px;
}
#prevue-logo {
  height: 80px;
  width: 70px;
  transform: scale(0.7);
}

#prevue-logo:hover {
  cursor: pointer;
}

.v-toolbar__content {
  background-color: #d4d4dc;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
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
