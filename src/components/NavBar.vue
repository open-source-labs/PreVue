<template>
  <!--the navbar on the main and tree views-->
  <v-app-bar
    class="border-bottom"
    id="navbar"
    color="black"
    role="navigation"
    aria-label="main navigation"
  >
    <img src="../assets/logo.png" id="prevue-logo" @click="routeHome" />
    <h1 id="prevue">PreVue</h1>
    <div class="buttons">
      <v-btn id="tree-btn" @click="routeTree">
        <br />
        <span class="white--text">Tree</span>
      </v-btn>

      <SaveProjectComponent v-if="validUser"></SaveProjectComponent>
      <ExportProjectComponent></ExportProjectComponent>
      <OpenProjectComponent
        :key="rerenderKey"
        v-if="validUser"
      ></OpenProjectComponent>
      <LogOutComponent v-if="validUser"></LogOutComponent>
    </div>
  </v-app-bar>
</template>

<script>
import SaveProjectComponent from '@/components/SaveProjectComponent.vue';
import OpenProjectComponent from '@/components/OpenProjectComponent.vue';
import ExportProjectComponent from '@/components/ExportProjectComponent.vue';
import LogOutComponent from './LogOutComponent.vue';

export default {
  name: 'NavBar',
  props: ['route', 'imageURL'],

  components: {
    SaveProjectComponent,
    OpenProjectComponent,
    LogOutComponent,
    ExportProjectComponent
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
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300&display=swap');
.border-bottom {
  border-bottom: 1px solid #ccc;
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
  font-family: 'Nunito', sans-serif;
  font-weight: 700;
  font-size: 2.5em;
  color: #39b982;
  text-decoration: none;
  margin-right: 10px;
}
#prevue-logo {
  height: 80px;
  width: 70px;
  transform: scale(0.7);
}

#prevue-logo:hover {
  cursor: pointer;
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
