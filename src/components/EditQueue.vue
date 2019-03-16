<template>
  <div>
    <Tree :data="renderList" draggable="draggable" cross-tree="cross-tree">
      <div slot-scope="{ data }" class="white --text">
        <template v-if="!data.isDragPlaceHolder">
          <span>{{ data.text }}</span>
          <v-icon class="delete-icon" @click="deleteElement(data._id)"
            >remove_circle_outline</v-icon
          >
        </template>
      </div>
    </Tree>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import { DraggableTree } from 'vue-draggable-nested-tree';
import { mapState, mapActions } from 'vuex';
import {
  setClickedElementList,
  deleteFromComponentHtmlList
} from '../store/types';

export default {
  name: 'EditQueue',
  props: {
    name: {
      type: String
    },
    listToRender: {
      type: Array
    }
  },
  computed: {
    ...mapState(['clickedComponent', 'componentMap']),
    renderList: {
      get() {
        return this.componentMap[this.clickedComponent].htmlList;
      },
      set(newArr) {
        this.setClickedElementList(newArr);
      }
    }
  },
  methods: {
    ...mapActions([setClickedElementList]),
    getIndex() {
      this.index++;
    },
    deleteElement(id) {
      //console.log(element);
      this.$store.dispatch(deleteFromComponentHtmlList, id);
    }
  },
  components: {
    draggable,
    Tree: DraggableTree
  }
};
</script>
<style>
.list-group-item {
  display: inline;
}
</style>
