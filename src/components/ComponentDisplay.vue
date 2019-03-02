<template>
  <div class="componentDisplay">
    <v-stage
      ref="stage"
      :config="stageSize"
      @mousedown="handleStageMouseDown"
      id="thestage"
    >
      <v-layer ref="layer">
        <v-rect
          v-for="(rect, index) in rectangles"
          :key="index"
          :config="rect.shape"
          @dragstart="handleDragStart(rect.shape.name, index)"
          @dragend="handleDragEnd(rect.shape.name, index)"
        />
        <v-text
          v-for="rect in rectangles"
          :key="rect.name"
          :config="rect.text"
        />
        <v-transformer ref="transformer" />
      </v-layer>
    </v-stage>
  </div>
</template>

<script>
import { mapState } from 'vuex';
const width = window.innerWidth;
const height = window.innerHeight;

export default {
  name: 'ComponentDisplay',
  data() {
    return {
      stageSize: {
        width: width,
        height: height
      },
      selectedShapeName: '',
      startX: 0,
      startY: 0
    };
  },
  computed: mapState(['rectNumber', 'rectangles']),
  methods: {
    // renderNewComponent() {
    //   this.rectangles.push({
    //     x: 150,
    //     y: 150,
    //     width: 100,
    //     height: 100,
    //     fill: 'red',
    //     name: 'rect' + this.rectNumber++,
    //     draggable: true
    //   });
    // },
    handleDragStart(name, index) {
      const { x, y } = this.$refs.stage.getStage().getPointerPosition();
      this.startX = x;
      this.startY = y;
      // this.rectangles[index].text.x = this.rectangles[index].shape.x;
      // this.rectangles[index].text.y = this.rectangles[index].shape.y;
    },
    handleDragEnd(name, index) {
      console.log(this.rectangles[index].shape.x);
      console.log(this.rectangles[index].shape.y);
      const { x, y } = this.$refs.stage.getStage().getPointerPosition();
      let xDifference = x - this.startX;
      let yDifference = y - this.startY;

      console.log('MOVED BY X DIFFERENCE: ', xDifference);
      console.log('MOVED BY Y DIFFERENCE: ', yDifference);
      this.rectangles[index].text.x += xDifference;
      this.rectangles[index].text.y += yDifference;
      this.rectangles[index].shape.x += xDifference;
      this.rectangles[index].shape.y += yDifference;

      // console.log(name);
    },
    handleStageMouseDown(e) {
      // clicked on stage - cler selection
      if (e.target === e.target.getStage()) {
        this.selectedShapeName = '';
        this.updateTransformer();
        return;
      }

      // clicked on transformer - do nothing
      const clickedOnTransformer =
        e.target.getParent().className === 'Transformer';
      if (clickedOnTransformer) {
        return;
      }

      // find clicked rect by its name
      // console.log(this);
      const name = e.target.name();
      const rect = this.rectangles.find(r => r.shape.name === name);
      if (rect) {
        this.selectedShapeName = name;
      } else {
        this.selectedShapeName = '';
      }
      this.updateTransformer();
    },
    updateTransformer() {
      // here we need to manually attach or detach Transformer node
      const transformerNode = this.$refs.transformer.getStage();
      const stage = transformerNode.getStage();
      const { selectedShapeName } = this;

      const selectedNode = stage.findOne('.' + selectedShapeName);
      // do nothing if selected node is already attached
      if (selectedNode === transformerNode.node()) {
        return;
      }

      if (selectedNode) {
        // attach to another node
        transformerNode.attachTo(selectedNode);
      } else {
        // remove transformer
        transformerNode.detach();
      }
      transformerNode.getLayer().batchDraw();
    }
  }
};
</script>

<style>
.componentDisplay {
  grid-area: componentDisplay;
}

#thestage {
  background-color: white;
}
</style>
