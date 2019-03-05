<template>
  <div>
    <button @click="consoleThis" class="white--text">CLICK QUEUE</button>
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
  props: {
    name: {
      type: String
    }
  },
  methods: {
    consoleThis() {
      console.log(this.name);
    }
  },
  computed: {
    ...mapState(['elementsList']),
    myList: {
      get() {
        if (this.name)
          return this.$store.state.componentMap[this.name].htmlElements;
        return this.$store.state.elementsList;
      },
      set(value) {
        const componentName = this.name;
        if (componentName)
          this.$store.commit('SET_COMPONENT_MAP_LIST', {
            value,
            componentName
          });
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
