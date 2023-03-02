<template>
  <section
    class="icon-grid"
    :style="{
      padding: '0 24px 0 24px',
    }"
  >
    <button
      @click="changeState(elementName)"
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
import * as types from '../store/types.js';

export default {
  name: 'Icons',
  computed: {
    ...mapState(['icons', 'modalOpen']),
  },
  methods: {
    // handleClick(htmlElement) {
    //   console.log(htmlElement);
    //   this.$store.dispatch(types.addToSelectedElementList, htmlElement);
    //   console.log(this.$store.state.selectedElementList);
    // },
    changeState(elementName) {
      this.$emit('getClickedIcon', elementName); // emit prop necessary?
    }
  }
};
</script>

<style scoped>
.icon-grid {
  display: grid;
  grid-template-columns: 33% 33% 33%;
  grid-row-gap: 0.5em;
}

button {
  color: #f5f4f3;
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
