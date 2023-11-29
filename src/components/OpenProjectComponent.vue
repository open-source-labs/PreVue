<template>
  <!--where you can retrieve past projects from the database-->
  <v-dialog transition="dialog-bottom-transition" width="300">
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props" class="open-btn" id="button">
        <br />
        <span class="white--text">Open Project</span></v-btn>
    </template>
    <template v-slot:default="{ isActive }">
      <v-card>
        <v-toolbar id="toolbar" style="{color: white }" color="#39b982" title="Get a project"></v-toolbar>
        <v-card-text>
          <v-form><v-select v-model="selected" :items="projects" label="Select"></v-select></v-form>
        </v-card-text>
        <v-card-actions class="justify-end">
          <button @click="
            isActive.value = false;
          selectProject();
                                                            ">
            OPEN
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
  name: 'OpenProjectComponent',
  created() {
    // initial fetch request to grab all project names
    // populate dropdown with returned project names
    this.getProjects();
  },
  beforeUpdate() {
    // updates dropdown list of projects when new project is saved
    this.getProjects();
  },
  data() {
    return {
      selected: '',
      projects: []
    };
  },
  methods: {
    ...mapActions(['replaceState']),
    async selectProject() {
      const selected = this.selected;
      // request to find projects by the logged in user
      const res = await fetch('http://localhost:8080/projects/getProject', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({ project_name: selected }),
        headers: {
          // 'Access-Control-Allow-Origin': ['localhost:8080'],
          'Content-Type': 'application/json'
        }
      });
      const data = await res.json();
      console.log("dada", data)
      // update state with project found in database
      this.replaceState(data);
    },
    async getProjects() {
      // returns array of all projects associated with authenticated user from database and updates component state
      const res = await fetch('/users/userProjects', {
        credentials: 'include'
        // headers: { 'Access-Control-Allow-Origin': ['localhost:8080'] }
      });
      const data = await res.json();
      this.projects = await data;
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300&display=swap');

.open-btn {
  font-family: 'Nunito', sans-serif;
}

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
