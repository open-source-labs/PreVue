<template>
  <button class="white--text" @click="addProject">NEW PROJECT</button>
</template>

<script>
import { addProject } from '../store/types';

const ipc = require('electron').ipcRenderer;
export default {
  name: 'NewProjectComponent',
  created() {
    Mousetrap.bind(['command+n', 'ctrl+n'], () => {
      this.addProject();
    });
  },
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
