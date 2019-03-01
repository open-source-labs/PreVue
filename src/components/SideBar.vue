<template>
  <div class="sidebar">
    <h1 class="white--text">Add component</h1>

    <v-input
      :messages="hi"
      append-icon="close"
      prepend-icon="phone"
      class="white--text"
      >Default Slot</v-input
    >

    <section>
      <!-- <v-label class="white--text">Select HTML</v-label> -->
      <BaseSelect :options="options" label="Select an element"></BaseSelect>
      <BaseSelect
        :options="components"
        label="Select a child component"
      ></BaseSelect>
    </section>

    <section>
      <select v-model="selectedChild">
        <option disabled value>Add Child Component</option>
      </select>
    </section>
    <v-btn small depressed class="pink white--text">
      <span>add element</span>
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
