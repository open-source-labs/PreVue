<template>
  <div id="child-select">
    <br />
    <VueMultiselect
      placeholder="Select child components"
      v-model="multiValue"
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
    VueMultiselect,
  },
  data() {
    return {
      multiValue: null,
    };
  },
  computed: {
    ...mapState([
      'componentMap',
      'routes',
      'activeComponent',
      'componentChildrenMultiselectValue',
      'modalOpen',
    ]),
    options() {
      const routes = Object.keys(this.routes);
      console.log('routes', routes);
      const exceptions = new Set(['App', this.activeComponent, ...routes]);
      console.log('exceptions', exceptions);
      return Object.keys(this.componentMap).filter((component) => {
        if (!exceptions.has(component)) return component;
      });
      // return ['test'];
    },
  },
  methods: {
    ...mapActions([
      'updateComponentChildrenMultiselectValue',
      'updateActiveComponentChildrenValue',
    ]),
    handleSelect(value) {
      console.log('VALUE', value);
      if (this.modalOpen) this.updateActiveComponentChildrenValue(value);
      this.updateComponentChildrenMultiselectValue(value);
    },
  },
};
</script>

<!-- New step!
     Add Multiselect CSS. Can be added as a static asset or inside a component. -->
<!-- <style src="vue-multiselect/dist/vue-multiselect.min.css"></style> -->
<style scoped>
/* your styles */
</style>

<!-- <style src="vue-multiselect/dist/vue-multiselect.css"></style> -->
