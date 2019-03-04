<template>
  <modal
    name="demo-login"
    @before-open="beforeOpen"
    transition="pop-out"
    :width="900"
    :height="950"
  >
    <SideBar :header="comp" :name="comp" />
    <button @click="consoleThis" class="white--text">CLICK</button>
    <ComponentCodeDisplay />
  </modal>
</template>

<script>
//STRETCH: change background color of componentDisplay when modal Component pops up
import SideBar from './SideBar.vue';
import ComponentCodeDisplay from './ComponentCodeDisplay.vue';
export default {
  name: 'ComponentModal',
  data() {
    return {
      comp: ''
    };
  },
  components: {
    SideBar,
    ComponentCodeDisplay
  },
  methods: {
    consoleThis() {
      console.log(this.comp);
    },
    beforeOpen(event) {
      this.comp = event.params.comp;
    }
  }
};
</script>

<style>
.v--modal {
  background-color: #424242 !important;
}
</style>
