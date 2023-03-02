<template>
  <v-card
    class="home-queue"
    :style="{
      'background-color': 'inherit',
      'border-bottom': '0.5px solid #6a696a',
      padding: '16px 0px 24px 0px'
    }"
  >
    <v-card-title
      :style="{
        'font-size': '14px',
        color: '#f5f4f3',
        'font-weight': '550',
        padding: '0 24px 0 24px'
      }"
      >Selected Elements</v-card-title
    >
    <draggable
      v-model="renderList"
      item-key="index"
      class="d-flex flex-column"
      v-bind="dragOptions"
      @start="drag = true"
      @end="drag = false"
    >
      <template #item="{element}">
        <v-chip class="ma-2 list-group-item">
          {{ element.text }}
          <i
            class="fas fa fa-trash fa-md"
            @click="deleteElement(index)"
            :style="{ 'margin-left': 'auto' }"
          ></i>
        </v-chip>
      </template>
    </draggable>
  </v-card>
</template>

<script>
import draggable from 'vuedraggable';
import { setSelectedElementList, deleteSelectedElement } from '../store/types';

export default {
  name: 'HomeQueue',
  components: {
    draggable
  },
  computed: {
    renderList: {
      get() {
        return this.$store.state.selectedElementList;
      },
      set(value) {
        this.$store.dispatch(setSelectedElementList, value);
      }
    },
    dragOptions() {
      return {
        animation: 200,
        group: 'description',
        disabled: false
      };
    }
  },
  methods: {
    deleteElement(index) {
      this.$store.dispatch(deleteSelectedElement, index);
    }
  }
};
</script>

<style scoped>
.fa-trash:hover {
  cursor: pointer;
  color: red;
}

.list-group-item {
  margin: 2px;
  background-color: #00d1b2;
  height: 35px;
  padding-top: 2px;
  text-align: center;
}

.list-group-item:hover {
  background-color: #3ab982;
}
/* .home-queue {
  border: 1px solid white;
  background-color: hsl(222, 15%, 26%);
  height: 100%;
}
li {
  list-style-type: none;
}
.list-group-item {
  margin: 2px;
  border: 1px solid black;
  border-radius: 0.5cm;
  background-color: #e7d5bc;
  height: 35px;
  padding-top: 2px;
  text-align: center;
}

.fa-trash:hover {
  cursor: pointer;
  color: red;
} */
</style>
