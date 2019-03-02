<template>
  <section class="icon-grid">
    <button
      @click.prevent="addToList(idx)"
      type="submit"
      v-for="(icon, idx) in icons"
      :key="idx"
    >
      <v-icon>{{ icon.icon }}</v-icon>
      <br />
      <span class="white--text">{{ icon.caption }}</span>
    </button>
  </section>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'Icons',
  computed: mapState(['icons']),
  methods: {
    addToList(idx) {
      this.$store.commit('ADD_TO_LIST', this.icons[idx].caption);
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
