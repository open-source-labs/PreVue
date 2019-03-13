<template>
  <div class="component-display">
    <!-- <LoadingBar :duration="2000"/> -->
    <div class="tabs is-small is-boxed">
      <ul>
        <li class="is-active">
          <a>Pictures</a>
        </li>
        <li>
          <a>Music</a>
        </li>
        <li>
          <a>Videos</a>
        </li>
        <li>
          <a>Documents</a>
        </li>
      </ul>
    </div>
    <div style="height: 500px; width: 500px; border: 1px solid red; position: relative;">
      <button @click="showMap">SEE COMPONENT MAP</button>

      <VueDraggableResizable
        class-name="component-box"
        v-for="[componentName, componentData] in Object.entries(
          computedComponentMap
        )"
        :key="componentName"
        :x="componentData.x"
        :y="componentData.y"
        :w="componentData.w"
        :h="componentData.h"
        @activated="handleClick(componentName)"
        @dragging="onDrag"
        @resizing="onResize"
        :parent="true"
      >
        <h3>{{ componentName }}</h3>
        <br>
        X: {{ componentData.x }} / Y: {{ componentData.y }} - Width:
        {{ componentData.w }} / Height: {{ componentData.h }}
      </VueDraggableResizable>
      <modals-container></modals-container>
      <ComponentModal :modalWidth="800" :modalHeight="900"/>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import LoadingBar from './LoadingBar.vue';
import ComponentModal from './ComponentModal.vue';
import { setComponentMap, getPrevState } from '../store/types';
import localforage from 'localforage';
import VueDraggableResizable from 'vue-draggable-resizable';

export default {
  name: 'ComponentDisplay',
  components: {
    VueDraggableResizable,
    // LoadingBar,
    ComponentModal
  },
  data() {
    return {
      lastTimeClicked: Date.now(),
      dialog: false,
      showModal: false
    };
  },

  created() {
    // localforage
    //   .getItem('state')
    //   .then(data => {
    //     this.$store.dispatch(getPrevState, data);
    //   })
    //   .then(data => console.log('retrieved previous data'));
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
      this.componentMap[this.clickedComponent].w = width;
      this.componentMap[this.clickedComponent].h = height;
    },
    onDrag: function(x, y) {
      this.componentMap[this.clickedComponent].x = x;
      this.componentMap[this.clickedComponent].y = y;
    },

    onDragStop: function(x, y) {
      // console.log('called');
      // console.log(x, y);
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
    showMap() {
      console.log(this.componentMap);
    },
    handleClick(componentName) {
      console.log('CLICKED');
      this.$store.dispatch('setClickedComponent', componentName);
      if (Date.now() - this.lastTimeClicked < 200)
        this.doubleClick(componentName);
      else {
        this.lastTimeClicked = Date.now();
      }
    },
    doubleClick() {
      console.log('DOUBLE CLICKED');
      this.$modal.show('demo-login');
    }
  }
};
</script>

<style scoped>
/* .component-display {
  grid-area: component-display;
} */

.component-box {
  border: 1px solid white;
}
.component-display {
  border: 1px solid palegreen;
}
.vdr.active:before {
  outline-style: solid !important;
}
</style>
