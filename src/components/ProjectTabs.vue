<template>
  <!--shows the name of your current project-->
  <v-tabs>
    <v-tab class="has-background-white tab-item">{{ this.project }}</v-tab>
  </v-tabs>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'ProjectTabs',
  computed: {
    ...mapState(['projects', 'activeTab']),
    project: {
      // return name of project user provided on save
      get() {
        return this.$store.state.projectName;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.has-background-white {
  font-weight: 700;
}
</style>
