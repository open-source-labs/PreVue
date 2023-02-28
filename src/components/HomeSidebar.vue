<template>
  <v-card
    id="sidebar"
    class="rounded-0"
    :style="{
      'background-color': 'inherit',
      'border-bottom': '0.5px solid #6a696a',
      padding: '16px 0px 24px 0px'
    }"
  >
    <v-card-title
      :style="{
        'font-size': '14px',
        color: '#f5f4f3',
        'font-weight': '550',
        padding: '0 24px 0 24px'
      }"
    >
      Component Creator
    </v-card-title>
    <v-card-actions class="d-block">
      <v-form
        id="form1"
        v-on:submit.prevent="handleClick"
        :style="{
          padding: '0 24px 0 24px'
        }"
      >
        <v-text-field
          v-model="componentNameInputValue"
          variant="underlined"
          label="Component name"
          placeholder="myCustomComponent"
          required
          :style="{ color: '#f5f4f3' }"
        >
        </v-text-field>
      </v-form>
      <Icons />
      <ChildrenMultiselect />
      <div
        :style="{
          'margin-left': '24px'
        }"
      >
        <v-btn
          v-ripple.center
          variant="outlined"
          rounded="pill"
          @click="handleClick"
          :disabled="validateInput"
          :style="{
            border: '.5px solid #f5f4f3',
            color: '#f5f4f3',
            'text-transform': 'unset !important'
          }"
        >
          Add Component
        </v-btn>
      </div>
    </v-card-actions>
  </v-card>
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
    Icons
  },
  computed: {
    ...mapState([
      'componentMap',
      'selectedElementList',
      'routes',
      'activeRoute'
    ]),
    componentNameInputValue: {
      get() {
        return this.$store.state.componentNameInputValue;
      },
      set(value) {
        this.updateComponentNameInputValue(value);
      }
    },
    validateInput() {
      return this.componentNameInputValue.length < 1;
    }
  },
  methods: {
    ...mapActions([
      'registerComponent',
      'addToSelectedElementList',
      'updateComponentNameInputValue'
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
        isActive: false
      };

      // console.log('component', component);
      console.log('component (HomeSidebar handleClick)', component);
      this.registerComponent(component);
    }
  }
};
</script>
<style>
#sidebar > div {
  padding: 0;
}
.v-label.v-field-label,
.v-text-field input {
  font-size: 14px;
}
</style>
