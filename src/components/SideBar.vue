<template>
  <div class="sidebar">
    <h1>Add component</h1>
    <v-icon class="white--text">dashboard</v-icon>
    <input type="text" placeholder="Component Name" v-model="componentName" />
    <section>
      <v-select v-model="selectedHTML">
        <option disabled value>Add HTML Element</option>
        <option>Div</option>
        <option>Span</option>
        <option>Button</option>
        <option>Input</option>
        <option>Link</option>
        <option>Image</option>
        <option>Unordered List</option>
        <option>Ordered List</option>
      </v-select>
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
//
<script>
export default {
  name: 'SideBar',
  data: function() {
    return {
      componentName: '',
      selectedHTML: '',
      selectedChild: ''
    };
  }
};
</script>

<style>
input {
  border: 1px solid grey;
}
</style>
