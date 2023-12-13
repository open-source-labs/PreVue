<template>
  <!--the 'selected elements' that show HTML elements in the right sidebar-->
  <v-card
    class="home-queue"
    :style="{
      'background-color': '#3b444b',
      padding: '16px 0px 24px 0px',
      height: '9000px'
    }"
  >
    <v-card-title
      :style="{
        'font-size': '20px',
        color: '#f5f4f3',
        padding: '30px 0px 20px 20px',
        'white-space': 'normal'
      }"
    >
      <strong>Selected Elements</strong>
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

      <template #item="{element, index}">
        <v-chip class="ma-2 list-group-item">
          <span style="margin-right: 8px; margin-left: 18px; font-size: 16px;">{{ element.text }}</span>
          <i
            class="fas fa fa-trash fa-md"
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

@keyframes shake {
  0% { transform: translateX(0); }
  25% { transform: translateX(-2px); }
  50% { transform: translateX(2px); }
  75% { transform: translateX(-2px); }
  100% { transform: translateX(2px); }
}
.fa-trash:hover {
  cursor: pointer;
  color: red;
  animation: shake 0.5s ease-in-out infinite;
}

.list-group-item {
  margin: 2px;
  background-color: #39b982;
  height: 45px;
  padding-top: 30px;
  width: 220px;
}

.list-group-item:hover {
  background-color: rgba(0, 255, 126, 0.40242034313725494);
}

.index-label {
  color: white;
  margin-right: 8px;
}
</style>