<template>
  <div id="displayBox">
    <ComponentDisplay />
  </div>
</template>

<script>
import ComponentDisplay from '../components/ComponentDisplay.vue';
import SideBar from '../components/SideBar.vue';

export default {
  name: 'Home',
  components: {
    SideBar,
    ComponentDisplay
  }
};
</script>

<style scoped>
#displayBox {
  display: grid;
  grid-template-columns: repeat(minmax(240px, 1fr));
  height: 100%;

  /* margin: 0 auto; */
  border: 1px solid black;
}
</style>
