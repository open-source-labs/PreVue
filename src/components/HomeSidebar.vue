<template>
  <!--the section in the left side that houses the HTML element icons-->
  <v-card
    id="sidebar"
    class="rounded-0"
    :style="{
      'background-color': '#3b444b',
      
      padding: '10px 0px 100px 0px',
    }"
  >
    <v-card-title
      :style="{
        'font-size': '19px',
        color: '#f5f4f3',
        'font-weight': '550',
        padding: '0 24px 0 24px'
      }"
    >
      <strong>Component Creator</strong>
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
          required
          v-model="componentNameInputValue"
          variant="underlined"
          label="Enter A Component Name"
          placeholder="myCustomComponent"
          :style="{ color: '#f5f4f3' }"
        >
        </v-text-field>
      </v-form>
      <Icons @getClickedIcon="addToSelectedElementList" />
      <ChildrenMultiselect />

      <div
        :style="{
          display: 'flex',
          'padding-top': '10px',
          'justify-content': 'center'
        }"
      >
        <v-btn
          v-ripple.center
          variant="outlined"
          rounded="pill"
          @click="handleClick"
          :disabled="validateInput"
          :style="{
            'align-self': 'center',
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
import * as types from '../store/storeTypes';

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
        // reactively returns user input each time text field is updated
        return this.$store.state.componentNameInputValue;
      },
      set(value) {
        // updates state to reflect current user input in text field
        this.updateComponentNameInputValue(value);
      }
    },
    validateInput() {
      // ensures component can only be created when user has provided a component name, disables add component button
      return this.componentNameInputValue.length < 1;
    }
  },
  methods: {
    ...mapActions([
      'registerComponent',
      'addToSelectedElementList',
      'updateComponentNameInputValue'
    ]),
    // invoked when clicking "add component" button
    handleClick() {
      // creates component object to be stored in state when new component is created
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
    },
    addToSelectedElementList(htmlElement) {
      // allows html elements to be associated with user created component when icons are clicked
      // invoked when event is registered from child icons component
      this.$store.dispatch(types.addToSelectedElementList, htmlElement);
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
