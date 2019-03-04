<template>
  <div class="container">
    <tree
      :data="tree"
      node-text="name"
      layoutType="euclidean"
      type="tree"
      :duration="0"
      :zoomable="true"
      radius="4"
    ></tree>

    <button @click="viewComponentMap">VIEW MAP</button>
  </div>
</template>

<script>
import { tree } from 'vued3tree';
import { mapState } from 'vuex';
export default {
  components: {
    tree
  },
  created() {
    this.buildTree();
  },
  computed: {
    ...mapState(['componentMap']),
    componentMap: {
      get() {
        return this.$store.state.componentMap;
      }
    }
  },
  data() {
    return {
      tree: {}
    };
  },
  methods: {
    viewComponentMap() {
      console.log(this.componentMap);
    },
    buildTree() {
      let currentNode = this.componentMap['App'];
      this.tree.name = currentNode.componentName;
      // while()
    }
  }
};
</script>
<style scoped>
.container {
  height: 600px;
  width: 90%;
}
</style>
