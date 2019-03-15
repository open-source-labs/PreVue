<template>
  <div class="route-display">
    <Routes></Routes>
    <div class="panel-block">
      <button class="button is-link is-outlined is-fullwidth">
        delete all routes
      </button>
    </div>
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
  background-color: #d4d4dc;
}

i:hover {
  cursor: pointer;
}
</style>
