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
    draggable
  }
};
</script>

<style></style>
