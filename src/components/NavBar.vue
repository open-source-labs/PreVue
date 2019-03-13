<template>
  <nav
    class="navbar"
    id="navbar"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="navbar-brand">
      <router-link :to="{ name: 'home' }" class="navbar-item" href="#">
        <img
          src="https://bulma.io/images/bulma-logo.png"
          width="112"
          height="28"
        />
      </router-link>

      <a
        role="button"
        class="navbar-burger burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <router-link :to="{ name: 'tree' }" class="navbar-item" href="#"
          >Tree</router-link
        >

        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">Projects</a>

          <div class="navbar-dropdown">
            <a class="navbar-item">About</a>
            <a class="navbar-item">Jobs</a>
            <a class="navbar-item">Contact</a>
            <hr class="navbar-divider" />
            <a class="navbar-item">Report an issue</a>
          </div>
        </div>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <a class="button is-primary">
              <strong>Sign up</strong>
            </a>
            <a class="button is-light">Log in</a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex';
import fs from 'fs-extra';
import path from 'path';
const ipc = require('electron').ipcRenderer;

import localforage from 'localforage';
export default {
  name: 'NavBar',
  props: ['route'],
  methods: {
    test() {
      console.log('test');
    },
    exportProject: function() {
      ipc.send('show-dialog');
    },
    saveState() {
      const currentState = this.$store.state;
      localforage
        .setItem('state', currentState)
        .then(data => console.log(data));
    },
    createComponentCode(componentLocation, componentName, children) {
      fs.writeFileSync(
        componentLocation + '.vue',
        this.writeTemplate(children) +
          this.writeScript(componentName, children) +
          this.writeStyle(componentName)
      );
      console.log(children);
    },
    writeTemplate(children) {
      let str = '';
      children.forEach(name => {
        str += `\t<${name}>\n\t</${name}>\n`;
      });
      return `<template>\n${str}</template>`;
    },
    writeScript(componentName, children) {
      let str = '';
      children.forEach(name => {
        str +=
          componentName === 'App'
            ? `import ${name} from '@/components/${name}.vue';\n`
            : `import ${name} from './${name}.vue';\n`;
      });
      let childrenComponentNames = '';
      children.forEach(name => {
        childrenComponentNames += `\t\t${name},\n`;
      });
      return `\n\n<script>\n${str}\nexport default {\n\tname: '${componentName}',\n\tcomponents: {\n${childrenComponentNames}\t}\n};\n<\/script>`;
    },
    writeStyle(componentName) {
      let style =
        componentName !== 'App'
          ? ''
          : `#app {\n\tfont-family: 'Avenir', Helvetica, Arial, sans-serif;\n\t-webkit-font-smoothing: antialiased;\n\t-moz-osx-font-smoothing: grayscale;n\ttext-align: center;\n\tcolor: #2c3e50;\n\tmargin-top: 60px;\n}\n`;
      return `\n\n<style scoped>\n${style}</style>`;
    }
  },
  computed: {
    ...mapState(['componentMap'])
  },
  mounted() {
    ipc.on('project-location', (event, data) => {
      if (!fs.existsSync(data)) {
        fs.mkdirSync(data);
        console.log('FOLDER CREATED!');
      }
      fs.copySync('./../vue-boiler-plate', data);
      for (let componentName in this.componentMap) {
        if (componentName === 'App')
          this.createComponentCode(
            path.join(data, 'src', componentName),
            componentName,
            this.componentMap[componentName].children
          );
        else
          this.createComponentCode(
            path.join(data, 'src', 'components', componentName),
            componentName,
            this.componentMap[componentName].children
          );
      }
    });
  }
};
</script>

<style scoped>
#navbar {
  background-color: palevioletred;
  height: 50px;
}

.save-icon:hover {
  cursor: pointer;
}
</style>
