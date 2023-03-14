<template>
  <!--the 'selected elements' that show HTML elements in the right sidebar-->
  <v-card
    class="home-queue"
    :style="{
      'background-color': '#565656',
      'border-bottom': '0.5px solid #6a696a',
      padding: '16px 0px 24px 0px'
    }"
  >
    <v-card-title
      :style="{
        'font-size': '14px',
        color: 'white',
        'font-weight': '700',
        padding: '0 24px 0 24px'
      }"
    >
      Selected Elements
    </v-card-title>
    <draggable
      v-model="renderList"
      item-key="index"
      style="color: white;"
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
            style="color: white;"
            @click="deleteElement(index)"
            :style="{ 'margin-left': 'auto' }"
          >
          </i>
        </v-chip>
      </template>
    </draggable>
  </v-card>
</template>

<script>
import draggable from 'vuedraggable';
import {
  setSelectedElementList,
  deleteSelectedElement
} from '../store/storeTypes';

export default {
  name: 'HomeQueue',
  components: {
    draggable
  },
  computed: {
    renderList: {
      get() {
        // return list of user selected html elements associated with created component
        return this.$store.state.selectedElementList;
      },
      set(value) {
        // sets order of selected html elements in state when dragged or reordered
        this.$store.dispatch(setSelectedElementList, value);
      }
    },
    dragOptions() {
      // allows selected html elements to be dragged and reordered
      return {
        animation: 200,
        group: 'description',
        disabled: false
      };
    }
  },
  methods: {
    deleteElement(index) {
      // remove selected html element when trashcan icon is clicked from elements associated the user created component
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
  background-color: #39b982;
  height: 35px;
  padding-top: 2px;
  text-align: center;
}

.list-group-item:hover {
  background-color: rgba(0, 255, 126, 0.40242034313725494);
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
