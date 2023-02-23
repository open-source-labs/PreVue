<template>
  <!-- <a
      :class="route === activeRoute ? 'panel-block is-active' : 'panel-block'"
      v-for="route in Object.keys(routes)"
      :key="route"
      @click="handleClick(route)"
    >
      <span class="panel-icon">
        <i class="fas fa-location-arrow" aria-hidden="true"></i>
      </span>
      {{ route }}
    </a> -->
  <v-select
    clearable
    placeholder="Choose Route"
    :items="Object.keys(routes)"
    variant="underlined"
    route-text="name"
    return-object
    v-model="selectedItem"
    @update:modelValue="handleClick(selectedItem)"
  >
  </v-select>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Routes',
  data() {
    return {
      selectedItem: null,
    };
  },
  computed: {
    ...mapState(['routes', 'activeRoute']),
  },
  methods: {
    ...mapActions(['setActiveRoute']),
    handleClick() {
      console.log('route', this.selectedItem);
      this.setActiveRoute(this.selectedItem);
    },
  },
};
</script>

<style scoped></style>
