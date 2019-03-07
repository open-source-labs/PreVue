<template>
  <div class="container">
    <tree
      :data="tree"
      node-text="name"
      layoutType="euclidean"
      type="tree"
      :duration="0"
      :zoomable="true"
      :radius="4"
    ></tree>
  </div>
</template>

<script>
import { tree } from 'vued3tree';
import { mapState } from 'vuex';
export default {
  name: 'Tree',
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
      return result;
    },
    transformToTree(data) {
      let result = {};
      const nodes = {};
      const formattedData = this.formatComponentMap(data);
      formattedData.forEach(component => {
        if (!nodes[component.name]) {
          nodes[component.name] = { name: component.name, children: [] };
          result = nodes;
        }

        component.children.forEach(child => {
          nodes[child] = { name: child, children: [] };
          nodes[component.name].children.push(nodes[child]);
        });
      });
      return result;
    },

    buildTree() {
      let build = this.transformToTree(this.componentMap);
      this.tree = build['App'];
    }
  },
  created() {
    this.buildTree();
  }
};
</script>
<style scoped>
.container {
  height: 600px;
  width: 150%;
}
</style>
