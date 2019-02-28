<template>
  <div class="sidebar">
    <h1>ADD COMPONENT</h1>
    <input type="text" placeholder="Component Name" v-model="componentName" />
    <section>
      <select v-model="selectedHTML">
        <option disabled value>Add HTML Element</option>
        <option>Div</option>
        <option>Span</option>
        <option>Button</option>
        <option>Input</option>
        <option>Link</option>
        <option>Image</option>
        <option>Unordered List</option>
        <option>Ordered List</option>
      </select>
    </section>
    <section>
      <select v-model="selectedChild">
        <option disabled value>Add Child Component</option>
      </select>
    </section>
    <button>Submit</button>
  </div>
</template>

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

<style></style>
