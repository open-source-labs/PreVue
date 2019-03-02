<template>
  <div class="sidebar">
    <h1 class="white--text">Add a new component</h1>

    <v-form class="px-3">
      <BaseTextfield label="Component Name" v-model="componentName" :value="componentName"/>
      <section>
        <Icons/>
      </section>
    </v-form>
    <section>
      <label lg class="white--text">List</label>
      <Queue/>
    </section>

    <BaseButton :componentName="componentName" name="add component" icon="add_circle"></BaseButton>
  </div>
</template>

<script>
import BaseTextfield from './BaseTextfield';
import BaseButton from './BaseButton';
import Icons from './Icons';
import Queue from './Queue';
export default {
  name: 'SideBar',
  data: function() {
    return {
      componentName: ''
    };
  },
  components: {
    BaseTextfield,
    BaseButton,
    Icons,
    Queue
  }
};
</script>

<style>
.sidebar {
  display: grid;
  grid-template-rows: 1fr 3fr 4fr 1fr;
}
</style>
