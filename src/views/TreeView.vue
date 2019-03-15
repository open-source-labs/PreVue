<template>
  <div class="tree">
    <Tree></Tree>
  </div>
</template>

<script>
import Tree from '../components/Tree.vue';

export default {
  name: 'TreeView',
  components: {
    Tree
  }
};
</script>
<style scoped>
.tree {
  background-color: white;
  height: 600px;
}
</style>
