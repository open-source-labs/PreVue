<template>
  <div>
    <hr />
    <p>Edit Queue</p>
    <p class="panel-heading">Selected Elements</p>
    <Draggable v-model="renderList" />
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import { BaseTree, Draggable } from '@he-tree/vue';
import '@he-tree/vue/style/default.css';
import { mapState, mapActions, mapGetters } from 'vuex';
import {
  setClickedElementList,
  deleteFromComponentHtmlList,
  // setComponentHtmlList,
  addToComponentElementList,
} from '../../store/types';
export default {
  mounted() {
    console.log('componentmap', this.$store.state.componentMap);
    console.log('active component', this.activeComponent);
    console.log('htmlList;', this.componentMap[this.activeComponent].htmlList);
  },
  updated() {
    console.log('test', this.componentMap[this.activeComponent].htmlList);
  },
  name: 'EditQueue',
  props: {
    name: {
      type: String,
    },
  },
  data() {
    return {
      listToRender: ['test'],
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
  components: {
    draggable,
    Draggable,
  },
};
</script>

<!-- <style src="@he-tree/vue/style/default.css">
/* your styles */
</style> -->

<style scoped>
.delete-icon:hover {
  cursor: pointer;
}
.drag {
  background-color: white;
  margin: 0.5em;
  border-radius: 5px;
}
.drag-text {
  padding-left: 5px;
}
</style>