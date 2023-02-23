<template>
  <v-container class="bg-surface-variant" fluid="true">
    <v-row>
      <v-col>
        <v-sheet><ProjectTabs /></v-sheet>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="2">
        <v-row>
          <v-col>
            <v-sheet>
              <p>Routes</p>
              <RouteDisplay />
            </v-sheet>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-sheet class="rounded-xl"><HomeSidebar /></v-sheet>
          </v-col>
        </v-row>
      </v-col>
      <v-col>
        <v-sheet><ComponentDisplay /></v-sheet>
      </v-col>
      <v-col cols="2">
        <v-sheet><HomeQueue /></v-sheet>
      </v-col>
    </v-row>
  </v-container>

  <!-- <div>
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
  </div> -->
</template>

<script>
import ComponentDisplay from '@/components/ComponentDisplay.vue';
import HomeSidebar from '@/components/HomeSidebar.vue';
import HomeQueue from '@/components/HomeQueue.vue';
import RouteDisplay from '@/components/RouteDisplay.vue';
import ProjectTabs from '@/components/ProjectTabs.vue';

export default {
  name: 'Home',
  components: {
    ComponentDisplay,
    HomeSidebar,
    HomeQueue,
    RouteDisplay,
    ProjectTabs,
  },
};
</script>

<style scoped>
/* #route-display-container {
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
} */
</style>
