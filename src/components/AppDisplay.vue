<template>
  <div id="displayBox">
    <ComponentDisplay />
    <SideBar />
    <button @click="renderNewComponent">Hello</button>
  </div>
</template>

<script>
import ComponentDisplay from './ComponentDisplay.vue';
import SideBar from './SideBar.vue';

export default {
  name: 'AppDisplay',
  components: {
    SideBar,
    ComponentDisplay
  }
};
</script>

<style scoped>
#displayBox {
  /* height: 100%; */
  /* margin: 0 auto; */
  border: 1px solid black;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
}
</style>
