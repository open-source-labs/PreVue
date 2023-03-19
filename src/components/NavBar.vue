<template>
  <!--the navbar on the main and tree views-->
  <v-app-bar
    class="border-bottom"
    id="navbar"
    color="black"
    role="navigation"
    aria-label="main navigation"
  >
    <img src="../assets/logo.png" id="prevue-logo" @click="toHomeRoute" />
    <h1 id="prevue">PreVue</h1>
    <div class="buttons">
      <v-btn v-if="isRouteTree" id="tree-btn" @click="toHomeRoute">
        <br />
        <span class="white--text">WorkSpace</span>
      </v-btn>
      <v-btn v-else id="tree-btn" @click="toTreeRoute">
        <br />
        <span class="white--text">Tree</span>
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

<script setup>
import { defineProps, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

import SaveProjectComponent from '@/components/SaveProjectComponent.vue';
import OpenProjectComponent from '@/components/OpenProjectComponent.vue';
import ExportProjectComponent from '@/components/ExportProjectComponent.vue';
import NewProjectComponent from '@/components/NewProjectComponent.vue';
import LogOutComponent from './LogOutComponent.vue';

const TREE_ROUTE_NAME = 'tree';

defineProps(['imageURL']);

const router = useRouter();

const store = useStore();

const validUser = computed(() => store.state.loggedIn);

const rerenderKey = computed(() => store.state.rerenderKey);

const isRouteTree = computed(() => router.currentRoute.value.name === TREE_ROUTE_NAME);

function toHomeRoute() {
  router.push({ path: '/home' });
}

function toTreeRoute() {
  router.push({ path: '/tree' });
}

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

