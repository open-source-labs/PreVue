<template>
  <div class="component-display">
    <VueDraggableResizable
      class-name="component-box"
      v-for="componentData in activeRouteArray"
      :key="componentData.componentName"
      :x="componentData.x"
      :y="componentData.y"
      :w="componentData.w"
      :h="componentData.h"
      :parent="true"
      @activated="onActivated(componentData.componentName)"
      @deactivated="onDeactivated"
      @dragging="onDrag"
      @resizing="onResize"
      @dblclick.native="onDoubleClick"
    >
      <h3>{{ componentData.componentName }}</h3>
      <br>
      X: {{ componentData.x }} / Y: {{ componentData.y }} - Width:
      {{ componentData.w }} / Height: {{ componentData.h }}
    </VueDraggableResizable>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import localforage from 'localforage';
import VueDraggableResizable from 'vue-draggable-resizable';
import ModalView from '@/views/ModalView';
import { ModalProgrammatic } from 'buefy/dist/components/modal';
export default {
  name: 'ComponentDisplay',
  components: {
    VueDraggableResizable
  },
  data() {
    return {
      abilityToDelete: false
    };
  },
  created() {
    localforage
      .getItem('state')
      .then(data => {
        this.getPrevState(data);
      })
      .then(data => console.log('retrieved previous data', data));
  },
  mounted() {
    window.addEventListener('keyup', event => {
      if (event.key === 'Backspace') {
        console.log('clickedcomponent', this.$store.state.activeComponent);
        if (this.abilityToDelete && this.$store.state.activeComponent) {
          console.log(this.$store.state.activeComponent, ' WILL BE DELETED');
          this.$store.dispatch('deleteClickedComponent');
          this.abilityToDelete = false;
        }
      }
    });
  },
  computed: {
    ...mapState([
      'routes',
      'activeRoute',
      'activeComponent',
      'clickedComponent'
    ]),
    activeRouteArray() {
      return this.routes[this.activeRoute];
    },
    activeComponentData() {
      return this.activeRouteArray.filter(componentData => {
        return componentData.componentName === this.activeComponent;
      })[0];
    }
  },
  methods: {
    ...mapActions(['setActiveComponent', 'getPrevState']),
    onResize: function(x, y, width, height) {
      this.activeComponentData.x = x;
      this.activeComponentData.y = y;
      this.activeComponentData.w = width;
      this.activeComponentData.h = height;
    },
    onDrag: function(x, y) {
      this.activeComponentData.x = x;
      this.activeComponentData.y = y;
    },
    onActivated(componentName) {
      this.setActiveComponent(componentName);
      this.abilityToDelete = true;
    },
    onDeactivated() {
      this.abilityToDelete = false;
    },
    onDoubleClick() {
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
  border: 1px solid plum;
  height: 100%;
  position: relative;
}

.component-box {
  color: white;
  border: 1px solid salmon;
}
</style>
