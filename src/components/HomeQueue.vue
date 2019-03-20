<template>
  <section class="home-queue">
    <p class="panel-heading">Selected Elements</p>
    <draggable
      v-model="renderList"
      group="people"
      class="list-group"
      ghost-class="ghost"
      @start="drag = true"
      @end="drag = false"
    >
      <li class="list-group-item" v-for="(element, index) in renderList" :key="index + Date.now()">
        <span>{{ element.text }}</span>
        
        <i class="fas fa-save fa-lg" @click="deleteElement(index)"></i>
      </li>
    </draggable>
  </section>
</template>

<script>
import draggable from 'vuedraggable';
import { mapState } from 'vuex';
import { setSelectedElementList, deleteSelectedElement } from '../store/types';

export default {
  name: 'HomeQueue',
  props: {
    name: {
      type: String
    },
    listToRender: {
      type: Array
    }
  },

  computed: {
    ...mapState(['selectedElementList']),
    renderList: {
      get() {
        return this.selectedElementList;
      },
      set(value) {
        this.$store.dispatch(setSelectedElementList, value);
      }
    }
  },
  methods: {
    deleteElement(index) {
      this.$store.dispatch(deleteSelectedElement, index);
    }
  },
  components: {
    draggable
  }
};
</script>

<style scoped>
.home-queue {
  border: 1px solid aqua;
  background-color: #393f4d;
  height: 100%;
}
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
