<template>
  <table class="table is-fullwidth is-scrollable">
    <a
      :class="route === activeRoute ? 'panel-block is-active' : 'panel-block'"
      v-for="route in Object.keys(routes)"
      :key="route"
      @click="handleClick(route)"
    >
      <span class="panel-icon">
        <i class="fas fa-location-arrow" aria-hidden="true"></i>
      </span>
      {{ route }}
    </a>
  </table>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Routes',
  computed: {
    ...mapState(['routes', 'activeRoute'])
  },
  methods: {
    ...mapActions(['setActiveRoute']),
    handleClick(route) {
      this.setActiveRoute(route);
    }
  }
};
</script>
