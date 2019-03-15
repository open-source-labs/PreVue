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
@import '~bulma/sass/utilities/_all';
$tabs-link-color: #d4d4dc;

@import '~bulma';
@import '~buefy/src/scss/buefy';

html,
body,
p,
ol,
ul,
li,
dl,
dt,
dd,
blockquote,
figure,
fieldset,
legend,
textarea,
pre,
iframe,
hr,
h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
  padding: 0;
}

// Headings
h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: 100%;
  font-weight: normal;
}

// List
ul {
  list-style: none;
}

// Form
button,
input,
select,
textarea {
  margin: 0;
}

// Box sizing
html {
  box-sizing: border-box;
}

*,
::before,
::after {
  box-sizing: inherit;
}

i:hover {
  cursor: pointer;
}

#app {
  height: 100%;
  box-sizing: border-box;
  .container {
    height: 100%;
  }
  /* background-color: papayawhip; */
}

.section {
  /* background: aquamarine; */
  height: 100%;
}
</style>
