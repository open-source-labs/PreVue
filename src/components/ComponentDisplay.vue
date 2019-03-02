<template>
  <div class="componentDisplay">
    <VueDragResize
      class="component"
      :isActive="true"
      :w="200"
      :h="200"
      v-on:resizing="resize"
      v-on:dragging="resize"
      v-for="(componentName, index) in componentNames"
      :key="index"
      :style="{ backgroundColor: theBackgroundColor }"
    >
      <h3>{{ componentName }}</h3>
      <p>{{ top }} х {{ left }}</p>
      <p>{{ width }} х {{ height }}</p>
    </VueDragResize>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import VueDragResize from 'vue-drag-resize';

export default {
  name: 'ComponentDisplay',
  components: {
    VueDragResize
  },
  data() {
    return {
      width: 0,
      height: 0,
      top: 0,
      left: 0
    };
  },
  computed: {
    ...mapState(['componentNames']),
    theBackgroundColor: function() {
      return this.getRandomColor();
    }
  },
  methods: {
    resize(newRect) {
      this.width = newRect.width;
      this.height = newRect.height;
      this.top = newRect.top;
      this.left = newRect.left;
    },
    getRandomColor() {
      var letters = '0123456789ABCDEF';
      var color = '#';
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }
  }
};
</script>

<style>
/* .component {
  background-color: green;
} */
.componentDisplay {
  grid-area: componentDisplay;
}

h3,
p {
  color: white;
}
</style>
