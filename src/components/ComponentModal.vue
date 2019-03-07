<template>
  <modal name="demo-login" transition="pop-out" :width="900" :height="950">
    <EditSideBar/>

    <ComponentCodeDisplay/>
  </modal>
</template>

<script>
//STRETCH: change background color of componentDisplay when modal Component pops up
import EditSideBar from './EditSideBar.vue';
import ComponentCodeDisplay from './ComponentCodeDisplay.vue';
export default {
  name: 'ComponentModal',
  components: {
    EditSideBar,
    ComponentCodeDisplay
  }
};
</script>

<style scoped>
.v--modal {
  background-color: #424242 !important;
  display: flex;
  padding: 15px;
}
</style>
