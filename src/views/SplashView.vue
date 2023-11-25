<template>
  <div class="scroll">
    <div id="splash">


      <div id="toolbar">
        <div id="toolbar-content">
          <img src="../assets/logo.png" alt="PreVue Logo" id="toolbar-logo" />
          <h2>PreVue</h2>
        </div>

        <div @click="toHome">
          <h4 id="prevue-link">Home</h4>
        </div>
        <div @click="toHome">
          <h4 id="prevue-link">Team</h4>
        </div>
        <div @click="toHome">
          <h4 id="prevue-link">Docs</h4>
        </div>
        <div @click="oauth">
          <h4 id="prevue-link">Github</h4>
        </div>
        <!-- <v-btn width="85px" height="20px" color="success" class="mt-4" @click="oauth">
          GitHub
        </v-btn> -->
      </div>





      
      <div id="header-container">
        <div id="header-content">
          <div class="header-text">
            <h1 id="prevue-header">All-in-One Prototyping Tool For Vue Developers</h1>
            <p id="subtitle">A user-friendly, entirely open-source platform for conceptualizing and visualizing your Vue components
          </p>
          <v-btn color="#39b982" class="mt-4"  @click="toHome">
          <strong>Get Started</strong>
          </v-btn>
          </div>
            <div id="video-container">
              <video src="../assets/PreVueDemo.mp4" muted autoplay loop></video>
          </div>
        </div>
      </div>

      
     
      
  
      <div class="second-panel">
        <h2>Intuitive & Customizable</h2>
        <p id="subtitle-second-panel">PreVue allows you to easily build intuitive user interfaces and construct pre-built components with hierarchal data flow, seamless drag-and-drop, customizable file exports and more!
        </p>
        <v-btn width="150px" color="white" class="mt-4">
            Learn More
          </v-btn>
      </div>
      



      <div id="third-panel-container">
        <div id="header-content">
          <div id="video-container">
              <video src="../assets/PreVueDemo.mp4" muted autoplay loop></video>
            </div>
          <div class="header-text">
            <h1 id="third-panel-header">All-in-One Prototyping Tool For Vue Developers</h1>
            <p id="third-panel-subtitle">A user-friendly, entirely open-source platform for conceptualizing and visualizing your Vue components
            </p>
            
          </div>
        </div>
      </div>




      <div id="authors">
        <div class="author">
          <h3>Jason Boo</h3>
          <img src="" />
          <div class="links">
            <h4><a href="https://github.com/jasonboo123">Github</a></h4>
            <h4>
              <a href="https://www.linkedin.com/in/jason-boo/">LinkedIn</a>
            </h4>
          </div>
        </div>
        <div class="author">
          <h3>Robert Drake</h3>
          <img src="../assets/robert-photo.jpeg" />
          <div class="links">
            <h4><a href="https://github.com/rmdrake8">Github</a></h4>
            <h4>
              <a href="https://www.linkedin.com/in/rmdrake8/">LinkedIn</a>
            </h4>
          </div>
        </div>
        <div class="author">
          <h3>Sean Flynn</h3>
          <img src="../assets/sean-photo.jpeg" />
          <div class="links">
            <h4><a href="http://github.com/seanflynn5">Github</a></h4>
            <h4>
              <a href="https://www.linkedin.com/in/sean-g-flynn/">LinkedIn</a>
            </h4>
          </div>
        </div>
        <div class="author">
          <h3>Zach Pestaina</h3>
          <img src="../assets/zach-photo.jpeg" />
          <div class="links">
            <h4><a href="https://github.com/zachpestaina">Github</a></h4>
            <h4>
              <a href="https://www.linkedin.com/in/zachpestaina/">LinkedIn</a>
            </h4>
          </div>
        </div>
      </div>
      <br />
      <h2>
        Please vist PreVue's
        <a href="https://github.com/open-source-labs/PreVue">GitHub</a> if
        you're interested to learn how you can contribute!
      </h2>
      <br />
      <div class="border">
        <div id="bottom-elements">
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Splash',

  beforeCreate() {
    fetch('/users/validateSession', {
      credentials: 'include'
      // headers: {
      //   'Access-Control-Allow-Origin': ['localhost:4173']
      // }
    }).then(res => {
      if (res.status === 200) {
        this.toHome();
      }
    });
  },
  methods: {
    // oauth() {
    //   // make request to endpoint, to be redirected in server
    //   fetch('/users/oauth', {
    //     method: 'GET',
    //     redirect: 'follow'
    //     // headers: { 'Access-Control-Allow-Origin': ['localhost:4173'] }
    //   })
    //     .then(res => {
    //       return res.json();
    //     })
    //     .then(data => window.location.replace(data));
    // },
    oauth() {
      // Redirect the client to the backend OAuth endpoint
      window.location.href = '/users/oauth';
    },
    toHome() {
      this.$router.push('/home');
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700&family=Open+Sans:wght@800&display=swap');

@import url('https://fonts.googleapis.com/css2?family=Assistant:wght@500&family=Montserrat:wght@700&family=Open+Sans:wght@800&display=swap');

html {
  height: 140vh;
  overflow-y: auto;
}

video {
  width: 70%;
  height: 70%;
}

#video-container {
  display: flex;
  align-items: center;
  justify-content: center;
}
.scroll {
  height: 120vh;
  overflow-y: auto;
}

#splash {
  /* background-image: url('../assets/background.jpg'); */
  background-size: contain;
  background-repeat: repeat;
  background-attachment: fixed;
  font-family: 'Montserrat', sans-serif;
  overflow: visible;
  padding: 3em 3em 5em 3em;
  margin-bottom: 10vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.header-text {
  text-align: center;
  
}

#header-container {
  display: flex;
  justify-content: space-between;
  width: 100vw;
  padding-bottom: 50px;
  background: linear-gradient(to bottom, transparent 60%, #39b982 100%)
}

#header-content {
  display: flex;
  align-items: center;
  padding: 50px;
  padding-bottom:90px;
}

