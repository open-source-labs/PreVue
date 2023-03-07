<template>
  <!--the tree; where the hierarchy of your project's components is displayed-->
  <div class="container">
    <vue-tree
      style="width: 1000px; height: 600px; border: 1px solid gray"
      :dataset="data"
      :config="treeConfig"
    >
    </vue-tree>
    <div @click="backToWorkspace">
      <h2>Back to workspace</h2>
    </div>
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
    VueTree
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
    }
  },
  data() {
    let childMap = [];
    const components = JSON.parse(
      JSON.stringify(Object.entries(this.$store.state.componentMap))
    );

    console.log('components', components);

    // iterate through components and check if components have children; if so,
    // add them as children to their respective parent
    // the format of the objects is necessary for the tree to render properly
    for (let component of components) {
      if (component[1].children.length) {
        const obj = { value: component[1].componentName, children: [] };
        for (let i = 0; i < component[1].children.length; i++) {
          const newObj = { value: component[1].children[i] };
          obj.children.push(newObj);
        }
        childMap.push(obj);
      }
    }

    childMap = JSON.parse(JSON.stringify(childMap));
    childMap = childMap.slice(1);
    console.log('child map', childMap);

    // for (let i = 0; i < childMap.length; i++) {
    //  if (childMap[i].children.length) {
    //   console.log('childmap i children', childMap[i].children)
    //  }
    // }

    // finds Routes
    // for (let component of components) {
    //   if (component[1].htmlList) {
    //     component[1].children.forEach((child) => {
    //       const obj = { value: child }
    //       childMap.push(obj);
    //     });
    //   }
    // }

    // console.log('childMap', childMap)

    return {
      data: {
        value: 'App',
        children: childMap
      },
      treeConfig: { nodeWidth: 120, nodeHeight: 80, levelHeight: 200 }
    };
  },
  methods: {
    // routes back to main page
    backToWorkspace() {
      this.$router.back();
    }
  }
};
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

h2:hover {
  color: green;
  cursor: pointer;
}
</style>
