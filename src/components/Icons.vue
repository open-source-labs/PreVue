<template>
  <section class="icon-grid">
    <button
      @click.prevent="changeState(elementName)"
      v-for="([elementName, iconString], idx) in Object.entries(icons)"
      :key="idx + Date.now()"
    >
      <i :class="iconString"></i>
      <br />
      <span class="white--text">{{ elementName }}</span>
    </button>
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Icons',
  computed: {
    ...mapState(['icons']),
  },
  methods: {
    changeState(elementName) {
      this.$emit('getClickedIcon', elementName); // emit prop necessary?
    },
  },
};
</script>

<style scoped>
.icon-grid {
  display: grid;
  grid-template-columns: 33% 33% 33%;
  grid-row-gap: 1em;
}

button {
  background: none;
  border: none;
}
button:hover {
  cursor: pointer;
  color: #00d1b2;
}
button:focus {
  outline: none;
}
</style>
