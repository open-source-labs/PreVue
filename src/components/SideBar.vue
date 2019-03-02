<template>
  <div class="sidebar">
    <h1 class="white--text">Add component</h1>

    <v-form class="px-3">
      <BaseTextfield
        v-model="componentName"
        label="Component Name"
        :value="componentName"
      />

      <section>
        <BaseSelect
          :options="options"
          label="Select an element"
          color="green accent-2"
        ></BaseSelect>
        <BaseSelect
          :options="components"
          label="Select a child component"
          color="green accent-2"
        ></BaseSelect>
      </section>
    </v-form>
    <BaseButton
      :componentName="componentName"
      name="add component"
      icon="add_circle"
      @click="addShape"
    ></BaseButton>
  </div>
</template>

<script>
import BaseSelect from './BaseSelect';
import BaseTextfield from './BaseTextfield';
import BaseButton from './BaseButton';
export default {
  name: 'SideBar',
  data: function() {
    return {
      componentName: '',
      options: ['div', 'span', 'button', 'input'],
      components: ['Milk']
    };
  },
  components: {
    BaseSelect,
    BaseTextfield,
    BaseButton
  },
  methods: {
    addShape() {
      this.$store.dispatch('addShape', this.componentName);
    }
  }
};
</script>

<style>
input {
  border: 1px solid grey;
}
</style>
