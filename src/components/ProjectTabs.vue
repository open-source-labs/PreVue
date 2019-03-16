<template>
  <b-tabs type="is-boxed" id="project-tabs" @change="changeTab">
    <b-tab-item
      class="has-background-white"
      id="tab-item"
      v-for="(label, idx) in activeProjects"
      :label="label"
      :key="idx"
    ></b-tab-item>
  </b-tabs>
</template>

<script>
import { mapState } from 'vuex';
import { setComponentMap, changeActiveTab } from '../store/types';
import localforage from 'localforage';

export default {
  name: 'ProjectTabs',
  computed: mapState(['activeProjects']),
  methods: {
    changeTab(idx) {
      let currTab = this.$store.state.activeTab;
      console.log(this.activeProjects[currTab], ' was clicked');
      //STORE PREV TAb IN LOCAL FORAGE IF NOT EXIST
      this.saveProjectToSession(this.activeProjects[currTab]);
      console.log('SAVED', this.activeProjects[currTab], ' TO SESSION');

      this.$store.dispatch(changeActiveTab, idx);
      //RESET COMPONENT MAP IF NEW TAB PROJECT DOESN'T EXIST IN LOCALFORAGE
      localforage
        .getItem(this.activeProjects[idx])
        .then(value => {
          if (!value) {
            this.$store.dispatch(setComponentMap, {
              App: {
                children: []
              }
            });
          } else {
            console.log(value);
            this.$store.dispatch(setComponentMap, value.componentMap);
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
  height: 20px;
}
</style>
