<template>
  <div class="scroll">
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
    <br/>
    <div id="use-prevue">
    <p><strong>
      Use PreVue to create projects in single sessions or sign in with GitHub to
      save projects and update them anytime.</strong>
    </p>
  </div>
  <br/>
    <h2>How to use:</h2>
    <h4>Adding Components</h4>
    <ul id="list">
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
    <br/>
    <h4>Editing Components</h4>
    <ul id="list">
      <li>Double click elements to bring up the modal view</li>
      <li>
        Add additional elements to a component with a live preview of the component code
      </li>
      <li>Drag elements on the right side bar to nest elements</li>
      <li>Establish parent-child component relationships via the dropdown menu when creating or editing components</li>
    </ul>
    <br/>
    <h4>Adding Routes</h4>
    <ul id="list">
      <li>Create different routes that represent different Views for your app.</li>
      <li>
        Any components created on a given route will be automatically saved to that route
      </li>
      <li>See your application’s hierarchy by clicking the ‘Tree’ icon in the navigation bar</li>
    </ul>
    <br/>
    <h4>Saving/Opening/Exporting Projects</h4>
    <ul id="list">
      <li>If you ever need to save your current project, click the ‘Save Project’ icon to save it to PreVue’s database</li>
      <li>
        Click ‘Open Project’ to retrieve past projects
      </li>
      <li>Once you're satisfied, click the export project icon to export your awesome project as new Vue application!</li>
    </ul>
  </div>
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
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300&display=swap');

html {
  height: 140vh;
  overflow-y: auto;
}
.scroll {
  height: 140vh;
  overflow-y: auto;
}

#splash {
  /* font-weight: 700; */
  background-image: url('../assets/background.jpg');
  background-size: contain;
  background-repeat: repeat-x;
  font-family: 'Nunito', sans-serif;
  overflow: visible;
  padding: 3em 10em 10em 10em;
  margin-bottom: 20vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

#prevue {
  font-size: xx-large;
  font-family: 'Nunito', sans-serif;
  margin-bottom: 1em;
  font-weight: 700;
  font-size: 2.5em;
  color: #39b982;
  text-decoration: none;
}

#use-prevue {
  text-align: center;
  padding: 1em;
  color: white;
  background-color:#39b982;
  width: 100vw;
}

#top-elements {
  margin-left: auto;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

#list {
  margin: 0 10em 0em 10em;
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
