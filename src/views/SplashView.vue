<template>
  <div id="splash">
    <h1 id="prevue">PreVue</h1>
    <v-sheet width="300" class="mx-auto">
      <v-form ref="form">
        <v-text-field
          v-model="username"
          label="Username"
          required
        ></v-text-field>

        <v-text-field
          v-model="password"
          :type="'password'"
          label="Password"
        ></v-text-field>

        <div class="buttons">
          <v-btn color="success" class="mt-4" block @click="login">
            Login
          </v-btn>
          <v-btn color="success" class="mt-4" block @click="signup">
            Sign Up
          </v-btn>
        </div>
      </v-form>
    </v-sheet>
    <div @click="toHome">
      <h2>Or click here to go work on something!</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Splash',
  data() {
    return {
      username: '',
      password: ''
    };
  },

  methods: {
    login() {
      const username = this.username;
      const password = this.password;
      fetch('http://localhost:8080/users/createUser', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({
          username,
          password
        }),
        headers: { 'Content-Type': 'application/json' }
      })
        .then(res => {
          return res.json();
        })
        .then(data => {
          console.log(data);
          this.$router.push('/home');
        })
        .catch(err => console.log(err));
    },

    signup() {
      if (this.username === 'nico' && this.password === 'zhou')
        this.$router.push('/home');
    },

    toHome() {
      this.$router.push('/home');
    }
  }
};
</script>

<style scoped>
#splash {
  margin-top: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

#prevue {
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 2.5em;
  color: #39b982;
  text-decoration: none;
}

h2 {
  margin-top: 20px;
}

h2:hover {
  color: green;
  cursor: pointer;
}
</style>
