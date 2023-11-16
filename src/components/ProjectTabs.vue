<template>
  <v-tabs>
    <!-- v-tab-item component is used to define the content of a specific tab in a tab group  -->
    <v-tab-item>
      <!-- if the tab is in editMode, become a text field for project name entry -->
      <v-tab v-if="editMode" class="has-background-white tab-entry">
        <!-- if we're editing, bind editedProjectName state to text field -->
        <!-- call onEdit when in edit mode -->
        <!-- @blur event listener is used to handle the blur event on the v-text-field. 
          The onBlur method is called when the field loses focus 
          when the user clicks outside the field or presses the Tab key -->
        <v-text-field v-model="editedProjectName" @input="onEdit" @blur="onBlur" class="tab-entry"/>
      </v-tab>
      <!-- if not already editing, click to edit and display project getter return val -->
      <v-tab v-else @click="enterEditMode" class="has-background-white tab-entry">{{ editedProjectName }}</v-tab>
    </v-tab-item>
  </v-tabs>
</template>

<script>

import { mapActions } from 'vuex';

export default {
  name: 'ProjectTabs',
  data() {
    return {
      // initial local state values
      editMode: false,
      editedProjectName: this.$store.state.projectName,
    };
  },
    methods: {
    ...mapActions(['updateProjectName']),
    // on click
    enterEditMode() {
      this.editMode = true;
      this.editedProjectName = this.project;
    },
    onEdit(event) {
      this.editedProjectName = event.target.value;
    },
    // Exit edit mode on blur
    onBlur() {
      this.editMode = false;
      this.updateProjectName(this.editedProjectName);
    // this.$store.commit(this.updateProjectName(this.editedProjectName));
    },
  },
};
</script>

<style lang="scss" scoped>
.has-background-white {
  font-weight: 700;
}

.tab-entry {
  width: 135px;
}
</style>


