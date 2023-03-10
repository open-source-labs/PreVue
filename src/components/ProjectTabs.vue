<template>
  <v-tabs @change="changeTab">
    <v-tab
      class="has-background-white tab-item"

    >{{ this.project }}</v-tab>
  </v-tabs>
</template>

<script>
import { mapState } from 'vuex';
import {
  setComponentMap,
  changeActiveTab,
  setRoutes,
  deleteProjectTab
} from '../store/storeTypes';
import localforage from 'localforage';

// const Mousetrap = require('mousetrap');

export default {
  name: 'ProjectTabs',
  computed: {...mapState(['projects', 'activeTab']),
  project: {
      get() {
        return this.$store.state.projectName;
      }
    }},
  created() {
    // Mousetrap.bind(['command+t', 'command+t'], () => {
    //   console.log('triggered');
    //   this.$store.dispatch(deleteProjectTab, this.activeTab);
    // });
  },
  methods: {
    changeTab(idx) {
      let currTab = this.$store.state.activeTab;
      //STORE PREV TAb IN LOCAL FORAGE IF NOT EXIST
      this.saveProjectToSession(this.projects[currTab].filename);

      this.$store.dispatch(changeActiveTab, idx);
      //RESET COMPONENT MAP IF NEW TAB PROJECT DOESN'T EXIST IN LOCALFORAGE
      localforage
        .getItem(this.projects[idx].filename)
        .then(value => {
          if (!value) {
            this.$store.dispatch(setComponentMap, {
              App: {
                children: []
              }
            });
            this.$store.dispatch(setRoutes, {
              HomeView: []
            });
          } else {
            console.log(value);
            this.$store.dispatch(setComponentMap, value.componentMap);
            this.$store.dispatch(setRoutes, value.routes);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    saveProjectToSession(projectName) {
      const currentState = this.$store.state;
      localforage
        .setItem(projectName, currentState)
        .then(() => console.log('saved ', projectName, 'to local forage'));
    }
  }
};
</script>

<style lang="scss" scoped>
// #project-tabs {
//   height: 30px;
// }
</style>
