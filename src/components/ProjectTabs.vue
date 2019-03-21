<template>
  <div id="project-tabs">
    <b-tabs type="is-boxed" @change="changeTab">
      <b-tab-item
        class="has-background-white tab-item"
        v-for="(label, idx) in projects"
        :label="label.filename"
        :key="idx"
      ></b-tab-item>
    </b-tabs>
    <div></div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { setComponentMap, changeActiveTab, setRoutes } from '../store/types';
import localforage from 'localforage';
import { deleteProjectTab } from '../store/types';
const Mousetrap = require('mousetrap');

export default {
  name: 'ProjectTabs',
  computed: mapState(['projects', 'activeTab']),
  created() {
    Mousetrap.bind(['command+t', 'command+t'], () => {
      console.log('triggered');
      this.$store.dispatch(deleteProjectTab, this.activeTab);
    });
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
#project-tabs {
  height: 30px;
}
</style>
