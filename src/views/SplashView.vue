<template>
  <div class="scroll">
    <div id="splash">
      <!-- html for the navigation bar -->
      <div id="toolbar">
        <!-- left side of nav bar -->
        <div id="toolbar-content">
          <img src="../assets/logo.png" alt="PreVue Logo" id="toolbar-logo" />
            <h1>PreVue</h1>
        </div>
        <!-- right side of nav bar -->
        <div @click="toHome">
          <h3 id="prevue-link">Home</h3>
        </div>
        <div @click="toHome">
          <h3 id="prevue-link">Team</h3>
        </div>
        <div @click="toHome">
          <h3 id="prevue-link">Docs</h3>
        </div>
        <div @click="oauth">
          <h3 id="prevue-link">Sign-In</h3>
        </div>
      </div>


      <!-- html for the first/top panel -->
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

      
     
      
      <!-- html for the second panel -->
      <div class="second-panel">
        <h2>Intuitive & Customizable</h2>
        <p id="subtitle-second-panel">PreVue allows you to easily build intuitive user interfaces and construct pre-built components with hierarchal data flow, seamless drag-and-drop, customizable file exports and more!
        </p>
        <v-btn width="150px" color="white" class="mt-4">
            Learn More
        </v-btn>
      </div>
      


      <!-- html for the third panel -->
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


       <!-- html for the fourth / team contributors panel -->
      <h1 class="prevue-github-panel">PreVue Contributors</h1>
      <!-- PreVue 3.0 Contributors -->
      <div class="authors">
        <!-- Ilay Eskinazi -->
        <div class="author">
          <img src="../assets/ilay-photo.jpg" />
          <h3>Ilay Eskinazi</h3>
          <div class="social-icons-container">
              <a href="https://github.com/jasonboo123">
                  <img class="github" src="../assets/github-icon-white.svg" alt="Github Icon">
              </a>
              <a href="https://www.linkedin.com/in/jason-boo/">
                  <img class="linkedin" src="../assets/linkedin-svg.svg" alt="LinkedIn Icon">
              </a>
          </div>
        </div>
        <!-- Nathan Bornstein -->
        <div class="author">
          <img src="../assets/nathan-photo.jpg" />
          <h3>Nathan Bornstein</h3>
          <div class="social-icons-container">
              <a href="https://github.com/rmdrake8">
                  <img class="github" src="../assets/github-icon-white.svg" alt="Github Icon">
              </a>
              <a href="https://www.linkedin.com/in/rmdrake8/">
                  <img class="linkedin" src="../assets/linkedin-svg.svg" alt="LinkedIn Icon">
              </a>
          </div>
        </div>
        <!-- April Sanders -->
        <div class="author">
          <img src="../assets/april-photo.jpg" />
          <h3>April Sanders</h3>
          <div class="social-icons-container">
              <a href="https://github.com/algorithmrhythm">
                  <img class="github" src="../assets/github-icon-white.svg" alt="Github Icon">
              </a>
              <a href="https://www.linkedin.com/in/aprilshorttsanders/">
                  <img class="linkedin" src="../assets/linkedin-svg.svg" alt="LinkedIn Icon">
              </a>
          </div>
        </div>
        <!-- Cole Jaeger -->
        <div class="author">
          <img src="../assets/cole-photo.jpg" />
          <h3>Cole Jaeger</h3>
          <div class="social-icons-container">
              <a href="https://github.com/zachpestaina">
                  <img class="github" src="../assets/github-icon-white.svg" alt="Github Icon">
              </a>
              <a href="https://www.linkedin.com/in/zachpestaina/">
                  <img class="linkedin" src="../assets/linkedin-svg.svg" alt="LinkedIn Icon">
              </a>
          </div>
        </div>
      </div>
      
      <!-- PreVue 2.0 Contributors -->
      <div class="authors">
        <!-- Jason Boo -->
        <div class="author">
          <img src="../assets/jason-photo.jpg" />
          <h3>Jason Boo</h3>
          <div class="social-icons-container">
              <a href="https://github.com/jasonboo123">
                  <img class="github" src="../assets/github-icon-white.svg" alt="Github Icon">
              </a>
              <a href="https://www.linkedin.com/in/jason-boo/">
                  <img class="linkedin" src="../assets/linkedin-svg.svg" alt="LinkedIn Icon">
              </a>
          </div>
        </div>
        <!-- Robert Drake -->
        <div class="author">
          <img src="../assets/robert-photo.jpeg" />
          <h3>Robert Drake</h3>
          <div class="social-icons-container">
              <a href="https://github.com/rmdrake8">
                  <img class="github" src="../assets/github-icon-white.svg" alt="Github Icon">
              </a>
              <a href="https://www.linkedin.com/in/rmdrake8/">
                  <img class="linkedin" src="../assets/linkedin-svg.svg" alt="LinkedIn Icon">
              </a>
          </div>
        </div>
        <!-- Sean Flynn -->
        <div class="author">
          <img src="../assets/sean-photo.jpeg" />
          <h3>Sean Flynn</h3>
          <div class="social-icons-container">
              <a href="https://github.com/seanflynn5">
                  <img class="github" src="../assets/github-icon-white.svg" alt="Github Icon">
              </a>
              <a href="https://www.linkedin.com/in/sean-g-flynn/">
                  <img class="linkedin" src="../assets/linkedin-svg.svg" alt="LinkedIn Icon">
              </a>
          </div>
        </div>
        <!-- Zach Pestaina -->
        <div class="author">
          <img src="../assets/zach-photo.jpeg" />
          <h3>Zach Pestaina</h3>
          <div class="social-icons-container">
              <a href="https://github.com/zachpestaina">
                  <img class="github" src="../assets/github-icon-white.svg" alt="Github Icon">
              </a>
              <a href="https://www.linkedin.com/in/zachpestaina/">
                  <img class="linkedin" src="../assets/linkedin-svg.svg" alt="LinkedIn Icon">
              </a>
          </div>
        </div>
      </div>

      <div class="prevue-github-panel">
        <h3>
        PreVue is an open source tool and has room for more features. We welcome contributors!
        </h3>
      </div>
      <div id="see-prevue-button" class="prevue-github-panel">
      <v-btn @click="toGithub" width="250px" color="white" class="mt-4">
            See PreVue on Github
      </v-btn>
      </div>
      
      
      <!-- html for the fifth / bottom / community panel -->
      <div class="border">
        <h4 id="community">
        Community
        </h4> 
        <p class="community-hyperlinks">
            <a href="https://github.com/oslabs-beta/PreVue3.0">GitHub</a>
        </p>
        <p class="community-hyperlinks">
            <a href="https://www.linkedin.com/company/prevue-live/">LinkedIn</a>
        </p>
        <p class="community-hyperlinks">
            <a href="https://twitter.com/prevue_oslabs">Twitter</a>
        </p>
        <p class="community-hyperlinks">
            <a href="">Medium</a>
        </p>
        <p class="community-hyperlinks">
            <a href="">Product Hunt</a>
        </p>
      </div>

    </div>
  </div>
