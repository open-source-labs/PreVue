<template>
  <div>
    <div class="columns">
      <div id="project-tabs-container" class="column is-8 is-offset-2">
        <ProjectTabs/>
      </div>
    </div>
    <div class="columns">
      <aside id="left-side-container" class="column is-2 aside hero is-fullheight">
        <div id="route-display-container" class="column is-fullheight">
          <p class="panel-heading">Routes</p>
          <RouteDisplay/>
        </div>

        <div id="create-component-container" class="column is-fullheight">
          <HomeSidebar/>
        </div>
      </aside>

      <div id="center-container" class="column is-8 hero is-fullheight">
        <ComponentDisplay/>
      </div>

      <div id="right-side-container" class="column is-2 aside hero is-fullheight">
        <HomeQueue/>
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
</style>
