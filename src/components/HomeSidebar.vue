<template>
  <div class="home-sidebar">
    <p class="panel-heading">Create a component</p>

    <b-input v-model="componentName" placeholder="Component name"></b-input>

    <Icons @getClickedIcon="addToSelectedElementList" />

    <button
      class="button is-primary"
      @click="addComponent"
      :disabled="!componentName"
    >
      Add Component
    </button>
  </div>
</template>

<script>
import Icons from './Icons';
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
    Icons
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
