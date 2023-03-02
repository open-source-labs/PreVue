<template>
  <div>
    <p>Edit Queue</p>
    <p class="panel-heading">Selected Elements:</p>
    <Tree id="tree" :value="renderList" :indent="30"> </Tree>
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
  addToComponentElementList
} from '../../store/types';

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
        return this.componentMap[this.activeComponent].htmlList;
      },
      set(newArr) {
        console.log('in set');
        this.setClickedElementList(newArr);
      }
    }
  },
  methods: {
    ...mapActions([setClickedElementList]),
    deleteElement(id) {
      this.$store.dispatch(deleteFromComponentHtmlList, id);
    }
  },
  components: { Tree: Tree.mixPlugins([Draggable]) }
};
</script>

<!-- <style src="@he-tree/vue/style/default.css">
/* your styles */
</style> -->

<style scoped>
.panel-heading {
  padding: 10px;
}

p {
  padding-left: 10px;
}
#tree {
  padding: 10px;
  backgrolund-color: darkgray;
}
</style>
