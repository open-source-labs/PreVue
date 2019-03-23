<template>
  <div>
    <div class="columns is-mobile">
      <div id="empty-left" class="column"></div>
      <div id="project-tabs-container" class="column">
        <ProjectTabs />
      </div>
    </div>
    <div id="empty-right" class="column"></div>
    <div class="columns is-mobile" id="home-section">
      <aside id="left-side-container" class="column aside hero">
        <div id="route-display-container" class="column is-fullheight">
          <p class="panel-heading">Routes</p>
          <RouteDisplay />
        </div>

        <div id="create-component-container" class="column is-fullheight">
          <HomeSidebar />
        </div>
      </aside>

      <div id="center-container" class="column hero is-fullheight">
        <ComponentDisplay />
      </div>

      <div id="right-side-container" class="column aside hero is-fullheight">
        <HomeQueue />
      </div>
    </div>
  </div>
</template>

<script>
import ComponentDisplay from '@/components/ComponentDisplay.vue';
import HomeSidebar from '@/components/HomeSidebar';
import HomeQueue from '@/components/HomeQueue';
import RouteDisplay from '@/components/RouteDisplay';
import ProjectTabs from '@/components/ProjectTabs';

export default {
  name: 'Home',
  components: {
    ComponentDisplay,
    HomeSidebar,
    HomeQueue,
    RouteDisplay,
    ProjectTabs
  }
};
</script>

<style scoped>
#route-display-container {
  background-color: #393f4d;
  height: 100%;
  padding: 0;
}

#create-component-container {
  border: 1px solid #d1bfa7;
  height: 100%;
  background-color: #d4d4dc;
}

#left-side-container,
#empty-left {
  max-width: 250px;
}
#right-side-container,
#empty-right {
  max-width: 150px;
}
</style>
