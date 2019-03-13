<template>
  <v-layout row class="home">
    <v-flex shrink pa-1>
      <v-layout column>
        <v-flex shrink pa-1
          >Test
          <!-- <HomeSidebar class="home-sidebar" /> -->
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

<span>
      <v-icon class="save-icon" @click="saveState">save_alt</v-icon>
    </span>
<button class="white--text" @click="exportProject">
      EXPORT YOUR PROJECT
    </button>
<v-spacer></v-spacer>
<router-link :to="{ name: 'tree' }">
      <span id="tree-link" class="purple--text text--accent-2"
        >View Component Tree</span
      >
    </router-link>
<router-link :to="{ name: 'home' }" class="prevue">
      <span class="white--text">Pre</span>
      <span class="green--text text--accent-2">Vue</span>
    </router-link>
