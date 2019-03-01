<template>
  <div class="sidebar">
    <h1 class="white--text">Add component</h1>

    <v-form class="px-3">
      <BaseTextfield
        label="Component Name"
        v-model="componentName"
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
      options: ['div', 'span', 'button'],
      components: ['Milk']
    };
  },
  components: {
    BaseSelect,
    BaseTextfield,
    BaseButton
  }
};
</script>

<style>
input {
  border: 1px solid grey;
}
</style>
