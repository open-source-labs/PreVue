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
    ...mapState(['componentMap','routes']),
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

    let childMap;
    const components = JSON.parse(
      JSON.stringify(this.$store.state.componentMap)
    );

    function traverseChildren(arr, obj) {
      const result = [];
      console.log('arr', arr)
      arr.forEach(child => {
        let children = [];
        let value = child;
        console.log('child', child)
        if (obj[child] !== undefined) {
          console.log('inside conditional', obj[child])
          const tempChildren = traverseChildren(obj[child].children, obj)
          value = obj[child].componentName;
          children = tempChildren;
        }
        if (typeof child !== 'string') {
          console.log('child when checking type', child)
          // value = obj[child].componentName;
          value = child.componentName;
        }
        result.push({value, children})
      })
      return result;
    }

    function traverseRoutes(obj) {
      // console.log('in traverse')
      const result = [];

      for (const key in obj) {

        const children = [];

        for (let i = 0; i < obj[key].length; i++) {
          const child = obj[key][i]

          console.log('childComp', components[child.componentName].children)
          console.log('components', components)

          // console.log('child.children', child.children)

         const tempChildren = traverseChildren(components[child.componentName].children, components)
  

          children.push({value: child.componentName, children: tempChildren});
        }

        result.push({ value: key, children})

      }


      return result;
    }

    const routes = traverseRoutes(this.$store.state.routes);
    childMap = routes;
    console.log('routes', routes)

    return {
      data: {
        value: 'App',
        children: childMap,
      },
      treeConfig: { nodeWidth: 120, nodeHeight: 80, levelHeight: 200 }
    };
  },
  methods: {
    // routes back to main page
    backToWorkspace() {
      this.$router.back();
    },
   
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
