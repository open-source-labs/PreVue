<template>
  <div class="componentDisplay">
    <LoadingBar :duration="2000" />
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
      @clicked="handleClick"
    >
      <h3>{{ componentName }}</h3>
      <p>{{ left }} х {{ top }}</p>

      <p>{{ width }} х {{ height }}</p>
    </VueDragResize>
    <modals-container></modals-container>
    <ComponentModal :modalWidth="800" :modalHeight="900" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import VueDragResize from 'vue-drag-resize';
import LoadingBar from './LoadingBar.vue';
import ComponentModal from './ComponentModal.vue';
// import SideBar from './SideBar.vue';

export default {
  name: 'ComponentDisplay',
  components: {
    VueDragResize,
    LoadingBar,
    ComponentModal
  },
  data() {
    return {
      //might make this an array of objects to correspond to each individual component
      width: 0,
      height: 0,
      top: 0,
      left: 0,
      lastTimeClicked: Date.now(),
      dialog: false,
      showModal: false
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
    },
    handleClick() {
      if (Date.now() - this.lastTimeClicked < 200) this.doubleClick();
      else {
        this.lastTimeClicked = Date.now();
      }
    },
    doubleClick() {
      // console.log('I AM DOUBLE CLICKED');
      // this.showModal = true;
      this.$modal.show('demo-login');
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
