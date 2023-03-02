<template>
  <div>
    <p class="panel-heading">Selected Elements:</p>
    <Tree id="tree" :value="renderList" :indent="30" :style="$nodeStyle">
    </Tree>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import { Tree, Draggable } from 'he-tree-vue';
import '@he-tree/vue/style/default.css';
import { mapState, mapActions, mapGetters } from 'vuex';
import {
  setClickedElementList,
  deleteFromComponentHtmlList,
  // setComponentHtmlList,
  addToComponentElementList,
} from '../../store/types';
export default {
  name: 'EditQueue',
  props: {
    name: {
      type: String,
    },
    $nodeStyle: {
      // type: [Object, String],
      // default: () => {
      //   return { 'background-color': 'red' };
      // }
    },
  },
  data() {
    return {
      listToRender: null,
    };
  },
  computed: {
    ...mapState(['componentMap', 'activeComponent', 'routes', 'activeRoute']),
    renderList: {
      get() {
        return this.componentMap[this.activeComponent].htmlList;
      },
      set(newArr) {
        this.setClickedElementList(newArr);
      },
    },
  },
  methods: {
    ...mapActions([setClickedElementList]),
    deleteElement(id) {
      this.$store.dispatch(deleteFromComponentHtmlList, id);
    },
  },
  components: { Tree: Tree.mixPlugins([Draggable]) },
};
</script>

<!-- <style src="@he-tree/vue/style/default.css">
/* your styles */
</style> -->

<style>
.panel-heading {
  background-color: darkgray;
  padding: 10px;
}

p {
  padding-left: 10px;
}
#tree {
  padding: 10px;
  background-color: 00d1b2;
  height: 100%;
}

#tree .tree-branch {
  padding: 5px;
  background-color: 00d1b2;
}

#tree .tree-node {
  align-items: padding-left;
  appearance: none;
  background-color: #00d1b2;
  /*background-image: linear-gradient(1deg, #4f58fd, #149bf3 99%); */
  background-size: calc(100% + 20px) calc(100% + 20px);
  border-radius: 100px;
  border-width: 0;
  box-shadow: none;
  box-sizing: border-box;
  color: #ffffff;
  cursor: pointer;
  display: inline-flex;
  font-family: CircularStd, sans-serif;
  font-size: 1rem;
  height: auto;
  justify-content: center;
  line-height: 0.5;
  width: 100%;
  padding: 10px 20px;
  position: relative;
  text-align: center;
  text-decoration: none;
  transition: background-color 0.2s, background-position 0.2s;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: top;
  white-space: nowrap;
}
</style>
