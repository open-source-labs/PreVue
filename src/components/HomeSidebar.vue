<template>
  <div class="sidebar">
    <header class="headline green--text text--accent-2 pa-2">
      {{ header }}
    </header>

    <!-- <v-form class="px-3"> -->
    <BaseTextfield
      v-model="componentName"
      label="Component Name"
      :value="componentName"
    />
    <section>
      <Icons @getClickedIcon="addToSelectedElementList" />
    </section>
    <!-- </v-form> -->
    <section>
      <h1 class="headline purple--text text--accent-2">Selected Elements</h1>
      <hr />
      <Queue :listToRender="selectedElementList" />
      <v-select
        v-model="selectedChildren"
        :items="Object.keys(componentMap).filter(comp => comp !== 'App')"
        label="Select"
        multiple
        chips
        hint="Select child components"
        persistent-hint
      ></v-select>
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
import Queue from './Queue';
import { mapState } from 'vuex';
import * as types from '../store/types.js';

export default {
  name: 'HomeSidebar',
  data: function() {
    return {
      componentName: '',
      selectedElementList: [],
      selectedChildren: []
    };
  },
  props: ['header', 'name'],
  components: {
    BaseTextfield,
    BaseButton,
    Icons,
    Queue
  },
  computed: {
    ...mapState(['componentMap'])
  },
  methods: {
    addComponent() {
      console.log('clicked add component');
      const htmlCode = [];
      this.selectedElementList.forEach(element => {
        htmlCode.push(this.$store.state.icons[element].html);
      });
      const payload = {
        componentName: this.componentName,
        htmlList: this.selectedElementList,
        children: this.selectedChildren,
        htmlCode
      };
      this.$store.dispatch(types.registerComponent, payload);
      this.componentName = '';
      console.log('FINISHED clicked add component');
    },
    consoleMap() {
      console.log(this.selectedChildren);
    },
    addToSelectedElementList(elementName) {
      this.selectedElementList.push(elementName);
    }
  }
};
</script>

<style>
.sidebar {
  display: grid;
  grid-template-rows: 0.5fr 0.5 300px 4fr 1fr;
}

/* .sidebar {
  background-color: aqua;
} */
</style>
