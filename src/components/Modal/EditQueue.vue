<template>
  <div>
    <p class="panel-heading">Selected Elements:</p>
    <Tree id="tree" :value="renderList" :indent="30"> </Tree>
  </div>
</template>

<script>
import { Tree, Draggable } from 'he-tree-vue';
import '@he-tree/vue/style/default.css';
import { mapState, mapActions } from 'vuex';
import {
  setClickedElementList,
  deleteFromComponentHtmlList
} from '../../store/storeTypes';
export default {
  name: 'EditQueue',
  props: {
    name: {
      type: String
    }
  },
  data() {
    return {
      listToRender: null
    };
  },
  computed: {
    ...mapState(['componentMap', 'activeComponent', 'routes', 'activeRoute']),
    renderList: {
      get() {
        // returns html element list associated with active component from state
        const componentName = this.activeComponent;

        const findIndex = function(obj){
          for(const num in obj){
            if(obj[num].componentName === componentName){
              return num
            }
         }
       }
       let index = findIndex(this.routes[this.activeRoute])
       return this.routes[this.activeRoute][index].htmlList
       
        return this.componentMap[this.activeComponent].htmlList;
      },
      set(newArr) {
        // updates html element list in state associated with active component on reorder or drag
        this.setClickedElementList(newArr);
      }
    }
  },
  methods: {
    ...mapActions([setClickedElementList]),
    deleteElement(id) {
      // deletes html element from list associated with active component in state when trashcan icon is clicked
      this.$store.dispatch(deleteFromComponentHtmlList, id);
    }
  },
  components: { Tree: Tree.mixPlugins([Draggable]) }
};
</script>

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
  background-color: #3ab982;
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
