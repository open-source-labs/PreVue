<template>
  <div class="componentDisplay">
    <v-stage
      ref="stage"
      :config="stageSize"
      @mousedown="handleStageMouseDown"
      id="thestage"
    >
      <v-layer ref="layer">
        <v-rect v-for="item in rectangles" :key="item.id" :config="item" />
        <v-transformer ref="transformer" />
      </v-layer>
    </v-stage>
  </div>
</template>

<script>
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
      rectNumber: 0,
      rectangles: [
        {
          x: 150,
          y: 150,
          width: 100,
          height: 100,
          fill: 'green',
          name: 'rect' + this.rectNumber,
          draggable: true
        }
      ],
      selectedShapeName: ''
    };
  },
  methods: {
    renderNewComponent() {
      this.rectangles.push({
        x: 150,
        y: 150,
        width: 100,
        height: 100,
        fill: 'red',
        name: 'rect' + this.rectNumber++,
        draggable: true
      });
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
      const name = e.target.name();
      const rect = this.rectangles.find(r => r.name === name);
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
  background-color: yellow;
}
</style>