</template>



<script>
export default {
  name: 'Splash',

  methods: {
    toHome() {
      this.$router.push('/home');
    },
    oauth() {
      // Redirect the client to the backend OAuth endpoint
      window.location.href = '/users/oauth';
      // After redirecting, call validateSession to check if the user is authenticated
      this.validateSession();
    },
    validateSession() {
      fetch('/users/validateSession', {
        method: 'GET',
        credentials: 'include' // Ensures cookies are sent with the request
      })
        .then(res => {
          if (res.status === 200) {
            // User is authenticated
            this.toHome();
          } else {
            // User is not authenticated;
            // Handle the unauthenticated case as needed
          }
        })
        .catch(err => {
          // Handle any errors, such as network issues
          console.error('Error validating session:', err);
        });
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
.scroll {
  height: 120vh;
  overflow-y: auto;
}

#splash {
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




/************ css for the navigation bar ***********/
#toolbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 70px;
  display: flex;
  align-items: center;
  /* justify-content: flex-end;  */
  background-color: white;
  border-bottom: 1px solid lightgrey;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 8px; 
  z-index: 1;
  font-size: 18px;
}

#toolbar-content {
  display: flex;
  align-items: center;
  margin-right: auto;
}

#toolbar-content h2 {
  color: blue;
  margin: 0;
  box-sizing: border-box;
}

#toolbar-logo {
  width: 60px;
  height: 60px;
  margin-right: auto; 
}

/* targeting the prevue-link id elements, could use that instead */
#toolbar h3,
#toolbar > div > h3 {
  margin: 0;
  margin-left: auto; 
  margin-right: 18px;
}

