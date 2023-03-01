<template>
  <v-select
    clearable
    placeholder="Select a route"
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
