<template>
  <!--resets state for a new project-->
  <v-btn id="new-project-btn" @click="newProject">
    <br />
    <span class="white--text">NEW PROJECT</span>
  </v-btn>
</template>

<script>
import { mapActions } from 'vuex';
import icons from '../store/state/icons';
import htmlElementMap from '../store/state/htmlElementMap';

export default {
  name: 'NewProjectComponent',
  methods: {
    ...mapActions(['replaceState']),
    newProject() {
      const validated = this.$store.state.loggedIn;
      const state = {
        icons,
        htmlElementMap,
        componentMap: {
          App: {
            componentName: 'App',
            children: ['HomeView'],
            htmlList: []
          },
          HomeView: {
            componentName: 'HomeView',
            children: [],
            htmlList: []
          }
        },
        routes: {
          HomeView: []
        },

        componentNameInputValue: '',
        activeRoute: 'HomeView',
        activeComponent: '',
        selectedElementList: [],
        projectName: 'Project-Name',
        editedProjectName: 'Project-Name',
        componentChildrenMultiselectValue: [],
        modalOpen: false,
        htmlElements: [],
        saved: false,
        loggedIn: validated,
        rerenderKey: 0
      };
      this.replaceState(state);
    }
  }
};
</script>

<style>
#new-project-btn {
  font-weight: 700;
  font-size: 14px;
}

.white--text {
  font-size: 14px;
}
</style>
