<template>
  <div>
    <label class="typo__label">Vuex example.</label>
    <multiselect
      placeholder="Select child components"
      :multiple="true"
      :close-on-select="false"
      :options="options"
      :value="componentChildrenMultiselectValue"
      @input="updateComponentChildrenMultiselectValue"
    ></multiselect>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Multiselect from 'vue-multiselect';

export default {
  components: {
    Multiselect
  },
  computed: {
    ...mapState([
      'componentMap',
      'routes',
      'activeComponent',
      'componentChildrenMultiselectValue'
    ]),
    options() {
      const routes = Object.keys(this.routes);
      const exceptions = new Set(['App', this.activeComponent, ...routes]);
      return Object.keys(this.componentMap).filter(component => {
        if (!exceptions.has(component)) return component;
      });
    }
  },
  methods: {
    ...mapActions(['updateComponentChildrenMultiselectValue'])
  }
};
</script>

<!-- New step!
     Add Multiselect CSS. Can be added as a static asset or inside a component. -->
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style>
/* your styles */
</style>