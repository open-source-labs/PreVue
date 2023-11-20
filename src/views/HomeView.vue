<template>
  <v-card>
    <v-layout :style="{'margin-bottom': '30px'}"  class="full-height">
      <v-navigation-drawer
        id="side-nav"
        :style="{
          'background-color': '#3b444b',
         
          'height': '100%',
          
        }"
        permanent
      >
        <RouteDisplay /><HomeSidebar />
      </v-navigation-drawer>

      <v-app-bar color='#8d949e' height="80" style="width: 1490px; z-index: 1;" flat><ProjectTabs /></v-app-bar>

 
      <v-navigation-drawer
        :style="{ 'background-color': '#6c757d' ,'position': 'absolute', 'top': '0', 'height': '100%'}"
        location="right"
        width="250"
        permanent
        >
        <HomeQueue/>
      </v-navigation-drawer>
      <v-main style="padding-bottom: 60px;">
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
import { mapActions } from 'vuex';

export default {
  name: 'Home',
  components: {
    ComponentDisplay,
    HomeSidebar,
    HomeQueue,
    RouteDisplay,
    ProjectTabs
  },
  beforeMount() {
    this.isLoggedIn();
  },
  data() {},
  methods: {
    ...mapActions(['setLogin']),
    async isLoggedIn() {
      const res = await fetch('/users/validateSession', {
        method: 'GET',
        credentials: 'include'
        // headers: {
        //   'Access-Control-Allow-Origin': ['localhost:8080']
        // }
      });

      if (res.status === 200) {
        this.setLogin(true);
      } else {
        this.setLogin(false);
      }
    }
  }
};
</script>

<style>
.full-height {
  height: 100%;
}

#side-nav > * {
  font-size: 14px;
}

#bottom-bar {
  position: absolute; /* or position: absolute; */
  bottom: 0;
  width: 100%; /* Make the bar span the entire width of the viewport */
  height: 15px
}
</style>
