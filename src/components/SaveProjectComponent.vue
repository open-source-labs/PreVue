<template>
  <v-dialog transition="dialog-bottom-transition" width="300">
    <template v-slot:activator="{ props }">
      <v-btn color="white" v-bind="props"
        >
        <!-- <i class="fas fa-save fa-lg"></i> -->

        <br />
        <span class="white--text">Save Project</span></v-btn
      >
    </template>
    <template v-slot:default="{ isActive }">
      <v-card >
        <v-toolbar color="#39b982" title="Save your prototype"></v-toolbar>
        <v-card-text>
          <v-form
            ><v-text-field
              required
              v-model="projectName"
              variant="underlined"
              label="Project name"
              placeholder="myCustomProject"
              :style="{ color: 'black' }"
            >
            </v-text-field
          ></v-form>
        </v-card-text>
        <v-card-actions class="justify-end">
          <button @click="isActive.value = false; save()">Save</button>
          <v-btn variant="text" @click="isActive.value = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>

  <!-- <button class="save-icon" >SAVE PROJECT</button> -->
  <!-- <button
    @click="save"
    :style="{
      margin: '0px 50px 0px auto'
    }"
  >
    <i class="fas fa-save fa-lg"></i>

    <br />
    <span class="white--text">Save Project</span>
  </button> -->
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'SaveProjectComponent',
  methods: {
    ...mapActions(['nameProject']),
    save() {
      const stateToSave = {
        projectObject: this.$store.state,
        project_name: this.$store.state.projectName
      };
      fetch('http://localhost:8080/projects/saveProject', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(stateToSave),
        headers: { 'Content-type': 'application/json; charset=UTF-8' }
      });
    }
  },
  computed: {
    projectName: {
      get() {
        return this.$store.state.projectName;
      },
      set(value) {
        this.nameProject(value);
      }
    }
  }
};
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
// };
</script>

<style scoped>
.white--text {
  font-weight: 700;
}

.white--text:hover {
  color: #39b982;
}
</style>
