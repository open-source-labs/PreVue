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
import _ from 'lodash';
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
    transformToTree(arr) {
      var nodes = {};
      return arr.filter(function(obj) {
        var id = obj['name'],
          parentId = obj['parent'];

        nodes[id] = _.defaults(obj, nodes[id], { children: [] });
        parentId &&
          (nodes[parentId] = nodes[parentId] || { children: [] })[
            'children'
          ].push(obj);

        return !parentId;
      });
    },
    viewComponentMap() {
      console.log(this.componentMap);
    },
    buildTree() {
      let converted = [];
      for (let component in this.componentMap) {
        console.log(component);
        console.log(this.componentMap[component].children);
        let compObj = { name: component, parent: '' };
        converted.push(compObj);
      }
      console.log(converted);

      for (let component in this.componentMap) {
        if (this.componentMap[component].children.length > 0) {
          console.log('parent', component);
          console.log('child', this.componentMap[component].children);
          let childlist = this.componentMap[component].children;

          childlist.forEach(child => {
            for (let i = 0; i < converted.length; i++) {
              if (converted[i].name == child) {
                converted[i].parent = component;
              }
            }
          });
        }
      }
      console.log(converted);
      let build = this.transformToTree(converted);
      console.log('build', build);
      this.tree = build[0];
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
