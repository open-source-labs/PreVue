<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer
        id="side-nav"
        :style="{ 'background-color': 'rgb(30, 31, 33)' }"
        width="240"
        permanent
      >
        <RouteDisplay /><HomeSidebar />
      </v-navigation-drawer>

      <v-app-bar color="grey" height="48" flat><ProjectTabs /></v-app-bar>

      <v-navigation-drawer
        color="grey-lighten-1"
        location="right"
        width="150"
        permanent
        ><HomeQueue
      /></v-navigation-drawer>

      <v-main>
        <v-container style="min-height: 300px;"
          ><ComponentDisplay />
        </v-container>
      </v-main>
    </v-layout>
  </v-card>
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
    ProjectTabs
  },
  data() {}
};
</script>

<style>
#side-nav > * {
  font-size: 14px;
}
</style>
