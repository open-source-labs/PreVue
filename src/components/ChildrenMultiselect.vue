<template>
  <div>
    <label class="typo__label">Vuex example.</label>
    <multiselect
      placeholder="Select Children"
      :multiple="true"
      :value="componentChildrenMultiselectValue"
      :close-on-select="false"
      :clear-on-select="true"
      :options="options"
      :searchable="false"
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
      'componentChildrenMultiselectValue',
      'componentMap',
      'routes',
      'activeComponent'
    ]),
    options() {
      const routes = Object.keys(this.routes);
      const exceptions = new Set(['App', this.activeComponent, ...routes]);
      console.log(exceptions);
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