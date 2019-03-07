<template>
  <div class="sidebar">
    <h1 class="headline green--text text--accent-2">Edit {{ clickedComponent }}</h1>

    <v-form class="px-3">
      <section>
        <Icons @getClickedIcon="addToComponentElementList"/>
      </section>
    </v-form>

    <section>
      <!-- <button @click="consoleMap">Click</button> -->
      <h1 class="headline purple--text text--accent-2">Selected Elements</h1>
      <hr>
      <EditQueue/>
      <!-- <v-select
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
      ></v-select>-->
    </section>
  </div>
</template>

<script>
import Icons from './Icons';
import EditQueue from './EditQueue';
import { mapState } from 'vuex';
import * as types from '../store/types.js';

export default {
  name: 'EditSideBar',
  components: {
    Icons,
    EditQueue
  },
  methods: {
    addToComponentElementList(elementName) {
      this.$store.dispatch(types.addToComponentElementList, elementName);
    }
  },
  computed: {
    ...mapState(['clickedComponent', 'componentMap'])
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