#prevue-link:hover {
  color: green;
  cursor: pointer;
}

@media screen and (max-width: 500px) {
  #toolbar h4,
  #toolbar > div > h4 {
    display: none; 
  }
}


/*********** css for the first/top panel ***********/

#header-container {
  display: flex;
  justify-content: space-between;
  width: 100vw;
  padding-bottom: 115px;
  padding-top: 120px;
  background: linear-gradient(to bottom, transparent 60%, #39b982 100%)
}

#header-content {
  display: flex;
  align-items: center;
  padding: 50px;
  padding-bottom:90px;
}

.header-text {
  text-align: center;
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

#subtitle {
  font-size: 1.4rem;
  font-weight: 300;
  color: #555; 
}

#video-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

video {
  width: 90%;
  height: auto; 
  border-radius: 9px; 
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
  overflow: hidden;
}



/*********** css for the second panel ***********/
.second-panel {
  text-align: center;
  padding: 1em;
  padding-top: 130px;
  padding-bottom: 175px;
  color: white;
  background: #39b982;
  width: 100vw;
  font-family: 'Open Sans';
  font-size: 1.5rem;
  box-shadow: inset 0 -10px 10px -10px rgba(0, 0, 0, 0.7);
}

#subtitle-second-panel {
  display: flex;
  justify-content: center;
  font-size: 1.7rem;
  font-weight: 500;
  font-family: 'Assistant', sans-serif;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 300px;
  padding-right: 300px;
  
}


/*********** css for the third panel ***********/
#third-panel-container {
  display: flex;
  justify-content: space-between;
  width: 100vw;
  padding-bottom: 100px;
  padding-top: 100px;
  background: white;
  box-shadow: inset 0 -10px 10px -10px rgba(0, 0, 0, 0.9);
}

#third-panel-header {
  font-family: 'Open Sans';
  font-size: 2rem;
  padding-bottom: 1vw;
  padding-right: 100px;
  padding-left: 100px;
  text-decoration: none;
  text-align: right;
  background: linear-gradient(to right, #044c49, #0dbd27); 
  -webkit-background-clip: text; /* For Safari/Chrome/iOS -- need to get clarity on what this does*/
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

/*********** css for the fourth / team contributors panel ***********/

.prevue-github-panel {
  display: flex;
  justify-content: center;
  padding-bottom: 10px;
  background: linear-gradient(to left, #39b982, #0e7d78); 
  color : white;
  width: 150%;
  box-sizing: border-box;
}
.authors {
  display: flex;
  justify-content: center;
  padding-bottom: 40px;
  background: linear-gradient(to left, #39b982, #0e7d78); 
  color : white;
  width: 150%;
  box-sizing: border-box;
}
.author {
  display: flex;
  flex-direction: column;
  margin: 0 10px 0 10px;
  padding: 30px;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 10%;
  border: 1px solid rgba(255, 255, 255, 0.5); 
  transition: background-color 0.2s ease;
}
.author:hover {
  background-color: rgba(255, 255, 255, 0.5); 
}
.author img {
  width: 10em;
  border-radius: 50%;
  padding-bottom: 15px;
  box-shadow: 0 -10px 10px -10px rgba(0, 0, 0, 0.7);
}

.social-icons-container {
  display: flex;
  align-items: center;
}

.linkedin {
  height: 50px;
  box-shadow: none !important;
  padding-top: 8px;
}

.github {
  box-shadow: none !important;
  padding-top: 8px;
  margin-right: -125px; /* Add margin-right for spacing - find a better way to do this */
  height: 55px;
}

.linkedin:hover, .github:hover {
  cursor: pointer;
}

#see-prevue-button {
  padding-bottom: 60px;
}




/*********** css for the fifth / bottom / community panel ***********/

.border {
  text-align: center;
  padding: 1em;
  width: 100vw;
}

#community {
  color: inherit;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 15px;
  padding-top: 20px;
}
.community-hyperlinks a {
  color: inherit;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 10px;
  font-size: 14px;
}
h1.prevue-github-panel {
  display: flex;
  justify-content: center;
  padding-top:85px;
  padding-bottom: 30px;
  background: linear-gradient(to left, #39b982, #0e7d78); 
  color : white;
  width: 150%;
  box-sizing: border-box;
}
</style>