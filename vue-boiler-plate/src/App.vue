<template>
  <div>
		APP
    <Parent1></Parent1>
    <Parent2></Parent2>
  </div>
</template>

<script>
import Parent1 from '@/components/Parent1.vue';
import Parent2 from '@/components/Parent2.vue';

export default {
  name: 'App',
  components: {
    Parent1,
    Parent2
  }
}
</script>

<style scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
