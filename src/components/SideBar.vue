<template>
  <div class="sidebar">
    <h1 class="white--text">Add component</h1>

    <v-text-field append-icon="add" placeholder="Component Name" box></v-text-field>
    <section>
      <!-- <v-label class="white--text">Select HTML</v-label> -->
      <BaseSelect :options="options" label="Select an element"></BaseSelect>
      <BaseSelect :options="components" label="Select a child component"></BaseSelect>
    </section>

    <v-btn large depressed class="green darken-2 white--text">
      <span>add component</span>
      <v-icon small right>add_circle</v-icon>
    </v-btn>
  </div>
</template>

<script>
import BaseSelect from './BaseSelect';
export default {
  name: 'SideBar',
  data: function() {
    return {
      componentName: '',
      options: ['div', 'span', 'button'],
      components: ['Milk', 'Steam']
    };
  },
  components: {
    BaseSelect
  }
};
</script>

<style>
input {
  border: 1px solid grey;
}
</style>
