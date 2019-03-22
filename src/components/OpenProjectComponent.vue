<template>
  <button @click="openProjectJSON">
    <i class="fas fa-folder-open fa-lg"></i>

    <br />
    <span class="white--text">Open Project</span>
  </button>
</template>

<script>
import localforage from 'localforage';
import fs from 'fs-extra';
import { addProject } from '../store/types';

const ipc = require('electron').ipcRenderer;
export default {
  name: 'OpenProjectComponent',
  created() {
    Mousetrap.bind(['command+o', 'ctrl+o'], () => {
      this.openProjectJSON();
    });
  },
  methods: {
    parseFileName(file) {
      return file.split('/').pop();
    },
    openProjectJSON() {
      ipc.send('show-open-dialog');
    }
  },
  mounted() {
    ipc.on('open-json-location', (event, data) => {
      let fileName = this.parseFileName(data[0]);
      localforage
        .setItem(fileName, JSON.parse(fs.readFileSync(data[0], 'utf8')))
        .then(() => console.log('data', data));
      this.$store.dispatch(addProject, {
        filename: fileName,
        lastSavedLocation: data[0]
      });
    });
  }
};
</script>

<style></style>
