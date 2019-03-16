<template>
  <div id="project-tabs">
    <b-tabs type="is-boxed" @change="consoleLog">
      <b-tab-item
        class="has-background-white tab-item"
        v-for="(label, idx) in projects"
        :label="label"
        :key="idx"
      ></b-tab-item>
    </b-tabs>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'ProjectTabs',
  computed: mapState(['projects']),
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
