<template>
  <div class="grid-container">
    <ComponentDisplay/>
    <HomeSidebar/>
  </div>
</template>

<script>
import ComponentDisplay from '@/components/ComponentDisplay.vue';
import HomeSidebar from '@/components/HomeSidebar';
export default {
  name: 'Home',
  components: {
    ComponentDisplay,
    HomeSidebar
  }
};
</script>

<style scoped>
.grid-container {
  display: grid;
  grid-template-areas: 'component-display home-sidebar ';
  grid-gap: 10px;
  grid-template-columns: 8fr 2fr;
  padding: 10px;
  height: 100%;
}
</style>
