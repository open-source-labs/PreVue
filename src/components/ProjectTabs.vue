<template>
  <v-tabs class="tab-entry">
    <!-- v-tab-item component is used to define the content of a specific tab in a tab group  -->
    <v-tab-item class="tab-entry">
      <!-- if the tab is in editMode, become a text field for project name entry -->
      <v-tab v-if="editMode" class="has-background-white tab-entry">
        <!-- if we're editing, bind editedProjectName state to text field -->
        <!-- call onEdit when in edit mode -->
        <!-- @blur event listener is used to handle the blur event on the v-text-field. 
          The onBlur method is called when the field loses focus 
          when the user clicks outside the field or presses the Tab key -->
        <v-text-field v-model="editedProjectName" @input="onEdit" @blur="onBlur"  @keydown.enter="onEnter" class="tab-entry"/>
      </v-tab>
      <!-- if not already editing, click to edit and display project getter return val -->
      <v-tab v-else @click="enterEditMode" class="has-background-white tab-entry">{{ projectTabName }}</v-tab>
    </v-tab-item>
  </v-tabs>
</template>

<script>

import { mapState, mapActions } from 'vuex';

export default {
  name: 'ProjectTabs',
  computed: {
    ...mapState(['editedProjectName']),
    projectTabName: {
      get() {
        return this.editedProjectName;
      }
    },
  },
  data() {
    return {
      editMode: false,
    };
  },
    methods: {
    ...mapActions(['updateProjectName']),
    // on click
    enterEditMode() {
      this.editMode = true;
    },
    onEdit(event) {
      this.editedProjectName = event.target.value;
    },
    // was determined to make pressing enter also save the project name
    onEnter(event) {
      this.editMode = false;
      this.updateProjectName(event.target.value);
    },
    // Exit edit mode on blur
    onBlur(event) {
      this.editMode = false;
      this.updateProjectName(event.target.value);
    console.log('this.editedProjectName is', this.editedProjectName);
    console.log('this.$store.state.editedProjectName is', this.$store.state.editedProjectName);

    },
  },
};
</script>

<style lang="scss" scoped>
.has-background-white {
  font-weight: 700;
}

.tab-entry {
  min-width: 150px;
}
</style>


