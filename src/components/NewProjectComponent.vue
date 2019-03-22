<template>
  <!-- <button class="white--text" @click="addProject">NEW PROJECT</button> -->
  <button @click="addProject">
    <i class="fas fa-folder-plus fa-lg"></i>

    <br />
    <span class="white--text">Add Project</span>
  </button>
</template>

<script>
import { addProject } from '../store/types';

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
