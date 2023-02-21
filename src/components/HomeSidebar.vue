<template>
  <div class="home-sidebar">
    <p class="panel-heading">Create a component</p>
    <br />
    <form v-on:submit.prevent="handleClick">
      <b-input
        v-model="componentNameInputValue"
        placeholder="Component name"
      ></b-input>
    </form>

    <div class="icon-container">
      <Icons @getClickedIcon="addToSelectedElementList" />
    </div>
    <ChildrenMultiselect />
    <br />
    <button
      class="button is-primary"
      id="add-component-btn"
      @click="handleClick"
      :disabled="!componentNameInputValue"
    >
      Add Component
    </button>
  </div>
</template>

<script>
import Icons from './Icons';
import ChildrenMultiselect from '@/components/ChildrenMultiselect';
import { mapState, mapActions } from 'vuex';
import * as types from '../store/types.js';

export default {
  name: 'HomeSidebar',
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
        children: [],
        isActive: false
      };

      this.registerComponent(component);
    }
  }
};
</script>
<style scoped>
.is-primary {
  height: 45px;
}
form {
  margin-bottom: 2em;
}
#add-component-btn {
  height: 25px;

  width: 100%;
}
</style>
