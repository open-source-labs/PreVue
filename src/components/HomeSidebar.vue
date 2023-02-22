<template>
  <div class="home-sidebar">
    <p class="panel-heading">Create a component</p>
    <br />
    <form v-on:submit.prevent="handleClick">
      <input v-model="componentNameInputValue" placeholder="Component name" />
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
import Icons from './Icons.vue';
import ChildrenMultiselect from '@/components/ChildrenMultiselect.vue';
import { mapState, mapActions } from 'vuex';
import { toRaw } from 'vue';
import * as types from '../store/types.js';

export default {
  name: 'HomeSidebar',
  components: {
    ChildrenMultiselect,
    Icons,
  },
  computed: {
    ...mapState([
      'componentMap',
      'selectedElementList',
      'routes',
      'activeRoute',
    ]),
    componentNameInputValue: {
      get() {
        // console.log(
        //   'componentInput',
        //   this.$store.state.componentNameInputValue
        // );
        return this.$store.state.componentNameInputValue;
      },
      set(value) {
        // console.log('value', value);
        this.updateComponentNameInputValue(value);
      },
    },
  },
  methods: {
    ...mapActions([
      'registerComponent',
      'addToSelectedElementList',
      'updateComponentNameInputValue',
    ]),
    // invoked when click "add component" button
    handleClick() {
      console.log('active routes', this.routes[this.activeRoute]); // toRaw?
      const component = {
        componentName: this.componentNameInputValue,
        x: 0,
        y: 0,
        w: 200,
        h: 200,
        htmlList: this.selectedElementList,
        children: [],
        isActive: false,
      };

      // console.log('component', component);
      console.log('component (HomeSidebar handleClick)', component);
      this.registerComponent(component);
    },
  },
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