#prevue-header {
  font-family: 'Open Sans';
  font-weight: bolder;
  font-size: 2.2rem;
  color: #1f2937;
  padding-bottom: 1vw;
  text-decoration: none;
  text-align: center;
}

.second-panel {
  text-align: center;
  padding: 1em;
  padding-top: 90px;
  padding-bottom: 70px;
  color: white;
  background: #39b982;
  width: 100vw;
  font-family: 'Open Sans';
  font-size: 1.5rem;
  box-shadow: inset 0 -10px 10px -10px rgba(0, 0, 0, 0.5);
}

#subtitle-second-panel {
  font-size: 1.6rem;
  font-weight: 500;
  font-family: 'Assistant', sans-serif;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 350px;
  padding-right: 350px;
}

video {
  width: 90%;
  height: auto; 
  border-radius: 9px; 
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
  overflow: hidden;
}

#subtitle {
  font-size: 1.4rem;
  font-weight: 300;
  color: #555; 
}

#prevue-link:hover {
  color: green;
  cursor: pointer;
}

.border {
  text-align: center;
  padding: 1em;
  color: white;
  background-color: #39b982;
  width: 100vw;
}

#third-panel-container {
  display: flex;
  justify-content: space-between;
  width: 100vw;
  padding-bottom: 30px;
  padding-top: 60px;
  background: white;
  box-shadow: inset 0 -10px 10px -10px rgba(0, 0, 0, 0.5);
}

#third-panel-header {
  /* font-family: 'Open Sans';
  font-size: 2rem;
  color:  #044c49;
  padding-bottom: 1vw;
  padding-right: 100px;
  padding-left: 100px;
  text-decoration: none;
  text-align: right; */
  font-family: 'Open Sans';
  font-size: 2rem;
  padding-bottom: 1vw;
  padding-right: 100px;
  padding-left: 100px;
  text-decoration: none;
  text-align: right;
  background: linear-gradient(to right, #044c49, #0dbd27); 
  -webkit-background-clip: text; /* For Safari/Chrome/iOS */
  color: transparent;
  background-clip: text;
}

