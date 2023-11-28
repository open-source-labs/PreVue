<template>
  <!--the tree; where the hierarchy of your project's components is displayed-->
  <div class="container">
    <vue-tree
      style="width: 1000px; 
            height: 600px; 
            border: 2px inset rgb(148, 142, 142); 
            border-radius: 10px;
            box-shadow: 0 0 10px rgb(94, 92, 92);"
      :dataset="data"
      :config="treeConfig"
    >
    </vue-tree>
    <div @click="backToWorkspace">
      <h2>Return to Workspace</h2>
    </div>
  </div>
</template>

<script>
import VueTree from '@ssthouse/vue3-tree-chart';
import '@ssthouse/vue3-tree-chart/dist/vue3-tree-chart.css';
import { mapState } from 'vuex';
export default {
  name: 'TreeView',
  components: {
    VueTree
  },
  computed: {
    ...mapState(['componentMap', 'routes']),
    componentMap() {
      return this.$store.state.componentMap;
    }
  },
  data() {
    let childMap;
    const components = JSON.parse(
      JSON.stringify(this.$store.state.componentMap)
    );

    function traverseChildren(arr, obj) {
      const result = [];
      arr.forEach(child => {
        let children = [];
        let value = child;
        if (obj[child] !== undefined) {
          // recursively navigate component hierarchy until no more children are found in children arrays
          const tempChildren = traverseChildren(obj[child].children, obj);
          value = obj[child].componentName;
          children = tempChildren;
        }
        if (typeof child !== 'string') {
          value = child.componentName;
        }
        result.push({ value, children });
      });
      return result;
    }

    // navigate routes and look for children components
    function traverseRoutes(obj) {
      const result = [];
      for (const key in obj) {
        const children = [];
        for (let i = 0; i < obj[key].length; i++) {
          const child = obj[key][i];
          const tempChildren = traverseChildren(
            components[child.componentName].children,
            components
          );
          children.push({ value: child.componentName, children: tempChildren });
        }
        result.push({ value: key, children });
      }
      return result;
    }

    const routes = traverseRoutes(this.$store.state.routes);
    childMap = routes;

    // where the contents of the tree are rendered
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

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@450&display=swap');

.container {
  
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

h2 {
  padding-top: 25px;
  font-family: 'Montserrat';
}

h2:hover {
  color: rgb(34, 173, 34);
  cursor: pointer;
}
</style>
