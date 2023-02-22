<template>
  <div id="app" class="hero">
    <NavBar id="nav" imageUrl="../src/assets/logo.png"></NavBar>

    <section class="section">
      <router-view />
    </section>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';

export default {
  components: {
    NavBar,
  },
};
</script>

<style lang="scss">
$navbar-breakpoint: 414px;

@mixin my-touch {
  @media screen and (max-width: $navbar-breakpoint - 1px) {
    @content;
  }
}

@mixin my-desktop {
  @media screen and (min-width: $navbar-breakpoint) {
    @content;
  }
}

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
  font-size: 14px;
}

// Headings
h1,
h2,
h3,
h4,
h5,
h6 {
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

#nav {
  display: flex;
  justify-content: space-between;
}

#app {
  box-sizing: border-box;

  background-color: #393f4d;
}

.section {
  padding-top: 60px;
  height: 100%;
}
</style>
