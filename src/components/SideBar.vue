<template>
  <div class="sidebar">
    <h1 class="headline green--text text--accent-2 pa-2">
      Create a new component
    </h1>

    <v-form class="px-3">
      <BaseTextfield
        label="Component Name"
        v-model="componentName"
        :value="componentName"
      />
      <section>
        <Icons />
      </section>
    </v-form>

    <section>
      <h1 class="headline green--text text--accent-2">Selected Elements</h1>
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
      this.$store.commit(types.ADD_TO_COMPONENT_MAP, payload);
      this.$store.commit(types.CLEAR_LIST);
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
</style>
