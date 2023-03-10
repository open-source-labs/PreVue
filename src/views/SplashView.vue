<template>
  <div id="splash">
    <div id="top-elements">
      <div @click="toHome">
        <h4 id="prevue-link">Try PreVue</h4>
      </div>
      <v-btn width="200px" color="success" class="mt-4" @click="oauth">
        Sign in with GitHub
      </v-btn>
    </div>
    <h1 id="prevue">PreVue</h1>
    <h2>All in One Prototyping Tool For Vue Developers</h2>
    <h3>From Component Architecture to Code Exporting</h3>
    <p>
      PreVue allows the user to conceptualize and visualize their component
      architecture by allowing users to :
    </p>
    <p>*DEMO GIF HERE??*</p>
    <ul id="prevue-features">
      <li>Create components and preview their associated code</li>
      <li>Set up different routes and views</li>
      <li>Establish parent-child component relationships</li>
      <li>View application hierarchy in tree format</li>
      <li>
        Export the component architecture as a Vue application created with
        default Vite settings.
      </li>
    </ul>
    <p>
      Use PreVue to create projects in single sessions or sign in with GitHub to
      save projects and update them anytime.
    </p>
    <h2>How to use:</h2>
    <h4>Adding Components</h4>
    <ul id="adding-components">
      <li>Double click on the application icon</li>
      <li>
        Create components by entering a name and clicking the HTML elements you
        need
      </li>
      <li>Clicked elements will be shown in the right sidebar</li>
      <li>Drag the elements to change their order</li>
      <li>
        Once you're satisfied, click the button to ‘add a component’ and it will
        show up in the working area. Resize and move components to fit the
        design you have in mind.
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Splash',

  beforeCreate() {
    fetch('http://localhost:8080/users/validateSession', {
      credentials: 'include',
      headers: {
        'Access-Control-Allow-Origin': ['localhost:5173']
      }
    }).then(res => {
      if (res.status === 200) {
        this.toHome();
      }
    });
  },
  methods: {
    oauth() {
      // make request to endpoint; in server, redirect
      fetch('http://localhost:8080/users/oauth', {
        method: 'GET',
        redirect: 'follow',
        // mode: 'no-cors',
        headers: { 'Access-Control-Allow-Origin': '*' }
      })
        .then(res => {
          console.log("we're here");
          // console.log(res.json())
          return res.json();
        })
        .then(data => window.location.replace(data));
    },

    toHome() {
      this.$router.push('/home');
    }
  }
};
</script>

<style scoped>
#splash {
  font-family: Trebuchet MS;
  background: rgb(255, 255, 255);
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 1) 29%,
    rgba(0, 255, 126, 0.40242034313725494) 100%
  );
  padding: 10px;
  display: flex;
  /* height: 50em; */
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

#prevue {
  font-size: xx-large;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 2.5em;
  color: #39b982;
  text-decoration: none;
}
#top-elements {
  margin-left: auto;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

#adding-components {
  margin: 0 10em 0 10em;
}

#prevue-link {
  margin-top: 12px;
  margin-right: 20px;
}
#prevue-link:hover {
  color: green;
  cursor: pointer;
}
</style>
