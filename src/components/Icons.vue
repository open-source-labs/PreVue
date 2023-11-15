<template>
  <!--the collection of HTML element icons in the left sidebar-->
  <section
    class="icon-grid"
    :style="{
      padding: '0 24px 0 24px'
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
import { mapState } from 'vuex';

export default {
  name: 'Icons',
  computed: {
    ...mapState(['icons', 'modalOpen'])
  },
  methods: {
    changeState(elementName) {
      // emits event to be registered by HomeSidebar parent component, 
      //allows html element selections to be updated in state
      this.$emit('getClickedIcon', elementName);
    }
  }
};
</script>

<style scoped>
.icon-grid {
  display: grid;
  grid-template-columns: 33% 33% 33%;
  grid-row-gap: 1.5em;
}

button {
  color: #f5f4f3;
  mix-blend-mode: difference;
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
