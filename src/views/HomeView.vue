<template>
  <div class="columns">
    <aside class="column is-2 aside hero is-fullheight">
      <div class="column is-fullheight" id="route-display">
        <RouteDisplay></RouteDisplay>
      </div>

      <div class="column is-fullheight" id="add-component">
        <HomeSidebar class="home-sidebar" />
      </div>
    </aside>

    <div class="column is-8 hero is-fullheight">
      <ComponentDisplay class="component-display" />
    </div>
    <div class="column is-2 aside hero is-fullheight">
      <HomeQueue class="home-queue" />
    </div>
  </div>
</template>

<script>
import ComponentDisplay from '@/components/ComponentDisplay.vue';
import HomeSidebar from '@/components/HomeSidebar';
import HomeQueue from '@/components/HomeQueue';
import RouteDisplay from '@/components/RouteDisplay';
export default {
  name: 'Home',
  components: {
    ComponentDisplay,
    HomeSidebar,
    HomeQueue,
    RouteDisplay
  }
};
</script>

<style scoped>
.component-display,
.home-queue {
  background-color: #393f4d;
  height: 100%;
}

#route-display {
  background-color: #393f4d;
  height: 100%;
}

#add-component {
  border: 1px solid #d1bfa7;
  height: 100%;
  background-color: #d4d4dc;
}
</style>
