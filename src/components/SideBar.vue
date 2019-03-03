<template>
  <div class="sidebar">
    <header class="headline green--text text--accent-2 pa-2">
      {{ header }}
    </header>

    <v-form class="px-3">
      <BaseTextfield
        v-model="componentName"
        label="Component Name"
        :value="componentName"
      />
      <section>
        <Icons />
      </section>
    </v-form>

    <section>
      <h1 class="headline purple--text text--accent-2">Selected Elements</h1>
      <hr />
      <Queue />
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
  props: ['header'],
  components: {
    BaseTextfield,
    BaseButton,
    Icons,
    Queue
  },
  computed: { ...mapState(['elementsList']) },
  methods: {
    addComponent() {
      const payload = { name: this.componentName, htmlList: this.elementsList };
      this.$store.dispatch(types.ADD_TO_COMPONENT_MAP_ACTION, payload);
      this.componentName = '';
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
