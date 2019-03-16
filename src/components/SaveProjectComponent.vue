<template>
  <button class="save-icon" @click="saveProjectJSON">SAVE PROJECT</button>
</template>

<script>
import localforage from 'localforage';
import fs from 'fs-extra';

const ipc = require('electron').ipcRenderer;
export default {
  name: 'SaveProjectComponent',
  methods: {
    parseFileName(file) {
      //'asdf/asdff/sdf.txt -> sdf.txt
      return file.split('/').pop();
    },
    saveProjectJSON() {
      let projectLocation = this.$store.state.projects[
        this.$store.state.activeTab
      ].lastSavedLocation;
      if (projectLocation) {
        fs.writeFileSync(
          projectLocation,
          JSON.stringify(this.$store.state, null, 2)
        );
        console.log('PROJECT SAVED TO LAST SAVED LOCATION');
      } else {
        ipc.send('show-save-json-dialog');
      }
    }
  },
  mounted() {
    ipc.on('save-json-location', (event, data) => {
      //delete original key from local forage
      let deleteKey = this.$store.state.projects[this.$store.state.activeTab]
        .filename;
      localforage
        .removeItem(deleteKey)
        .then(function() {
          console.log(deleteKey, 'Key is cleared!');
        })
        .catch(function(err) {
          console.log(err);
        });

      let fileName = this.parseFileName(data);

      this.$set(this.$store.state.projects, this.$store.state.activeTab, {
        filename: fileName,
        lastSavedLocation: data
      });

      fs.writeFileSync(data, JSON.stringify(this.$store.state, null, 2));
      localforage
        .setItem(fileName, JSON.parse(fs.readFileSync(data, 'utf8')))
        .then(() => console.log('saved ', fileName, 'to local forage'));

      console.log('PROJECT SAVED AS A JSON OBJECT!');
    });
  }
};
</script>

<style></style>
