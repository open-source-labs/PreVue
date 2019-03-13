<template>
  <b-tabs type="is-boxed" id="project-tabs">
    <b-tab-item
      class="has-background-white"
      id="tab-item"
      v-for="(label, idx) in activeProjects"
      :label="label"
      :key="idx"
    ></b-tab-item>
  </b-tabs>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'ProjectTabs',
  computed: mapState(['activeProjects'])
};
</script>

<style lang="scss" scoped>
#project-tabs {
  height: 20px;
}
</style>
