<template>
  <!-- <button class="white--text" @click="addProject">NEW PROJECT</button> -->
  <button @click="logout">
    <i class="fas fa-folder-plus fa-lg"></i>

    <br />
    <span class="white--text">Logout</span>
  </button>
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

<style></style>
