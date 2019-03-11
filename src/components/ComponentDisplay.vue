<template>
  <div class="component-display">
    <!-- <LoadingBar :duration="2000"/> -->
    <div style="height: 500px; width: 500px; border: 1px solid red; position: relative;">
      <VueDraggableResizable
        class-name="component-box"
        v-for="([componentName, componentData]) in Object.entries(computedComponentMap)"
        :key="componentName"
        :w="componentData.w"
        :h="componentData.h"
        @activated="handleClick(componentName)"
        @dragging="onDrag"
        @resizing="onResize"
        :parent="true"
      >
        <h3>{{ componentName }}</h3>

        <br>
        X: {{ componentData.x }} / Y: {{ componentData.y }} - Width: {{ componentData.width }} / Height: {{ componentData.height }}
      </VueDraggableResizable>
      <modals-container></modals-container>
      <ComponentModal :modalWidth="800" :modalHeight="900"/>
    </div>
  </div>
</template>
<script>
// v-for="(component, index) in Object.entries(computedComponentMap)"

import { mapState } from 'vuex';
import LoadingBar from './LoadingBar.vue';
import ComponentModal from './ComponentModal.vue';
import { setComponentMap } from '../store/types';
import VueDraggableResizable from 'vue-draggable-resizable';

export default {
  name: 'ComponentDisplay',
  components: {
    VueDraggableResizable,
    LoadingBar,
    ComponentModal
  },
  data() {
    return {
      //might make this an array of objects to correspond to each individual component
      width: 0,
      height: 0,
      x: 0,
      y: 0,
      lastTimeClicked: Date.now(),
      dialog: false,
      showModal: false
    };
  },

  computed: {
    ...mapState(['componentMap', 'clickedComponent']),
    computedComponentMap: {
      get() {
        return this.componentMap;
      },
      set(value) {
        this.$store.dispatch(setComponentMap, value);
      }
    }
  },
  methods: {
    onResize: function(x, y, width, height) {
      this.componentMap[this.clickedComponent].x = x;
      this.componentMap[this.clickedComponent].y = y;
      this.componentMap[this.clickedComponent].width = width;
      this.componentMap[this.clickedComponent].height = height;
    },
    onDrag: function(x, y) {
      this.componentMap[this.clickedComponent].x = x;
      this.componentMap[this.clickedComponent].y = y;
    },
    getRandomColor() {
      var letters = '0123456789ABCDEF';
      var color = '#';
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    },
    handleClick(componentName) {
      console.log(componentName);
      this.$store.dispatch('setClickedComponent', componentName);
      if (Date.now() - this.lastTimeClicked < 200)
        this.doubleClick(componentName);
      else {
        this.lastTimeClicked = Date.now();
      }
    },
    doubleClick() {
      this.$modal.show('demo-login');
    }
  }
};
</script>

<style scoped>
.component-display {
  grid-area: component-display;
}

.component-box {
  border: 1px solid white;
}
.vdr.active:before {
  outline-style: solid !important;
}
</style>
