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

    <button @click="buildTree" class="white--text">BUILD TREE</button>
    <button @click="viewComponentMap" class="white--text">data</button>
  </div>
</template>

<script>
import { tree } from 'vued3tree';
import { mapState } from 'vuex';
export default {
  name: 'TreeView',
  components: {
    tree
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
      tree: null
    };
  },
  methods: {
    formatComponentMap(compMap) {
      let result = [];
      for (let comp in compMap) {
        result.push({
          name: comp,
          children: compMap[comp].children
        });
      }
      console.log('FORMATTED RESULT IS ', result);
      return result;
    },
    transformToTree(data) {
      let result = {};
      let nodes = {};
      let formattedData = this.formatComponentMap(data);
      formattedData.forEach(item => {
        if (!nodes[item.name]) {
          nodes[item.name] = { name: item.name, children: [] };
          result = nodes;
        }
        item.children.forEach(child => {
          nodes[child] = { name: child, children: [] };
          nodes[item.name].children.push(nodes[child]);
        });
      });
      return result;
    },
    viewComponentMap() {
      console.log(this.componentMap);
    },
    buildTree() {
      let build = this.transformToTree(this.componentMap);
      this.tree = build['App'];
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
