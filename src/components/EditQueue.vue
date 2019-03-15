<template>
  <div>
    <Tree :data="renderList" draggable="draggable" cross-tree="cross-tree">
      <div slot-scope="{ data }" class="white --text">
        <template v-if="!data.isDragPlaceHolder">
          <span>{{ data.text }}</span>
        </template>
      </div>
    </Tree>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import { DraggableTree } from 'vue-draggable-nested-tree';
import { mapState, mapActions } from 'vuex';
import { setClickedElementList } from '../store/types';

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
    ...mapActions([setClickedElementList])
  },
  components: {
    draggable,
    Tree: DraggableTree
  }
};
</script>

<style></style>
