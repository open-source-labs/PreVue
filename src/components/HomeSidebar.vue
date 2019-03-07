<template>
  <div class="sidebar">
    <header class="headline green--text text--accent-2 pa-2">
      Create a Component
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
      const htmlCode = [];
      this.selectedElementList.forEach(element => {
        htmlCode.push(this.$store.state.icons[element].html);
      });

      const {
        componentName,
        selectedElementList: htmlList,
        selectedChildren
      } = this;
      const payload = {
        componentName,
        htmlList,
        children: selectedChildren,
        htmlCode
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

    // addComponent() {
    //   const htmlCode = [];
    //   this.selectedElementList.forEach(element => {
    //     htmlCode.push(this.$store.state.icons[element].html);
    //   });
    //   console.log(this.componentName);
    //   const payload = {
    //     componentName: this.componentName,
    //     htmlList: this.selectedElementList,
    //     children: this.selectedChildren,
    //     htmlCode
    //   };
    //   this.$store.dispatch(types.registerComponent, payload);
    //   this.componentName = '';
    // }
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
