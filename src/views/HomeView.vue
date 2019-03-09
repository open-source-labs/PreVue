<template>
  <div class="gridDisplay">
    <ComponentDisplay />
    <v-navigation-drawer right :permanent="true" app>
      <HomeSidebar />
    </v-navigation-drawer>
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
.gridDisplay {
  display: grid;
  /* grid-template-columns: 8fr 2fr; */
}
</style>
