<template>
  <div>
    <ComponentDisplay/>
    <v-navigation-drawer right :permanent="true" app>
      <HomeSidebar header="Create a Component"/>
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

<style scoped></style>
