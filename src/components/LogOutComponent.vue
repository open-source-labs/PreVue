<template>
  <!--button to log user out of current session-->
  <v-btn id="logout-btn" @click="logout">
    <br />
    <span class="white--text">Logout</span>
  </v-btn>
</template>

<script>
export default {
  name: 'LogOutComponent',
  methods: {
    async logout() {
      // sends request to server and performs logic to ensure that session is invalidated
      const res = await fetch('http://localhost:8080/users/logout', {
        method: 'GET',
        credentials: 'include',
        headers: { 'Access-Control-Allow-Origin': ['localhost:4173'] }
      });
      // once session in successfully invalidated user is redirected to splash page
      if (res.status) {
        this.$router.push('/');
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
