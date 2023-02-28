<template>
  <div>
    <Vue3DraggableResizable
      classNameDraggable="draggable"
      class="component-box"
      :draggable="true"
      :resizable="true"
      :disabledX="false"
      :disabledY="false"
      :x="x"
      :y="y"
      :w="w"
      :h="h"
      @click="onClick(componentData)"
      @activated="activeComponentData()"
      @deactivated="onDeactivated(componentData)"
      @dragging="onDrag"
      @drag-start="print('drag-end')"
      @drag-end="print('drag-end')"
      @resize-start="onResize"
      @resizing="print('resizing')"
      @resize-end="print('resize-end')"
    >
      <h3>{{ compName }}</h3>
    </Vue3DraggableResizable>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import Vue3DraggableResizable from 'vue3-draggable-resizable';
export default {
  name: 'Component',
  components: {
    Vue3DraggableResizable,
  },
  props: {
    compName: String,
    children: Array,
    htmlList: Array,
    isActive: Boolean,
  },
  data() {
    return {
      x: 0,
      y: 0,
      w: 200,
      h: 200,
    };
  },
};
</script>
<style></style>
