<template>
  <div class="sidebar">
    <header class="headline green--text text--accent-2 pa-2">{{ header }}</header>

    <!-- <v-form class="px-3"> -->
    <BaseTextfield v-model="componentName" label="Component Name" :value="componentName"/>
    <section>
      <Icons @getClickedIcon="addToSelectedElementList"/>
    </section>
    <!-- </v-form> -->
    <section>
      <h1 class="headline purple--text text--accent-2">Selected Elements</h1>
      <hr>
      <Queue :name="name"/>
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

    <BaseButton :componentName="componentName" name="add component" icon="add_circle"></BaseButton>
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
      selectedElementList: []
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
    ...mapState(['elementsList', 'componentMap', 'selectedChildren']),
    selectedChildren: {
      get() {
        return this.$store.state.selectedChildren;
      },
      set(newArray) {
        console.log(newArray);
        this.$store.commit(types.UPDATE_SELECTED_CHILDREN, newArray);
      }
    }
  },
  methods: {
    addToSelectedElementList(elementName) {
      // console.log('icon', icon);
      this.selectedElementList.push(elementName);
      console.log(this.selectedElementList);
    }
  }
};
</script>

<style>
.sidebar {
  display: grid;
  /* grid-template-rows: 0.5fr 3.5fr 4fr 1fr; */
}

/* .sidebar {
  background-color: aqua;
} */
</style>