#third-panel-subtitle {
  font-size: 1.4rem;
  font-weight: 300;
  color: #555; 
  padding-bottom: 1vw;
  padding-right: 100px;
  padding-left: 125px;
  text-align: right;
}

#toolbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 65px;
  display: flex;
  align-items: center;
  /* justify-content: flex-end;  */
  background-color: white;
  border-bottom: 1px solid lightgrey;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 8px; 
  z-index: 1;
  font-size: 13px;
}

#toolbar-logo {
  width: 60px;
  height: 60px;
  margin-right: auto; 
}

#toolbar-content {
  display: flex;
  align-items: center;
  margin-right: auto;
}


#toolbar h4,
#toolbar > div > h4 {
  margin: 0;
  margin-left: auto; 
  margin-right: 18px;
}

@media screen and (max-width: 500px) {
  #toolbar h4,
  #toolbar > div > h4 {
    display: none; 
  }
}


#authors {
  display: flex;
}

.author {
  display: flex;
  flex-direction: column;
  margin: 0 10px 0 10px;
  align-items: center;
}

.author img {
  width: 10em;
  border-radius: 20%;
}

.links {
  display: flex;
}

.links h4 {
  margin: 0 0px 0 5px;
}

#list {
  margin: 0 10em 0em 10em;
}


#bottom-elements {
  display: flex;
  margin-bottom: 1em;
  justify-content: center;
  align-items: center;
}
</style>





