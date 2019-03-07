<template>
  <div class="sidebar">
    <header class="headline green--text text--accent-2 pa-2">
      Create a Component
    </header>

    <BaseTextfield
      v-model="componentName"
      label="Component Name"
      :value="componentName"
    />
    <section>
      <Icons @getClickedIcon="addToSelectedElementList" />
    </section>

    <section>
      <v-select
        v-model="selectedChildren"
        :items="Object.keys(componentMap).filter(comp => comp !== 'App')"
        label="Select"
        multiple
        chips
        hint="Select child components"
        persistent-hint
      ></v-select>
      <h1 class="headline purple--text text--accent-2">Selected Elements</h1>
      <hr />
      <HomeQueue :listToRender="selectedElementList" />
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
      const { componentName, selectedElementList: htmlList, children } = this;
      const payload = {
        componentName,
        htmlList,
        children
      };
      this.$store
        .dispatch(types.registerComponent, payload)
        .then(() => {
          this.componentName = '';
          this.selectedChildren = [];
        })
        .catch(err => console.log(err));
    },
    consoleMap() {
      console.log(this.selectedChildren);
    },
    addToSelectedElementList(elementName) {
      this.$store.dispatch(types.addToSelectedElementList, elementName);
    }
  }
};
</script>

<style>
.sidebar {
  display: grid;
  grid-template-rows: 0.5fr 0.5fr 0.5fr 4fr 1fr;
}

/* .sidebar {
  background-color: aqua;
} */
</style>
