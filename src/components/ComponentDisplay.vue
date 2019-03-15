<template>
  <div class="component-display">
    <ProjectTabs id="project-tabs"></ProjectTabs>
    <div
      style="height: 800px; width: 800px; border: 1px solid red; position: relative;"
    >
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
        id="componentName"
        @activated="handleClick(componentName)"
        @dblclick.native="doubleClick"
        @dragging="onDrag"
        @resizing="onResize"
        :parent="true"
      >
        <h3>{{ componentName }}</h3>
        <br />
        X: {{ componentData.x }} / Y: {{ componentData.y }} - Width:
        {{ componentData.w }} / Height: {{ componentData.h }}
      </VueDraggableResizable>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
// import LoadingBar from './LoadingBar.vue';
import ProjectTabs from '@/components/ProjectTabs';
import { setComponentMap, getPrevState } from '../store/types';
import localforage from 'localforage';
import VueDraggableResizable from 'vue-draggable-resizable';
import ModalView from '@/views/ModalView';
import { ModalProgrammatic } from 'buefy/dist/components/modal';

export default {
  name: 'ComponentDisplay',
  components: {
    VueDraggableResizable,
    ProjectTabs
  },
  data() {
    return {
      lastTimeClicked: Date.now(),
      dialog: false,
      showModal: false
    };
  },

  created() {
    localforage
      .getItem('state')
      .then(data => {
        this.$store.dispatch(getPrevState, data);
      })
      .then(data => console.log('retrieved previous data', data));
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

    getRandomColor() {
      var letters = '0123456789ABCDEF';
      var color = '#';
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
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
      ModalProgrammatic.open({
        parent: this,
        component: ModalView
      });
    }
  }
};
</script>

<style scoped>
.component-display {
  border: 1px solid palegreen;
}
.vdr.active:before {
  outline-style: solid !important;
}

#componentName {
  color: #d4d4dc;
  border: 1px solid #d4d4dc;
}
</style>
