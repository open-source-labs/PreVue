<template>
  <!-- <button class="save-icon" >SAVE PROJECT</button> -->
  <button
    @click="test"
    :style="{
      margin: '0px 50px 0px auto'
    }"
  >
    <i class="fas fa-save fa-lg"></i>

    <br />
    <span class="white--text">Save Project</span>
  </button>
</template>

<script>
// import localforage from 'localforage';
// import fs from 'fs-extra';
// var JSZip = require('jszip');

import JSZip from '@progress/jszip-esm';
import { saveAs } from 'file-saver';
import Handlebars from 'handlebars';

// const { ipcRender } = require('electron');

export default {
  name: 'SaveProjectComponent',
  methods: {
    testZipping() {
      const templateString = `
<html>
  <head>
    <title>{{ title }}</title>
  </head>
  <body>
    <h1>{{ heading }}</h1>
    <p>{{ content }}</p>
  </body>
</html>
`;

      const template = Handlebars.compile(templateString);

      const data = {
        title: 'My Page',
        heading: 'Hello, World!',
        content: 'This is some content.'
      };

      const fileContents = template(data);

      const zip = new JSZip();
      zip.file('handlebars.html', fileContents);
      zip.generateAsync({ type: 'blob' }).then(function(content) {
        saveAs(content, 'example.zip');
      });
    },
    test() {
      const zip = new JSZip();

      fetch(location)
        .then(res => res.arrayBuffer())
        .then(data => {
          return zip.file(fileName, data);
        })
        .then(() => {
          zip.generateAsync({ type: 'blob' }).then(function(content) {
            saveAs(content, 'example.zip');
          });
        });
    }
  }
  // parseFileName(file) {
  //   //'asdf/asdff/sdf.txt -> sdf.txt
  //   return file.split('/').pop();
  // }
  //   parseAndDelete(htmlList) {
  //     htmlList.forEach((element) => {
  //       if (element.children.length > 0) {
  //         console.log('in recurse');
  //         this.parseAndDelete(element.children);
  //       }
  //       delete element._vm;
  //       delete element.parent;
  //       delete element.open;
  //       delete element.active;
  //       delete element.style;
  //       delete element.class;
  //       delete element.innerStyle;
  //       delete element.innerClass;
  //       delete element.innerBackStyle;
  //       delete element.innerBackClass;
  //     });
  //   },
  //   saveProjectJSON() {
  //     console.log('THIS ONE');
  //     let projectLocation =
  //       this.$store.state.projects[this.$store.state.activeTab]
  //         .lastSavedLocation;
  //     if (projectLocation) {
  //       console.log('IN SAVE LOCATION', this.$store.state);
  //       let state = this.$store.state;
  //       let routes = state.routes;
  //       for (let view in routes) {
  //         routes[view].forEach((component) => {
  //           let htmlList = component.htmlList;
  //           this.parseAndDelete(htmlList);
  //         });
  //       }
  //       let componentMap = this.$store.state.componentMap;
  //       console.log('compmap', componentMap);
  //       for (let component in componentMap) {
  //         if (componentMap[component].htmlList) {
  //           let comphtml = componentMap[component].htmlList;
  //           console.log('COMPHTML', comphtml);
  //           this.parseAndDelete(comphtml);
  //         }
  //       }

  //       fs.writeFileSync(projectLocation, JSON.stringify(state));

  //       console.log('PROJECT SAVED TO LAST SAVED LOCATION');
  //     } else {
  //       ipcRender.send('show-save-json-dialog');
  //     }
  //   },
  // },
  // mounted() {
  //   ipcRender.on('save-json-location', (event, data) => {
  //     //delete original key from local forage
  //     let deleteKey =
  //       this.$store.state.projects[this.$store.state.activeTab].filename;
  //     localforage
  //       .removeItem(deleteKey)
  //       .then(function () {
  //         console.log(deleteKey, 'Key is cleared!');
  //       })
  //       .catch(function (err) {
  //         console.log(err);
  //       });

  //     let fileName = this.parseFileName(data);

  //     this.$set(this.$store.state.projects, this.$store.state.activeTab, {
  //       filename: fileName,
  //       lastSavedLocation: data,
  //     });
  //     let state = this.$store.state;
  //     let routes = state.routes;
  //     for (let view in routes) {
  //       routes[view].forEach((component) => {
  //         let htmlList = component.htmlList;
  //         this.parseAndDelete(htmlList);
  //       });
  //     }
  //     let componentMap = this.$store.state.componentMap;
  //     for (let component in componentMap) {
  //       if (component.htmlList) {
  //         let comphtml = component.htmlList;
  //         this.parseAndDelete(comphtml);
  //       }
  //     }

  //     fs.writeFileSync(data, JSON.stringify(state));
  //     localforage
  //       .setItem(fileName, JSON.parse(fs.readFileSync(data, 'utf8')))
  //       .then((result) => {
  //         console.log('saved ', fileName, 'to local forage');
  //         console.log('result is', result);
  //       });
  //     console.log('PROJECT SAVED AS A JSON OBJECT!');
  //   });
  // },
};
</script>

<style></style>
