<template>
  <div>
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
  addToComponentElementList
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
      type: String
    }
  },
  data() {
    return {
      listToRender: ['test']
    };
  },
  computed: {
    renderList: {
      get() {
        return this.$store.state.componentMap[this.$store.state.activeComponent]
          .htmlList;
      },
      set(value) {
        this.$store.dispatch(addToComponentElementList, value);
      }
    },

    ...mapState(['componentMap', 'activeComponent', 'routes', 'activeRoute']),
    // set(newArr) {
    //   this.setClickedElementList(newArr);
    // }
    ...mapGetters({
      htmlList: 'htmlListFromActiveComponent'
    })
  },
  methods: {
    // ...mapActions([setClickedElementList]),
    // deleteElement(id) {
    //   this.$store.dispatch(deleteFromComponentHtmlList, id);
    // }
  },
  components: {
    draggable,
    Draggable
  }
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
