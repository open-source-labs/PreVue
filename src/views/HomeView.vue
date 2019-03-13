<template>
  <v-layout row class="home">
    <v-flex shrink pa-1>
      <v-layout column>
        <v-flex shrink pa-1>
          <HomeSidebar class="home-sidebar" />
        </v-flex>
        <v-flex grow pa-1>
          <HomeSidebar class="home-sidebar" />
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex grow pa-1 d-flex>
      <ComponentDisplay class="component-display" />
    </v-flex>
    <v-flex shrink pa-1 d-flex>
      <HomeQueue />
    </v-flex>
  </v-layout>
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
/* .grid-container {
  display: grid;
  grid-template-areas: 'home-sidebar component-display';
  grid-gap: 10px;
  grid-template-columns: 1fr 5fr;
  padding: 10px;
  height: 100%;
  background-color: #1d1e22;
  width: 100%;
}
*/
.home {
  height: 100%;
  /* background-color: papayawhip; */
}
.home-sidebar {
  /* background-color: palevioletred; */
  background-color: #393f4d;
  /* background-color: #393f4d; */
}

.component-display {
  background-color: #393f4d;
}
</style>
