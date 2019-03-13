<template>
  <div class="columns">
    <div class="column">
      <div class="column">Routes</div>

      <div class="column">
        <HomeSidebar class="home-sidebar"/>
      </div>
    </div>

    <div class="column">
      <ComponentDisplay class="component-display"/>
    </div>
    <div class="column">
      <HomeQueue/>
    </div>
  </div>
</template>

<script>
import ComponentDisplay from '@/components/ComponentDisplay.vue';
import HomeSidebar from '@/components/HomeSidebar';
import HomeQueue from '@/components/HomeQueue';
export default {
  name: 'Home',
  components: {
    ComponentDisplay,
    HomeSidebar,
    HomeQueue
  }
};
</script>

<style scoped>
.home-sidebar {
  /* background-color: palevioletred; */
  background-color: #393f4d;
  /* background-color: #393f4d; */
}

.component-display {
  background-color: white;
}
</style>
