<template>
  <div class="sidebar">
    <header class="headline green--text text--accent-2 pa-2">{{ header }}</header>

    <v-form class="px-3">
      <BaseTextfield v-model="componentName" label="Component Name" :value="componentName"/>
      <section>
        <Icons/>
      </section>
    </v-form>

    <section>
      <button @click="consoleMap">Click</button>
      <h1 class="headline purple--text text--accent-2">Selected Elements</h1>
      <hr>
      <Queue :name="name"/>
      <v-select
        v-model="selectedChildren"
        :items="Object.keys(componentMap)"
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
  name: 'SideBar',
  data: function() {
    return {
      componentName: ''
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
    addComponent() {
      const htmlCode = [];
      this.elementsList.forEach(element => {
        htmlCode.push(this.$store.state.icons[element.text].html);
      });
      const payload = {
        name: this.componentName,
        htmlList: this.elementsList,
        children: this.selectedChildren,
        htmlCode
      };
      this.$store.dispatch(types.ADD_TO_COMPONENT_MAP_ACTION, payload);
      this.componentName = '';
    },
    consoleMap() {
      console.log(this.selectedChildren);
    }
  }
};
</script>

<style>
.sidebar {
  display: grid;
  grid-template-rows: 0.5fr 3.5fr 4fr 1fr;
}

/* .sidebar {
  background-color: aqua;
} */
</style>
