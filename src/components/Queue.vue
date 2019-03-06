<template>
  <div>
    <button @click="consoleThis" class="white--text">CLICK QUEUE</button>
    <draggable :list="listToRender" group="people" @start="drag = true" @end="drag = false">
      <div class="white--text" v-for="element in listToRender">{{ element }}</div>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable';

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
    // renderList: {
    //   get() {
    //     // if (this.name)
    //     //   return this.$store.state.componentMap[this.name].htmlElements;
    //     // console.log('listrernderque', this.listToRender);
    //     console.log(this.test);
    //     return this.listToRender;
    //   }
    //   // set(value) {
    //     // console.log('value pushed', value);
    //     // this.listToRender = value;
    //     // console.log('set');
    //     // this.test = this.listToRender;
    //     // this.listToRender = value;
    //     // const componentName = this.name;
    //     // if (componentName)
    //     //   this.$store.commit('SET_COMPONENT_MAP_LIST', {
    //     //     value,
    //     //     componentName
    //     //   });
    //     // this.$store.commit('SET_LIST', value);
    //   }
    // }
  },
  components: {
    draggable
  }
};
</script>

<style></style>
