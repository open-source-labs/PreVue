<template>
  <modal name="demo-login" transition="pop-out" :width="900" :height="950">
    <SideBar />
    <ComponentCodeDisplay />
  </modal>
</template>

<script>
//STRETCH: change background color of componentDisplay when modal Component pops up
import SideBar from './SideBar.vue';
import ComponentCodeDisplay from './ComponentCodeDisplay.vue';
export default {
  name: 'ComponentModal',
  components: {
    SideBar,
    ComponentCodeDisplay
  }
  // props: {
  //   modalHeight: {
  //     type: Number,
  //     required: true
  //   },
  //   modalWidth: {
  //     type: Number,
  //     required: true
  //   }
  // }
};
</script>

<style>
.v--modal {
  background-color: #424242 !important;
}
</style>
