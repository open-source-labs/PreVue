<template>
  <div>
    <draggable
      v-model="renderList"
      group="people"
      @start="drag = true"
      @end="drag = false"
    >
      <div
        class="white--text"
        v-for="(element, index) in renderList"
        :key="index + Date.now()"
      >
        {{ element }}
      </div>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import { mapState } from 'vuex';
import { setSelectedElementList } from '../store/types';

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
  components: {
    draggable
  }
};
</script>

<style></style>
