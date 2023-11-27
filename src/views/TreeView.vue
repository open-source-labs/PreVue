<template>
  <div class="tree">
    <TreeGraph></TreeGraph>
  </div>
</template>

<script>
import TreeGraph from '../components/TreeGraph.vue';

export default {
  name: 'TreeView',
  components: {
    TreeGraph
  }
};
</script>
<style scoped>
.tree {
  background-color: white;
  height: 600px;
}
</style>
