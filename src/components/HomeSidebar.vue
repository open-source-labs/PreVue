<template>
  <div class="home-sidebar">
    <p class="panel-heading">Create a component</p>

    <b-input v-model="componentNameInputValue" placeholder="Component name"></b-input>

    <Icons @getClickedIcon="addToSelectedElementList"/>

    <button
      class="button is-primary"
      @click="handleClick"
      :disabled="!componentNameInputValue"
    >Add Component</button>
    <ChildrenMultiselect/>
  </div>
</template>

<script>
import Icons from './Icons';
import ChildrenMultiselect from '@/components/ChildrenMultiselect';
import { mapState, mapActions } from 'vuex';
import * as types from '../store/types.js';

export default {
  name: 'HomeSidebar',
  data: function() {
    return {
      children: []
    };
  },
  components: {
    ChildrenMultiselect,
    Icons
  },
  computed: {
    ...mapState(['componentMap', 'selectedElementList']),
    componentNameInputValue: {
      get() {
        return this.$store.state.componentNameInputValue;
      },
      set(value) {
        this.updateComponentNameInputValue(value);
      }
    }
  },
  methods: {
    ...mapActions([
      'registerComponent',
      'addToSelectedElementList',
      'updateComponentNameInputValue'
    ]),
    handleClick() {
      const component = {
        componentName: this.componentNameInputValue,
        x: 0,
        y: 0,
        w: 200,
        h: 200,
        htmlList: this.selectedElementList,
        children: this.children,
        isActive: false
      };

      this.registerComponent(component)
        .then(() => {
          this.children = [];
        })
        .catch(err => console.log(err));
    }
  }
};
</script>
