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
      v-for="(component, index) in Object.entries(componentMap)"
      :key="index"
      :style="{ backgroundColor: theBackgroundColor }"
      @clicked="handleClick(component[0])"
    >
      <h3>{{ component[0] }}</h3>
      <p v-for="(element, index) in component[1].htmlElements" :key="index">
        {{ element.text }}
      </p>
      <p v-for="(element, index) in component[1].children" :key="index">
        {{ element }}
      </p>

      <!-- <p>{{ width }} х {{ height }}</p> -->
    </VueDragResize>
    <modals-container></modals-container>
    <button @click="consoleCM" class="white--text">click</button>
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
    ...mapState(['componentMap']),
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
    handleClick(componentName) {
      if (Date.now() - this.lastTimeClicked < 200)
        this.doubleClick(componentName);
      else {
        this.lastTimeClicked = Date.now();
      }
    },
    doubleClick(componentName) {
      console.log(componentName);
      // this.showModal = true;
      this.$modal.show('demo-login', { comp: componentName });
    },
    consoleCM() {
      console.log(Object.keys(this.componentMap));
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
