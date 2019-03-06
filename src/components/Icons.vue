<template>
  <section class="icon-grid">
    <button
      @click="changeState(elementName)"
      v-for="([elementName, iconData], idx) in Object.entries(icons)"
      :key="idx + Date.now()"
    >
      <v-icon>{{ iconData.icon }}</v-icon>
      <br>
      <span class="white--text">{{ elementName }}</span>
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
    changeState(elementName) {
      // console.log(icon[0]);
      this.$emit('getClickedIcon', elementName);
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
