<template>
  <!--the navbar on the main and tree views-->
  <v-app-bar
    class="border-bottom"
    style="height: 80px"
    color="black"
    role="navigation"
    aria-label="main navigation"
  >
  <!-- id="navbar" -->
    <img src="../assets/logo.png" id="prevue-logo" @click="routeHome" />
    <h1 id="prevue">PreVue</h1>
    <div class="buttons">
      <v-btn id="tree-btn" @click="routeTree">
        <br />
        <span class="white--text">Component Tree</span>
      </v-btn>

      <SaveProjectComponent v-if="validUser"></SaveProjectComponent>
      <ExportProjectComponent></ExportProjectComponent>
      <OpenProjectComponent
        :key="rerenderKey"
        v-if="validUser"
      ></OpenProjectComponent>
      <NewProjectComponent></NewProjectComponent>
      <LogOutComponent v-if="validUser"></LogOutComponent>
    </div>
  </v-app-bar>
</template>

<script>
import SaveProjectComponent from '@/components/SaveProjectComponent.vue';
import OpenProjectComponent from '@/components/OpenProjectComponent.vue';
import ExportProjectComponent from '@/components/ExportProjectComponent.vue';
import NewProjectComponent from '@/components/NewProjectComponent.vue';
import LogOutComponent from './LogOutComponent.vue';

export default {
  name: 'NavBar',
  props: ['route', 'imageURL'],

  components: {
    SaveProjectComponent,
    OpenProjectComponent,
    LogOutComponent,
    ExportProjectComponent,
    NewProjectComponent
  },
  methods: {
    // routing to homepage and tree view
    routeHome() {
      this.$router.push({ path: '/home' });
    },
    routeTree() {
      this.$router.push({ path: '/tree' });
    }
  },
  computed: {
    // checks if user is loggedin and conditonally renders save and open project buttons
    validUser() {
      return this.$store.state.loggedIn;
    },
    // uforces update of list of projects upon saving of new project
    rerenderKey: {
      get() {
        return this.$store.state.rerenderKey;
      }
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@450&display=swap');
.border-bottom {
  border-bottom: 5px solid #ccc;
  border-color: #39b982;
  align-items: right;
}
.buttons {
  width: 100vw;
  padding-right: 1em;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  vertical-align: middle;
}

#prevue {
  font-family: 'Montserrat', sans-serif;
  font-weight: 1000;
  font-size: 2.5em;
  color: #39b982;
  text-decoration: none;
  margin-right: 10px;
}
#prevue-logo {
  height: 90px;
  width: 70px;
  transform: scale(0.7);
  transition: transform 0.3s ease-in-out;
}

#prevue-logo:hover {
  cursor: pointer;
  transform: scale(0.7) translateY(-10px); 
}

#tree-btn {
  font-weight: 700;
  font-size: 14px;
}

button {
  margin: 5px;
  font-size: 14px;
  background: none;
  border: none;
}
button:hover {
  color: #00c4a7;
}
</style>

