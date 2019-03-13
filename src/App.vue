<template>
  <div id="app" class="hero is-fullHeight">
    <NavBar></NavBar>
    <section class="section">
      <router-view />
    </section>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
export default {
  components: {
    NavBar
  }
};
</script>

<style lang="scss">
html {
  box-sizing: border-box;
  font-size: 10px;
  height: 100%;
}
*,
*:before,
*:after {
  box-sizing: inherit;
}
body {
  padding: 0;
  margin: 0;
  height: 100%;

  line-height: 2;
}
a {
  text-decoration: none;
  color: black;
}

#app {
  height: 100%;
  box-sizing: border-box;
  .container {
    height: 100%;
  }
  background-color: papayawhip;
}

.section {
  background: aquamarine;
  height: 100%;
}
</style>
