<template>
  <div>
    <!-- <p class="panel-heading">selected elements</p>
    <draggable
      v-model="renderList"
      group="people"
      @start="drag = true"
      @end="drag = false"
    >
      <li
        class="list-group-item"
        v-for="(element, index) in renderList"
        :key="index + Date.now()"
      >
        <span>{{ element }}</span>

        <i class="fas fa-save fa-lg" @click="deleteElement(index)"></i>
      </li>
    </draggable>-->
    <p class="panel-heading">Selected Elements</p>
    <Tree :data="renderList" draggable="draggable" cross-tree="cross-tree">
      <div slot-scope="{ data }" class="white --text">
        <template v-if="!data.isDragPlaceHolder">
          <span>{{ data.text }}</span>
          <i class="fas fa-save fa-lg" @click="deleteElement(index)"></i>
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
    ...mapState(['activeComponent', 'componentMap']),
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
    ...mapActions([setClickedElementList])
  },
  components: {
    draggable,
    Tree: DraggableTree
  }
};
</script>

<style scoped>
li {
  list-style-type: none;
}
.list-group-item {
  margin-top: 5px;
  border: 1px solid black;
  border-radius: 0.5cm;
  background-color: #d1bfa7;
}

.delete-icon:hover {
  cursor: pointer;
}
</style>
