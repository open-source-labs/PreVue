<template>
  <v-dialog transition="dialog-bottom-transition" width="300">
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props" class='open-btn' id="button">
        <!-- <i class="fas fa-folder-open fa-lg"></i> -->

        <br />
        <span class="white--text">Open Project</span></v-btn
      >
    </template>
    <template v-slot:default="{ isActive }">
      <v-card>
        <v-toolbar color="primary" title="Get a project"></v-toolbar>
        <v-card-text>
          <v-form
            >  <v-select
            v-model="selected"
    :items="projects"
    label="Select"
  ></v-select></v-form>
        </v-card-text>
        <v-card-actions class="justify-end">
          <button @click="isActive.value = false; selectProject()">Get Project</button>
          <v-btn variant="text" @click="isActive.value = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
  <!--where you can retrieve past projects from the database-->
</template>

<script>
// import { addProject } from '../store/types';
import { mapActions } from 'vuex';

export default {
  name: 'OpenProjectComponent',
  created() {
    //fetch request to grab all project names
    // populate dropdown with returned project names
    this.getProjects();
  },
  data(){
    return {
      selected: '',
      projects: []
    }
  },
  methods: {
    ...mapActions(['replaceState']),
    async selectProject(){
      const selected = this.selected;
      console.log('name of project',this.selected)
      const res = await fetch('http://localhost:8080/projects/getProject', {method: 'POST', credentials: 'include', body: JSON.stringify({project_name: selected}), headers: { 'Access-Control-Allow-Origin': ['localhost:5173'], 'Content-Type': 'application/json'}})
    const data = await res.json();
    console.log(data)
    this.replaceState(data);
    },
    async getProjects(){
      const res = await fetch('http://localhost:8080/users/userProjects', {
        credentials: 'include',
        headers: { 'Access-Control-Allow-Origin': ['localhost:5173']}
      });
      const data = await res.json();
      this.projects = await data;
    }

  }
  // created() {
  //   Mousetrap.bind(['command+o', 'ctrl+o'], () => {
  //     this.openProjectJSON();
  //   });
  // },
  // methods: {
  // select project on click
  // send fetch request to grab state of selected project and replace current state
  //   parseFileName(file) {
  //     return file.split('/').pop();
  //   },
  //   openProjectJSON() {
  //     ipc.send('show-open-dialog');
  //   }
  // }
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
</style>
