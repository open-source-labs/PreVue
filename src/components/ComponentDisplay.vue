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
      v-for="(element, i) in elementsAndChildren(index)"
      :draggable="true"
      :resizable="true"
      :disabledX="false"
      :disabledY="false"
      :key="i + element"
      :x="elementPosition(i, index).x"
      :y="elementPosition(i, index).y"
      :w="elementPosition(i, index).w"
      :h="elementPosition(i, index).h"
      @activated="activateElement(i, index); activateElementOn(i, index)"
      @deactivated="deactivateElement(i, index)"
      @resize-end="resizeElement($event, i, index)"
      @drag-start="notDraggable()"
      @drag-end="$event => {
      draggableAgain();
      updatePosition($event, i, index);
    }"
  >
      <div 
        v-if="element.text === 'div'"
        class="div"
        :alt="div-component" >
        div
      </div>


      <img v-else 
      :src="`./src/assets/${element.text}.svg`" 
      class="graphic" 
      :alt="`${element.text} SVG Image`"
      />
 
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
        if (this.activeElement && this.activeElement.isActive === true){ 
          console.log("ACTIVE", this.activeElement)
          console.log("component index", this.componentIndex)
          console.log("element index", this.elementIndex)
          this.$store.dispatch('deleteActiveElement') 
          console.log("DELETED AND NOW", this.routes[this.activeRoute][this.componentIndex].htmlList)

        }
        else if (this.activeComponent && this.activeComponentData.isActive) {
          this.$store.dispatch('deleteActiveComponent');
        }
      }
    });
  },

  computed: {
    ...mapState(['routes', 'activeRoute', 'activeComponent', 'componentMap', 'activeElement']),
    activeRouteArray() {
      console.log("routes:", this.routes[this.activeRoute])
      console.log("active routes:", this.activeRoute)
      // returns components associated with current active route
      return this.routes[this.activeRoute];
    },

    activeComponentData() {
      console.log("comp map:", this.componentMap)
      console.log("routes:", this.routes)
      // returns object containing data associated with current active component
      return this.activeRouteArray.filter(componentData => {
        return componentData.componentName === this.activeComponent;
      })[0];
    },
    theHtmlList(){
    return (index) => {
      return this.routes[this.activeRoute][index].htmlList;
      }
    },
    elementsAndChildren(){
    return (index) => {
      const newArr = [];
      const list = this.theHtmlList(index);
      if(!Array.isArray(list)) { 
        console.log ("ERROR")
        return newArr
    }
      const mapAll = function(arr){
        arr.forEach(el => {
           if (Array.isArray(el.children) && el.children.length > 0){
            mapAll(el.children)
          }
          newArr.push(el)
          })
        }
      mapAll(list)
      console.log("SUCCESS", newArr)
      return newArr
      }
    },
    elementPosition() {
      return (i, index) => { 
        console.log("Sdf", this.elementsAndChildren(index)[i])
         return this.elementsAndChildren(index)[i]
      }
    },
    activateElementOn(){
      return(i, index) => {
        console.log("deactivated", this.elementPosition(i, index).isActive)
        this.elementPosition(i, index).isActive = true;
      }
    },
    deactivateElement(){
      return(i, index) => {
        console.log("deactivated", this.elementPosition(i, index).isActive)
        this.elementPosition(i, index).isActive = false;
      }
    },
  },

  methods: {
    ...mapActions(['setActiveComponent', 'updateOpenModal', 'setActiveElement', 'setComponentIndex', 'setElementIndex']),
    activateElement(i, index){
        console.log("ELLEMENT ACTIVATED")
        console.log("componentIndexFFF1", index)
        this.$store.dispatch('setComponentIndex', index)
        .then(() => {
          console.log("componentIndexFFF2", this.$store.state.componentIndex)
          
          return this.$store.dispatch('setElementIndex', i)
        })
        .then(() => {
          console.log("elementIndexFFF",this.$store.state.elementIndex)
          return this.$store.dispatch('setActiveElement', this.elementPosition(i ,index))
        })
        .then(() => {
          console.log("activeElement1111",this.$store.state.activeElement)
        })
    },
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
      console.log("activated")
      this.setActiveComponent(componentData.componentName);
      this.activeComponentData.isActive = true;
      this.activeElement.isActive = false
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
  color: #3ab982;
  border: 2px inset rgb(148, 142, 142);
  border-radius: 10px;
  position: relative;
  height: 84vh;
}

.component-box {
  box-sizing: border-box;
  color: #3ab982;
  border-radius: 25px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center; 
  box-shadow: 3px 3px 5px rgb(61, 59, 59);
}

.image {
  width: 100%;
  height: 100%;
}
.component-elements {

  box-sizing: content-box;
  border-radius: 7px;
  margin: 5px;
  color: #3AB982;
  /* border: 2px solid rgb(255, 0, 221); */
  object-fit: cover;
  display: flex;
  align-content: stretch;
  justify-content: stretch;
  /* position: sticky; */
}

/*CSS styles to dynamically adjust the specific component graphic, relative to its parent container*/
.graphic {
  height: calc(100%);
  width: calc(100%);
  min-width: 30px;
  min-height: 30px;
  box-shadow: 3px 3px 5px rgb(80, 95, 80);
  border-radius: 20px;
}

.div {
  border: 4px inset gray;
  height: calc(100%);
  width: calc(100%);
  border-radius: 5px;
  text-align: right;
  color: rgb(41, 41, 232);
  letter-spacing: 3px;
  font-weight: bold;
}
</style>
