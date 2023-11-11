<template>
  <!--the sandbox area where the component boxes are rendered-->
  <div class="component-display">
    <Vue3DraggableResizable
      class="component-box"
      v-for="(componentData, index) in activeRouteArray"
      :draggable="isDraggable"
      :resizable="true"
      :disabledX="false"
      :disabledY="false"
      :parent="true"
      :key="componentData.componentName"
      :x="componentData.x"
      :y="componentData.y"
      :w="componentData.w"
      :h="componentData.h"
      :handles="['tl', 'tm', 'tr', 'ml', 'mr', 'bl', 'bm', 'br']"
      @click="onClick(componentData)"
      @activated="onActivated(componentData)"
      @deactivated="onDeactivated"
      @drag-start="activeComponentData, onDrag"
      @drag-end="onDragEnd"
      @resize-start="activeComponentData, onResize"
      @resize-end="onResizeEnd"
      @dblclick.native="onDoubleClick(componentData)"
    >
    
    <h3>{{ componentData.componentName}}</h3>
      
    <Vue3DraggableResizable
      class="component-elements"
      v-for="(element, i) in theHtmlList(index)"
      :draggable="true"
      :resizable="true"
      :disabledX="false"
      :disabledY="false"
      :key="i + element"
      :x="elementPosition(i, index).x"
      :y="elementPosition(i, index).y"
      :w="elementPosition(i, index).w"
      :h="elementPosition(i, index).h"
      @resize-end="resizeElement($event, i, index)"
      @drag-start="notDraggable()"
      @drag-end="$event => {
      draggableAgain();
      updatePosition($event, i, index);
    }"
      >
      <!-- <div v-if="isSvg(element.text)" v-html="generateSvgPath(element.text)" ></div> -->
      <!-- <div v-html="generateSvgPath(element.text)"></div> -->
      <!-- <img :src="`../assets/${element.text}.svg`" alt="SVG Image" />   -->
      <!-- <img :src="'../assets/' + element.text + '.svg'" alt="SVG Image" /> -->

      <!-- const basePath = "../assets/";
       return `${basePath}${text}.svg`; -->
    
      <!-- {{ element.text }} -->
      <!-- {{ console.log(`../assets/${element.text}.svg` )}} -->

      <img :src="`./src/assets/${element.text}.svg`" alt="SVG Image" />

 
      </Vue3DraggableResizable>
    </Vue3DraggableResizable>

    <v-overlay v-model="modalOpen" class="overlay">
      <v-dialog v-model="modalOpen" class="modal" width="auto">
        <v-card>
          <Modal />
        </v-card>
      </v-dialog>
    </v-overlay>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import Vue3DraggableResizable from 'vue3-draggable-resizable';
import Modal from './Modal/Modal.vue';

