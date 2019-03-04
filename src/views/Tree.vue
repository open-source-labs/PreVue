<template>
  <div class="container">
    <Tree></Tree>
  </div>
</template>

<script>
import Tree from '../components/Tree';
export default {
  name: 'TreeView',
  components: {
    Tree
  }
};
</script>
<style scoped>
.container {
  height: 600px;
  width: 90%;
}
</style>
