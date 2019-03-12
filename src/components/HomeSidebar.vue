<template>
  <div class="home-sidebar">
    <header class="headline green--text text--accent-2 pa-2">Create a Component</header>

    <BaseTextfield v-model="componentName" label="Component Name" :value="componentName"/>
    <section>
      <Icons @getClickedIcon="addToSelectedElementList"/>
    </section>

    <section>
      <v-select
        v-model="selectedChildren"
        :items="Object.keys(componentMap).filter(comp => comp !== 'App')"
        label="Select child components"
        multiple
        chips
        hint
        persistent-hint
      ></v-select>
      <h1 class="headline purple--text text--accent-2">Selected Elements</h1>
      <hr>
      <HomeQueue :listToRender="selectedElementList"/>
    </section>

    <BaseButton
      :componentName="componentName"
      name="add component"
      icon="add_circle"
      @click="addComponent"
    ></BaseButton>
  </div>
</template>

<script>
import BaseTextfield from './BaseTextfield';
import BaseButton from './BaseButton';
import Icons from './Icons';
import HomeQueue from './HomeQueue';
import { mapState } from 'vuex';
import * as types from '../store/types.js';

export default {
  name: 'HomeSidebar',
  data: function() {
    return {
      componentName: '',
      selectedChildren: []
    };
  },

  components: {
    BaseTextfield,
    BaseButton,
    Icons,
    HomeQueue
  },
  computed: {
    ...mapState(['componentMap', 'selectedElementList'])
  },
  methods: {
    addComponent() {
      const payload = {
        componentName: this.componentName,
        x: 0,
        y: 0,
        w: 200,
        h: 200,
        htmlList: this.selectedElementList,
        children: this.selectedChildren
      };

      this.$store
        .dispatch(types.registerComponent, payload)
        .then(() => {
          this.componentName = '';
          this.selectedChildren = [];
        })
        .catch(err => console.log(err));
    },

    addToSelectedElementList(elementName) {
      this.$store.dispatch(types.addToSelectedElementList, elementName);
    }
  }
};
</script>

<style scoped>
.home-sidebar {
  grid-area: home-sidebar;
  /* background-color: white; */
  border: 1px solid;
  padding: 10px;
  border-color: white;
}
</style>
