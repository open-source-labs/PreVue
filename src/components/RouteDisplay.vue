<template>
  <div class="route-display">
    <Routes></Routes>
  </div>
</template>

<script>
import Routes from '@/components/Routes';

export default {
  name: 'RouteDisplay',
  components: {
    Routes
  }
};
</script>

<style scoped>
.route-display {
  border: 1px solid white;
  overflow: auto;
  height: 60%;
  padding: 0;
}

i:hover {
  cursor: pointer;
}
</style>
