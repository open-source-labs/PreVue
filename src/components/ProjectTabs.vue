<template>
  <b-tabs type="is-boxed" id="project-tabs" @change="consoleLog">
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
  computed: mapState(['activeProjects']),
  methods: {
    consoleLog(idx) {
      console.log(idx);
    }
  }
};
</script>

<style lang="scss" scoped>
#project-tabs {
  height: 20px;
}
</style>
