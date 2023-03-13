<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer
        id="side-nav"
        :style="{
          'background-color': 'rgb(30, 31, 33)'
        }"
        width="250"
        permanent
      >
        <RouteDisplay /><HomeSidebar />
      </v-navigation-drawer>

      <v-app-bar color="grey" height="48" flat><ProjectTabs /></v-app-bar>

      <v-navigation-drawer
        :style="{ 'background-color': 'rgb(30, 31, 33)' }"
        location="right"
        width="180"
        permanent
        ><HomeQueue
      /></v-navigation-drawer>

      <v-main>
        <v-container style="min-height: 300px"
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
    ProjectTabs,
  },
  beforeMount(){
    this.isLoggedIn();
    console.log(this.$store.state.loggedIn)
  },
  data() {},
  methods: {
    ...mapActions(['setLogin']),
    async isLoggedIn(){
      const res = await fetch('http://localhost:8080/users/validateSession', {method: 'GET', credentials: 'include', headers: {
        'Access-Control-Allow-Origin': ['localhost:5173']
      }})
      console.log(res)
      if (res.status === 200) {
        console.log('validating', res.status)
        this.setLogin(true);
        console.log(this.$store.state.loggedIn)
      } else {
        this.setLogin(false);
      }
    }
  }
};
</script>

<style>
#side-nav > * {
  font-size: 14px;
}
</style>
