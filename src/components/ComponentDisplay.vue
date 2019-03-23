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
      @activated="onActivated(componentData)"
      @deactivated="onDeactivated(componentData)"
      @dragging="onDrag"
      @resizing="onResize"
      @dblclick.native="onDoubleClick(componentData)"
    >
      <h3>{{ componentData.componentName }}</h3>
    </VueDraggableResizable>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
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
  mounted() {
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
      return this.routes[this.activeRoute];
    },
    activeComponentData() {
      return this.activeRouteArray.filter(componentData => {
        return componentData.componentName === this.activeComponent;
      })[0];
    }
  },
  methods: {
    ...mapActions(['setActiveComponent', 'updateOpenModal']),
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
    onActivated(componentData) {
      this.setActiveComponent(componentData.componentName);
      this.activeComponentData.isActive = true;
    },
    onDeactivated() {
      this.activeComponentData.isActive = false;
    },
    onDoubleClick(compData) {
      this.setActiveComponent(compData.componentName);
      this.activeComponentData.isActive = true;
      ModalProgrammatic.open({
        parent: this,
        component: ModalView,
        onCancel: () => {
          this.updateOpenModal(false);
          this.setActiveComponent('');
        }
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