<!-- <template>
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
      <br />
      <div id="video-container">
        <video src="../assets/PreVueDemo.mp4" muted autoplay loop></video>
      </div>
      <br />
      <p>
        <strong>
          PreVue allows users to conceptualize and visualize component
          architecture by allowing them to :
        </strong>
      </p>
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
      <br />
      <div class="border">
        <p>
          <strong>
            Use PreVue to create projects in single sessions or sign in with
            GitHub to save projects and update them anytime.</strong
          >
        </p>
      </div>
      <br />
      <h2>How to use:</h2>
      <h4>Adding Components</h4>
      <ul id="list">
        <li>Double click on the application icon</li>
        <li>
          Create components by entering a name and clicking the HTML elements
          you need
        </li>
        <li>Clicked elements will be shown in the right sidebar</li>
        <li>Drag the elements to change their order</li>
        <li>
          Once you're satisfied, click the button to ‘add a component’ and it
          will show up in the working area.
        </li>
        <li>Resize and move components to fit the design you have in mind.</li>
      </ul>
      <br />
      <h4>Editing Components</h4>
      <ul id="list">
        <li>Double click elements to bring up the modal view</li>
        <li>
          Add additional elements to a component with a live preview of the
          component code
        </li>
        <li>Drag elements on the right side bar to nest elements</li>
        <li>
          Establish parent-child component relationships via the dropdown menu
          when creating or editing components
        </li>
      </ul>
      <br />
      <h4>Adding Routes</h4>
      <ul id="list">
        <li>
          Create different routes that represent different Views for your app.
        </li>
        <li>
          Any components created on a given route will be automatically saved to
          that route
        </li>
        <li>
          See a visual representation of your application’s hierarchy by
          clicking the ‘Tree’ icon in the navigation bar
        </li>
      </ul>
      <br />
      <h4>Saving/Opening/Exporting Projects</h4>
      <ul id="list">
        <li>
          If you ever need to save your current project, click the ‘Save
          Project’ icon to save it to PreVue’s database
        </li>
        <li>
          Click ‘Open Project’ to retrieve past projects
        </li>
        <li>
          Once you're satisfied, click the export project icon to export your
          awesome project as new Vue application!
        </li>
      </ul>
      <br />
      <div class="border">
        <h2>PreVue 2.0 Authors</h2>
      </div>
      <br />
      <div id="authors">
        <div class="author">
          <h3>Jason Boo</h3>
          <img src="" />
          <div class="links">
            <h4><a href="https://github.com/jasonboo123">Github</a></h4>
            <h4>
              <a href="https://www.linkedin.com/in/jason-boo/">LinkedIn</a>
            </h4>
          </div>
        </div>
        <div class="author">
          <h3>Robert Drake</h3>
          <img src="../assets/robert-photo.jpeg" />
          <div class="links">
            <h4><a href="https://github.com/rmdrake8">Github</a></h4>
            <h4>
              <a href="https://www.linkedin.com/in/rmdrake8/">LinkedIn</a>
            </h4>
          </div>
        </div>
        <div class="author">
          <h3>Sean Flynn</h3>
          <img src="../assets/sean-photo.jpeg" />
          <div class="links">
            <h4><a href="http://github.com/seanflynn5">Github</a></h4>
            <h4>
              <a href="https://www.linkedin.com/in/sean-g-flynn/">LinkedIn</a>
            </h4>
          </div>
        </div>
        <div class="author">
          <h3>Zach Pestaina</h3>
          <img src="../assets/zach-photo.jpeg" />
          <div class="links">
            <h4><a href="https://github.com/zachpestaina">Github</a></h4>
            <h4>
              <a href="https://www.linkedin.com/in/zachpestaina/">LinkedIn</a>
            </h4>
          </div>
        </div>
      </div>
      <br />
      <h2>
        Please vist PreVue's
        <a href="https://github.com/open-source-labs/PreVue">GitHub</a> if
        you're interested to learn how you can contribute!
      </h2>
      <br />
      <div class="border">
        <div id="bottom-elements">
          <div @click="toHome">
            <h4 id="prevue-link">Try PreVue</h4>
          </div>
          <v-btn width="200px" color="white" class="mt-4" @click="oauth">
            Sign in with GitHub
          </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Splash',

  beforeCreate() {
    fetch('/users/validateSession', {
      credentials: 'include'
      // headers: {
      //   'Access-Control-Allow-Origin': ['localhost:4173']
      // }
    }).then(res => {
      if (res.status === 200) {
        this.toHome();
      }
    });
  },
  methods: {
    oauth() {
      // make request to endpoint, to be redirected in server
      fetch('/users/oauth', {
        method: 'GET',
        redirect: 'follow'

        // headers: { 'Access-Control-Allow-Origin': ['localhost:4173'] }
      })
        .then(res => {
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

video {
  width: 70%;
  height: 70%;
}

#video-container {
  display: flex;
  align-items: center;
  justify-content: center;
}
.scroll {
  height: 120vh;
  overflow-y: auto;
}

#splash {
  background-image: url('../assets/background.jpg');
  background-size: contain;
  background-repeat: repeat;
  background-attachment: fixed;
  font-family: 'Nunito', sans-serif;
  overflow: visible;
  padding: 3em 10em 10em 10em;
  margin-bottom: 10vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

#prevue {
  font-size: xx-large;
  font-family: 'Nunito', sans-serif;
  font-weight: 700;
  font-size: 2.5em;
  color: #39b982;
  text-decoration: none;
}

.border {
  text-align: center;
  padding: 1em;
  color: white;
  background-color: #39b982;
  width: 100vw;
}

#top-elements {
  margin-left: auto;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

#authors {
  display: flex;
}

.author {
  display: flex;
  flex-direction: column;
  margin: 0 10px 0 10px;
  align-items: center;
}

.author img {
  width: 10em;
  border-radius: 20%;
}

.links {
  display: flex;
}

.links h4 {
  margin: 0 0px 0 5px;
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

#bottom-elements {
  display: flex;
  margin-bottom: 1em;
  justify-content: center;
  align-items: center;
}
</style> -->
