<template>
  <div>
    <draggable
      v-model="myList"
      group="people"
      @start="drag = true"
      @end="drag = false"
    >
      <div class="white--text" v-for="element in myList" :key="element.id">
        {{ element.text }}
      </div>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import { mapState } from 'vuex';

export default {
  name: 'Queue',
  computed: {
    ...mapState(['elementsList']),
    myList: {
      get() {
        return this.$store.state.elementsList;
      },
      set(value) {
        this.$store.commit('SET_LIST', value);
      }
    }
  },

  components: {
    draggable
  }
};
</script>

<style></style>
