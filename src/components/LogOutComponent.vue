<template>
  <!-- <button class="white--text" @click="addProject">NEW PROJECT</button> -->
  <v-btn id='logout-btn' @click="logout">
    <!-- <i class="fas fa-folder-plus fa-lg"></i> -->

    <br />
    <span class="white--text">Logout</span>
  </v-btn>
</template>

<script>

import {mapActions} from 'vuex';
export default {
  name: 'LogOutComponent',
  methods: {
    async logout() {
      
      const res = await fetch('http://localhost:8080/users/logout', {
        method: 'GET',
        credentials: 'include',
        headers: { 'Access-Control-Allow-Origin': ['localhost:5173']}
      });

      if (res.status) {
        this.$router.push('/')
      }
      
    }
  }

};
</script>

<style scoped>
#logout-btn {
  font-weight: 700;
  font-size: 14px;
}

.white--text {
  font-size: 14px;
}
</style>
