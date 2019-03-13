<template>
  <div class="home-sidebar">
    <!-- <header class="green--text text--accent-2 pa-2">Create a Component</header> -->
    <RouteDisplay></RouteDisplay>
    <section class="add-component-display">
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
          label="Select child components"
          multiple
          chips
          hint
          persistent-hint
        ></v-select>
        <header class="purple--text text--accent-2">Selected Elements</header>
        <hr />
        <!-- <HomeQueue :listToRender="selectedElementList"/> -->
      </section>

      <BaseButton
        :componentName="componentName"
        name="add component"
        icon="add_circle"
        @click="addComponent"
      ></BaseButton>
    </section>
  </div>
</template>

<script>
import RouteDisplay from './RouteDisplay';
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
    HomeQueue,
    RouteDisplay
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
  width: 250px;
  border: 1px solid;
  padding: 10px;
  border-color: white;
}

.add-component-display {
  background-color: red;
}
</style>
