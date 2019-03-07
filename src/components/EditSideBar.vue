<template>
  <div class="sidebar">
    <h1 class="headline green--text text--accent-2">Edit {{ header }}</h1>

    <v-form class="px-3">
      <section>
        <Icons @getClickedIcon="addToSelectedElementList" />
      </section>
    </v-form>

    <section>
      <!-- <button @click="consoleMap">Click</button> -->
      <h1 class="headline purple--text text--accent-2">Selected Elements</h1>
      <hr />
      <Queue :name="name" />
      <v-select
        v-model="selectedChildren"
        :items="
          Object.keys(componentMap).filter(
            comp => comp !== name && comp !== 'App'
          )
        "
        label="Select"
        multiple
        chips
        hint="Select child components"
        persistent-hint
      ></v-select>
    </section>
  </div>
</template>

<script>
import Icons from './Icons';
import Queue from './Queue';
import { mapState } from 'vuex';
import * as types from '../store/types.js';

export default {
  name: 'EditSideBar',
  data: function() {
    return {
      componentName: ''
    };
  },
  props: ['header', 'name'],
  components: {
    Icons,
    Queue
  },
  computed: {
    ...mapState(['elementsList', 'componentMap', 'selectedChildren']),
    selectedChildren: {
      get() {
        return this.$store.state.componentMap[this.name].children;
      },
      set(newArray) {
        console.log(newArray);
        const payload = { name: this.name, newArray };
        this.$store.commit(types.UPDATE_CHILDREN, payload);
      }
    }
  },
  methods: {
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
  grid-template-rows: 0.5fr 2fr 2fr 2fr;
}

/* .sidebar {
  background-color: aqua;
} */
</style>
