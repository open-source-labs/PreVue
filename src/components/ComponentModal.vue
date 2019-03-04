<template>
  <modal
    name="demo-login"
    @before-open="beforeOpen"
    transition="pop-out"
    :width="900"
    :height="950"
  >
    <EditSideBar :header="comp" :name="comp" />

    <ComponentCodeDisplay :compName="comp" />
  </modal>
</template>

<script>
//STRETCH: change background color of componentDisplay when modal Component pops up
import EditSideBar from './EditSideBar.vue';
import ComponentCodeDisplay from './ComponentCodeDisplay.vue';
export default {
  name: 'ComponentModal',
  data() {
    return {
      comp: ''
    };
  },
  components: {
    EditSideBar,
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
  display: flex;
  padding: 15px;
}
</style>
