<template>
  <section class="icon-grid">
    <button
      @click.prevent="addToList(idx)"
      type="submit"
      v-for="(icon, idx) in Object.entries(icons)"
      :key="icon[1].icon + Date.now()"
    >
      <v-icon>{{ icon[1].icon }}</v-icon>
      <br />
      <span class="white--text">{{ icon[0] }}</span>
    </button>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import * as types from '../store/types.js';
export default {
  name: 'Icons',
  computed: {
    ...mapState(['icons'])
  },
  methods: {
    addToList(idx) {
      const payload = {
        icon: Object.entries(this.icons)[idx][0]
      };
      this.$store.commit(types.ADD_TO_LIST, payload);
    }
  }
};
</script>

<style scoped>
.icon-grid {
  display: grid;
  grid-template-columns: auto auto auto auto;
}

button:hover {
  cursor: pointer;
}
</style>
