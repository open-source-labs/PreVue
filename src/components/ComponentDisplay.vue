<template>
  <div class="component-display">
    <Vue3DraggableResizable
      class="component-box"
      v-for="componentData in activeRouteArray"
      :draggable="true"
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
      @deactivated="onDeactivated()"
      @drag-start="activeComponentData, onDrag"
      @drag-end="onDrag"
      @resize-start="onResize"
      @resize-end="onResize"
      



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
    Vue3DraggableResizable
  },
  data() {
    return {
      abilityToDelete: false
    };
  },
  mounted() {
    console.log('success');
    window.addEventListener('keyup', (event) => {
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
      console.log(
        'activeRouteArray: this.routes[this.activeRoute]',
        this.routes[this.activeRoute]
      );
      return this.routes[this.activeRoute];
    },
    activeComponentData() {
      console.log(
        'this.activeRouteArray (within activeComponentData)',
        this.activeRouteArray
      );
      return this.activeRouteArray.filter(componentData => {
        return componentData.componentName === this.activeComponent;
      })[0];
    }
  },
  methods: {
    ...mapActions(['setActiveComponent', 'updateOpenModal']),
    onResize: function(x, y) {
      console.log('on resiZe x', x);
      console.log('on resiZe y', y);
      // const { x, y, w, h} = payload;
      this.activeComponentData.x = x.x;
      this.activeComponentData.y = x.y;
      this.activeComponentData.w = x.w;
      this.activeComponentData.h = x.h;
    },
    onDrag: function (x) {
      console.log(
        
        'this.activeComponentData (componentDisplay.vue)',
        this.activeComponentData
      );
  
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
    onClick(compData) {
      console.log('onClick compdata', compData.componentName);
      // uses Buefy
      this.setActiveComponent(compData.componentName);
      this.activeComponentData.isActive = true;
      // ModalProgrammatic.open({
      //   parent: this,
      //   component: ModalView,
      //   onCancel: () => {
      //     this.updateOpenModal(false);
      //     this.setActiveComponent('');
      //   }
      // });
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
  border: 1px solid salmon;
  position: relative;
}

.component-box {
  color: #3ab982;
  border: 1px solid salmon;
}
</style>
