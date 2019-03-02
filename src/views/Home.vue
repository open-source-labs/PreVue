<template>
  <div id="displayBox">
    <ComponentDisplay />

    <button>Hello</button>
  </div>
</template>

<script>
import ComponentDisplay from '../components/ComponentDisplay.vue';

export default {
  name: 'Home',
  components: {
    ComponentDisplay
  }
};
</script>

<style scoped>
#displayBox {
  display: grid;
  grid-template-columns: repeat(minmax(240px, 1fr));
  height: 100%;

  border: 1px solid black;
}
</style>
