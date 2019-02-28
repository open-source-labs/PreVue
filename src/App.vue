<template>
  <div id="app">
    <nav id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/tree">Tree</router-link>
    </nav>
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: grid;
  grid-template-columns: 8fr 2fr;
  grid-template-areas: 'componentDisplay sidebar';
}
#nav {
  margin-left: 0;
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
