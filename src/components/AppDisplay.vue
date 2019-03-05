<template>
  <div id="displayBox">
    <ComponentDisplay/>
    <HomeSidebar/>
  </div>
</template>

<script>
import ComponentDisplay from './ComponentDisplay.vue';
import HomeSidebar from './HomeSidebar.vue';

export default {
  name: 'AppDisplay',

  components: {
    HomeSidebar,
    ComponentDisplay
  }
};
</script>

<style scoped></style>
