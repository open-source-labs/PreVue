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
      @drag-end="onDragEnd"
      @resize-end="onResizeEnd"
      @dblclick.native="onDoubleClick(componentData)"
    >
    
    <h3>{{ componentData.componentName}}</h3>
      
    <Vue3DraggableResizable
      v-for="(element, i) in elementsAndChildren(index)"
      class="component-elements"
      :class="{
        'layer1': element.depth === 1,
        'layer2': element.depth === 2,
        'layer3': element.depth === 3,
        'layer4': element.depth === 4,
        'layer5': element.depth === 5,
        'layer6': element.depth === 6,
        'layer7': element.depth === 7
      }"
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
    window.addEventListener('keydown', event => {
      if (event.key === 'q') { 
        console.log("Q", this.$store.state.routes[this.activeRoute])
      }
    })
    window.addEventListener('keyup', event => {
      if (event.key === 'Backspace') {
        console.log('backspace',this.activeElement && this.activeElement.isActive === true)
        if (this.activeElement && this.activeElement.isActive === true){ 
          this.$store.dispatch('saveState')
          this.$store.dispatch('deleteActiveElement')
          // setTimeout(() => this.$store.dispatch('deleteActiveElement'), 7000)
        }
        else if (this.activeComponent && this.activeComponentData.isActive) {
          this.$store.dispatch('saveState')
          this.$store.dispatch('deleteActiveComponent');
           }
          }
        });

    window.addEventListener('keydown', event => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'z') {
        if(this.$store.state.arrayOfStates.length > 0){
          console.log("UNDO invoked");
          this.$store.dispatch('restoreState')
        }
      }
    });
  },

  computed: {
    ...mapState(['routes', 'activeRoute', 'activeComponent', 'componentMap', 'activeElement', 'elementIndex', 'componentIndex']),
    activeRouteArray() {
      //console.log("routes:", this.routes[this.activeRoute])
      //console.log("active routes:", this.activeRoute)
      // returns components associated with current active route
      return this.routes[this.activeRoute];
    },

    activeComponentData() {
      //console.log("comp map:", this.componentMap)
      //console.log("routes:", this.routes)
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
      const mapAll = function(arr, currentDepth = 0){
        arr.forEach(el => {
          const newDepth = currentDepth + 1
           if (Array.isArray(el.children) && el.children.length > 0){
            mapAll(el.children, newDepth)
          }
          el.depth = newDepth
          newArr.push(el)
          })
        }
      mapAll(list)
      return newArr
      }
    },
    elementPosition() {
      return (i, index) => { 
         return this.elementsAndChildren(index)[i]
      }
    },
    activateElementOn(){
      return(i, index) => {
        //console.log("deactivated", this.elementPosition(i, index).isActive)
        console.log("ACTIVE ELEMENT", this.elementPosition(i, index))
        this.elementPosition(i, index).isActive = true;
      }
    },
    deactivateElement(){
      return(i, index) => {
       // console.log("deactivated", this.elementPosition(i, index).isActive)
        this.elementPosition(i, index).isActive = false;
      }
    },
  },

  methods: {
    ...mapActions(['setActiveComponent', 'updateOpenModal', 'setActiveElement', 'setComponentIndex', 'setElementIndex']),
    activateElement(i, index){
        //console.log("ELLEMENT ACTIVATED")
        //console.log("componentIndexFFF1", index)
        this.$store.dispatch('setComponentIndex', index)
        .then(() => {
          //console.log("componentIndexFFF2", this.$store.state.componentIndex)
          
          return this.$store.dispatch('setElementIndex', i)
        })
        .then(() => {
          //console.log("elementIndexFFF",this.$store.state.elementIndex)
          return this.$store.dispatch('setActiveElement', this.elementPosition(i ,index))
        })
        .then(() => {
         // console.log("activeElement1111",this.$store.state.activeElement)
        })
    },

    resizeElement: function(x, i, index){
      this.$store.dispatch('saveState')
      this.elementPosition(i, index).x = x.x
      this.elementPosition(i, index).y = x.y
      this.elementPosition(i, index).w = x.w
      this.elementPosition(i, index).h = x.h
    },

    updatePosition: function(x, i, index){//yeehaw
      this.$store.dispatch('saveState')
      this.elementPosition(i, index).x = x.x
      this.elementPosition(i, index).y = x.y
    },

    onResizeEnd: function(x) {
      this.$store.dispatch('saveState')

      // updates state associated with active component to reflect end of resize user has made to the component
      this.activeComponentData.isActive = true;
      this.activeComponentData.x = x.x;
      this.activeComponentData.y = x.y;
      this.activeComponentData.w = x.w;
      this.activeComponentData.h = x.h;
    },

    onDragEnd: function(x) {
      this.$store.dispatch('saveState')
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
  box-shadow: 0 0 10px rgb(94, 92, 92);
}

.component-box {
  box-sizing: border-box;
  color: #3ab982;
  background-color: #e3e3e3;
  border-radius: 25px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center; 
  box-shadow: 0 0 5px 2px rgba(189, 188, 188, 0.6);
}

.image {
  width: 100%;
  height: 100%;
}

.layer1 {
  z-index: 1;
}
.layer2 {
  z-index: 2;
}
.layer3 {
  z-index: 3;
}
.layer4 {
  z-index: 4;
}
.layer5 {
  z-index: 5;
}
.layer6 {
  z-index: 6;
}
.layer7 {
  z-index: 7;
}
.component-elements {
  box-sizing: content-box;
  border-radius: 7px;
  margin: 5px;
  color: #84a891;
  background-color: #ffffff;
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
  box-shadow: 0 0 5px 2px rgba(220, 220, 220, 0.5);
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
