<template>
  <section class="home-queue">
    <h1>QUEUE</h1>
    <draggable
      v-model="renderList"
      group="people"
      class="list-group"
      ghost-class="ghost"
      @start="drag = true"
      @end="drag = false"
    >
      <li
        class="list-group-item"
        v-for="(element, index) in renderList"
        :key="index + Date.now()"
      >
        <span>{{ element }}</span>

        <v-icon class="delete-icon" @click="deleteElement(index)"
          >remove_circle_outline</v-icon
        >
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
}
li {
  list-style-type: none;
}
.list-group-item {
  margin-top: 5px;
  border: 1px solid black;
  border-radius: 0.5cm;
  background-color: palevioletred;
}

.delete-icon:hover {
  cursor: pointer;
}
</style>
