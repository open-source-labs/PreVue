<template>
  <button class="white--text" @click="addProject">NEW PROJECT</button>
</template>

<script>
import { addProject } from '../store/types';

const ipc = require('electron').ipcRenderer;
export default {
  name: 'NewProjectComponent',
  methods: {
    addProject() {
      this.$store.dispatch(addProject, {
        filename: 'untitled-' + this.$store.state.projectNumber,
        lastSavedLocation: ''
      });
    }
  }
};
</script>

<style></style>
