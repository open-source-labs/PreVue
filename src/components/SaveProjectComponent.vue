<template>
  <v-dialog transition="dialog-bottom-transition" width="300">
    <template v-slot:activator="{ props }">
      <v-btn color="white" v-bind="props">
        <br />
        <span class="white--text">Save Project</span></v-btn
      >
    </template>
    <template v-slot:default="{ isActive }">
      <v-card>
        <v-toolbar
          id="toolbar"
          color="#39b982"
          title="Save your prototype"
        ></v-toolbar>
        <v-card-text>
          <v-form
            ><v-text-field
              required
              v-model="projectName"
              variant="underlined"
              label="Project name"
              placeholder="myCustomProject"
              :style="{ color: 'black' }"
            >
            </v-text-field
          ></v-form>
        </v-card-text>
        <v-card-actions class="justify-end">
          <button
            @click="
              isActive.value = false;
              save();
            "
          >
            Save
          </button>
          <v-btn variant="text" @click="isActive.value = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'SaveProjectComponent',
  methods: {
    ...mapActions(['nameProject', 'incRerenderKey']),
    save() {
      const stateToSave = {
        projectObject: this.$store.state,
        project_name: this.$store.state.projectName
      };
      fetch('http://localhost:8080/projects/saveProject', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(stateToSave),
        headers: { 'Content-type': 'application/json; charset=UTF-8' }
      });

      this.incRerenderKey();
    }
  },
  computed: {
    projectName: {
      get() {
        return this.$store.state.projectName;
      },
      set(value) {
        this.nameProject(value);
      }
    },
    rerenderKey: {
      get() {
        return this.$store.state.rerenderKey;
      }
    }
  }
};
</script>

<style scoped>
.white--text {
  font-weight: 700;
}

.white--text:hover {
  color: #39b982;
}

#toolbar {
  color: white;
}
</style>
