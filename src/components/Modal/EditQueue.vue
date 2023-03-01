<template>
  <div>
    <p>Edit Queue</p>
    <p class="panel-heading">Selected Elements</p>
    <Draggable v-model="renderList">
      <template #default="{ node, stat }">
        <span v-if="stat.children.length" @click="stat.open = !stat.open">
          {{ stat.open ? '-' : '+' }}
        </span>
        <!-- <span v-else>&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <input type="checkbox" v-model="stat.checked" /> -->
        {{ node.text }}
      </template></Draggable
    >
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
  components: {
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
