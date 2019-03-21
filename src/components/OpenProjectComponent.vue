<template>
  <button class="white--text" @click="openProjectJSON">OPEN PROJECT</button>
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
      //'asdf/asdff/sdf.txt -> sdf.txt
      return file.split('/').pop();
    },
    openProjectJSON() {
      ipc.send('show-open-dialog');
    }
  },
  mounted() {
    ipc.on('open-json-location', (event, data) => {
      //set state of local forage
      let fileName = this.parseFileName(data[0]);
      localforage
        .setItem(fileName, JSON.parse(fs.readFileSync(data[0], 'utf8')))
        .then(() => console.log('data', data));
      //create new tab name with file name
      this.$store.dispatch(addProject, {
        filename: fileName,
        lastSavedLocation: data[0]
      });
      //when tab is switch, it will go thr right path.
    });
  }
};
</script>

<style></style>
