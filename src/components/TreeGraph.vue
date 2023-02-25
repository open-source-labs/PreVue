<template>
  <div class="container">
    <vue-tree
      style="width: 800px; height: 600px; border: 1px solid gray"
      :dataset="sampleData"
      :config="treeConfig"
    >
    </vue-tree>
  </div>
</template>

<script>
// import { tree } from 'vued3tree';
import VueTree from '@ssthouse/vue3-tree-chart';
import '@ssthouse/vue3-tree-chart/dist/vue3-tree-chart.css';
import { mapState } from 'vuex';
export default {
  name: 'TreeView',
  components: {
    VueTree,
  },
  computed: {
    ...mapState(['componentMap']),
    // componentMap: {
    //   get() {
    //     return this.$store.state.componentMap;
    //   },
    // },
    componentMap() {
      return this.$store.state.componentMap;
    },
  },
  data() {
    const childMap = [];
    let children = this.$store.state.componentMap.HomeView.children;
    console.log('children', children);
    for (let i = 0; i < children.length; i++) {
      childMap.push(children[i]);
    }

    return {
      sampleData: {
        value: 'App',
        children: [
          { value: this.$store.state.activeRoute, children: [{ value: 'Hi' }] },
        ],
      },
      treeConfig: { nodeWidth: 120, nodeHeight: 80, levelHeight: 200 },
    };
  },
};
</script>

<style>
.container {
  height: 600px;
  width: 100%;
}

.treeclass .nodetree text {
  font: 19px Roboto !important;
  text-transform: uppercase !important;
  cursor: pointer;
  text-shadow: none !important;
  background-color: red !important;
  font-weight: bold;
  color: white !important;
}

/* .treeclass .node--internal text {
  color: white;
} */
</style>
