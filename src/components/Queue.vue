<template>
  <div>
    <button @click="consoleThis" class="white--text">CLICK QUEUE</button>
    <draggable v-model="renderList" group="people" @start="drag = true" @end="drag = false">
      <div class="white--text" v-for="element in renderList">{{ element }}</div>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import { mapState } from 'vuex';
import { setSelectedElementList } from '../store/types';

export default {
  name: 'Queue',
  props: {
    name: {
      type: String
    },
    listToRender: {
      type: Array
    }
  },
  methods: {
    consoleThis() {
      console.log(this.listToRender);
    }
  },
  computed: {
    ...mapState(['selectedElementList']),
    renderList: {
      get() {
        // if (this.name)
        //   return this.$store.state.componentMap[this.name].htmlElements;
        // console.log('listrernderque', this.listToRender);
        // console.log(this.test);
        return this.selectedElementList;
      },
      set(value) {
        // console.log('value pushed', value);
        // this.listToRender = value;
        // console.log('set');
        // this.test = this.listToRender;
        // this.listToRender = value;
        // const componentName = this.name;
        // if (componentName)
        //   this.$store.commit('SET_COMPONENT_MAP_LIST', {
        //     value,
        //     componentName
        //   });
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