export default {
  name: 'ComponentDisplay',
  components: {
    Vue3DraggableResizable,
    Modal
  },
  data() {
    return {
      // by default modal associated with active component for further user custimaztion should be hidden
      modalOpen: false,
      isDraggable: true
    };
  },
  mounted() {
    // allows active user created component to be deleted when backspace is pressed
    window.addEventListener('keyup', event => {
      if (event.key === 'Backspace') {
        if (this.activeComponent && this.activeComponentData.isActive) {
          this.$store.dispatch('deleteActiveComponent');
        }
      }
    });
  },
  computed: {
    ...mapState(['routes', 'activeRoute', 'activeComponent', 'componentMap']),
    activeRouteArray() {
      console.log("routes:", this.routes[this.activeRoute])
      console.log("active routes:", this.activeRoute)
      // returns components associated with current active route
      return this.routes[this.activeRoute];
    },
    activeComponentData() {
      // console.log("active comp:", this.activeComponent)
      // console.log("active route array:", this.activeRouteArray)
      console.log("comp map:", this.componentMap)
      console.log("routes:", this.routes)
      // returns object containing data associated with current active component
      return this.activeRouteArray.filter(componentData => {
        return componentData.componentName === this.activeComponent;
      })[0];
    },
    theHtmlList(){
    return (i) => {
      return this.routes[this.activeRoute][i].htmlList;
      }
    },
    elementPosition(){
      return (i, index) => { 
        // console.log("Sdf", this.routes[this.activeRoute][index].htmlList[i])
        // console.log("X", x)
         return this.routes[this.activeRoute][index].htmlList[i]
      }
    }
  },
  methods: {
    ...mapActions(['setActiveComponent', 'updateOpenModal']),
    // isSvg(text) {
    //   return text.endsWith('.svg')
    // },
    // generateSvgPath(text) {
    //   const basePath = "../assets/";
    //   return `${basePath}${text}.svg`;
  //     const basePath = "../assets/";
  //     const imagePath = `"${basePath}${text}.svg"`;
  //     console.log(imagePath)
  //     // return `<img src="${imagePath}" alt="SVG Image" style='background-image: url("${imagePath}")' />`;
  //     return `
  //   <div class="svg-wrapper" style="background-image: url('${imagePath}')">
  //     <img src="${imagePath}" alt="SVG Image" />
  //   </div>
  // `;
        /* background-image: url("../assets/button.svg"); */

    // },
    onResize: function(x) {
      // updates state associated with active component to reflect start of resize user has made to the component
      this.activeComponentData.x = x.x;
      this.activeComponentData.y = x.y;
      this.activeComponentData.w = x.w;
      this.activeComponentData.h = x.h;
    },
    resizeElement: function(x, i, index){
      this.elementPosition(i, index).x = x.x
      this.elementPosition(i, index).y = x.y
      this.elementPosition(i, index).w = x.w
      this.elementPosition(i, index).h = x.h
    },
    updatePosition: function(x, i, index){//yeehaw
      this.elementPosition(i, index).x = x.x
      this.elementPosition(i, index).y = x.y
    },
    onResizeEnd: function(x) {
      // updates state associated with active component to reflect end of resize user has made to the component
      this.activeComponentData.isActive = true;
      this.activeComponentData.x = x.x;
      this.activeComponentData.y = x.y;
      this.activeComponentData.w = x.w;
      this.activeComponentData.h = x.h;
    },
    onDrag: function(x) {
      // updates state associated with active component to reflect start of drag user has made to the component
      this.activeComponentData.x = x.x;
      this.activeComponentData.y = x.y;
    },
    onDragEnd: function(x) {
      // updates state associated with active component to reflect end of drag user has made to the component
      this.activeComponentData.x = x.x;
      this.activeComponentData.y = x.y;
    },
    onActivated(componentData) {
      // updates state to reflect current selected componenet (i.e. active component)
      this.setActiveComponent(componentData.componentName);
      this.activeComponentData.isActive = true;
    },
    onDeactivated() {
      // updates state when current selected component is unselected
      this.activeComponentData.isActive = false;
    },
    onClick(compData) {
      // sets clicked component as active in state
      this.setActiveComponent(compData.componentName);
      this.activeComponentData.isActive = true;
    },
    onDoubleClick(compData) {
      // sets double clicked component as active and opens modal providing options to further manipulate the component
      this.setActiveComponent(compData.componentName);
      this.activeComponentData.isActive = true;
      this.modalOpen = true;
    },
    notDraggable() {
      this.isDraggable = false
    },
    draggableAgain() {
      this.isDraggable = true
    }
  }
};
</script>
<style scoped>
.component-display {
  border: 1px solid plum;
  height: 84vh;
}
.component-display {
  color: #3ab982;
  border: 1px solid rgb(0, 205, 68);
  position: relative;
}
.component-box {
  color: #3ab982;
  border: 1px solid rgb(38, 0, 255);
}
.component-elements {
  display: grid;
  grid-template-columns: repeat(100, 1fr);
  color: #3ab982;
  border: 1px solid rgb(255, 0, 187);
}
</style>
