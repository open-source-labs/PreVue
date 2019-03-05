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
      tree: {}
    };
  },
  methods: {
    viewComponentMap() {
      console.log(this.componentMap);
    },
    buildTree() {
      let treeObj = { name: 'App', children: [] };
      let componentMapPointer = this.componentMap['App'].componentName;
      let stack = [componentMapPointer];
      let treePointer = treeObj;
      let treeStack = [treePointer];
      let index = 0;
      // check if component has children
      while (stack.length > 0) {
        console.log('[componentMapPointer] -- componentMapPointeris', [
          componentMapPointer
        ]);
        // check if component has a next child after incrementing index
        if (this.componentMap[componentMapPointer].children[index]) {
          // check if tree pointer has a children array
          // if it doesn't, assign an empty array to children
          console.log(
            '[componentMapPointer].children -- CHILDRENLIST',
            this.componentMap[componentMapPointer].children
          );
          console.log(
            '[componentMapPointer].children -- CHILDREN',
            this.componentMap[componentMapPointer].children[index]
          );
          if (!Array.isArray(treePointer.children)) treePointer.children = [];
          // push an empty  object
          treePointer.children.push({
            name: this.componentMap[componentMapPointer].children[index]
          });
          // building the recently pushed object
          // treePointer.children[
          //   treePointer.children.length - 1
          // ].name = this.componentMap[componentMapPointer].children[index];
          this.componentMap[componentMapPointer].children.forEach(child => {
            stack.push(child);
          });
          treeStack.push(treePointer.children[treePointer.children.length - 1]);
          index++;
        } else {
          index = 0;
          treePointer = treeStack.pop();
          componentMapPointer = stack.pop();
          if (componentMapPointer === 'App') {
            this.tree = treeObj;
            return;
          }
        }
      }
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
