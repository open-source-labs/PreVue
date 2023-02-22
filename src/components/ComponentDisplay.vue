<template>
  <div class="component-display">
    <Vue3DraggableResizable
      classNameDraggable="draggable"
      class="component-box"
      v-for="componentData in activeRouteArray"
      :draggable="true"
      :resizable="true"
      :disabledX="false"
      :disabledY="false"
      :key="componentData.componentName"
      :x="componentData.x"
      :y="componentData.y"
      :w="componentData.w"
      :h="componentData.h"
      @activated="onActivated(componentData)"
      @deactivated="onDeactivated(componentData)"
      @dragging="onDrag"
      @drag-start="print('drag-start')"
      @resize-start="onResize"
      @resizing="print('resizing')"
      @drag-end="print('drag-end')"
      @resize-end="print('resize-end')"
    >
      <h3>{{ componentData.componentName }}</h3>
    </Vue3DraggableResizable>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import Vue3DraggableResizable from 'vue3-draggable-resizable';
// import { toRaw } from 'vue';
// import ModalView from '@/views/ModalView';
// import { ModalProgrammatic } from 'buefy/dist/components/modal';
export default {
  name: 'ComponentDisplay',
  components: {
    Vue3DraggableResizable,
  },
  data() {
    return {
      abilityToDelete: false,
    };
  },
  mounted() {
    console.log('success');
    // window.addEventListener('keyup', (event) => {
    //   if (event.key === 'Backspace') {
    //     if (this.activeComponent && this.activeComponentData.isActive) {
    //       this.$store.dispatch('deleteActiveComponent');
    //     }
    //   }
    // });
  },
  computed: {
    ...mapState(['routes', 'activeRoute', 'activeComponent', 'componentMap']),
    activeRouteArray() {
      console.log(
        'array – this.routes[this.activeRoute], within activeRouteArray',
        this.routes[this.activeRoute]
      );
      return this.routes[this.activeRoute];
    },
    activeComponentData() {
      console.log(
        'this.activeRouteArray (within activeComponentData)',
        this.activeRouteArray
      );
      return this.activeRouteArray.filter((componentData) => {
        return componentData.componentName === this.activeComponent;
      })[0];
    },
  },
  methods: {
    ...mapActions(['setActiveComponent', 'updateOpenModal']),
    onResize: function (x, y, width, height) {
      console.log('on resiZe x', x);
      console.log('on resiZe y', y);
      this.activeComponentData.x = x.x;
      this.activeComponentData.y = x.y;
      this.activeComponentData.w = x.w;
      this.activeComponentData.h = x.h;
    },
    onDrag: function (x, y) {
      console.log(
        'this.activeComponentData (componentDisplay.vue)',
        this.activeComponentData
      );
      // console.log(
      //   'this.activeComponentData.x (componentDisplay.vue)',
      //   this.activeComponentData.x
      // );
      this.activeComponentData.x = x.x;
      this.activeComponentData.y = x.y;
      console.log('--------------------');
    },
    onActivated(componentData) {
      this.setActiveComponent(componentData.componentName);
      console.log('active', componentData.componentName);
      this.activeComponentData.isActive = true;
    },
    onDeactivated() {
      this.activeComponentData.isActive = false;
    },
    // onDoubleClick(compData) { // uses Buefy
    //   this.setActiveComponent(compData.componentName);
    //   this.activeComponentData.isActive = true;
    //   ModalProgrammatic.open({
    //     parent: this,
    //     component: ModalView,
    //     onCancel: () => {
    //       this.updateOpenModal(false);
    //       this.setActiveComponent('');
    //     }
    //   });
    // }
  },
};
</script>

<style scoped>
.component-display {
  border: 1px solid plum;
  height: 400px;
}

.component-box {
  color: white;
  border: 1px solid salmon;
}
</style>
