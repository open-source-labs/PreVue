<template>
  <!--the 'select child components' dropdown in the left sidebar-->
  <div id="child-select">
    <VueMultiselect
      :style="{
        width: 'auto',
        'font-size': '14px',
        color: '#3ab982',
        'font-weight': '550',
        margin: '10px 10px 10px 10px'
      }"
      v-model="selectedChildren"
      placeholder="Select child components"
      :multiple="true"
      :close-on-select="false"
      :options="options"
      :max-height="150"
      :option-height="20"
      :searchable="false"
    ></VueMultiselect>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import VueMultiselect from 'vue-multiselect';

export default {
  name: 'ChildrenMultiselect',
  components: {
    VueMultiselect
  },
  computed: {
    ...mapState([
      'componentMap',
      'routes',
      'activeComponent',
      'componentChildrenMultiselectValue',
      'modalOpen'
    ]),
    selectedChildren: {
      get() {
        return this.componentChildrenMultiselectValue;
      },
      set(value) {
        if (this.modalOpen) {
          this.updateActiveComponentChildrenValue(value);
        }
        this.updateComponentChildrenMultiselectValue(value);
      }
    },
    options() {
      // retrieve array of possible options to set as children of component
      const routes = Object.keys(this.routes);
      const exceptions = new Set(['App', this.activeComponent, ...routes]);
      return Object.keys(this.componentMap).filter(component => {
        if (!exceptions.has(component)) return component;
      });
    }
  },
  methods: {
    ...mapActions([
      'updateComponentChildrenMultiselectValue',
      'updateActiveComponentChildrenValue'
    ])
  }
};
</script>
<!-- use default styles included with multiselect library -->
<style src="vue-multiselect/dist/vue-multiselect.css"></style>
