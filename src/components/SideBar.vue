<template>
  <div class="sidebar">
    <h1 class="white--text">Add component</h1>

    <v-form class="px-3">
      <BaseTextfield label="Component Name" v-model="componentName" :value="componentName"/>

      <section>
        <BaseSelect :options="options" label="Select an element" color="green accent-2"></BaseSelect>
        <BaseSelect :options="components" label="Select a child component" color="green accent-2"></BaseSelect>
      </section>
    </v-form>
    <v-btn large depressed class="green accent-2" :disabled="componentName ? false : true">
      <span>add component</span>
      <v-icon small right>add_circle</v-icon>
    </v-btn>
    <!-- <BaseButton disabled="componentName">
      <span>add component</span>
      <v-icon small right>add_circle</v-icon>
    </BaseButton>-->
  </div>
</template>

<script>
import BaseSelect from './BaseSelect';
import BaseTextfield from './BaseTextfield';
// import BaseButton from './BaseButton';
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
    BaseTextfield
  }
};
</script>

<style>
input {
  border: 1px solid grey;
}
</style>
