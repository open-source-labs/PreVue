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
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <router-link :to="{ name: 'tree' }" class="navbar-item" href="#">
          <i class="fas fa-tree fa-lg"></i>
        </router-link>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <button class="white--text" @click="exportProject">
            EXPORT YOUR PROJECT
          </button>
          <span>
            <v-icon class="save-icon" @click="saveProjectJSON">save_alt</v-icon>
            <span>SAVE</span>
          </span>
          <button class="white--text" @click="openProjectJSON">OPEN</button>
          <i class="fas fa-save fa-lg"></i>

          <i class="fas fa-file-export fa-lg"></i>
          <i class="fas fa-folder-plus fa-lg" @click="addProject"></i>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex';
import fs from 'fs-extra';
import path from 'path';
import { addProject, setState } from '../store/types';
import localforage from 'localforage';

const ipc = require('electron').ipcRenderer;

export default {
  name: 'NavBar',
  props: ['route'],
  methods: {
    addProject() {
      this.$store.dispatch(addProject, 'test');
    },
    exportProject: function() {
      ipc.send('show-export-dialog');
    },
    saveProjectJSON() {
      ipc.send('show-save-json-dialog');
    },
    saveState() {
      const currentState = this.$store.state;
      localforage
        .setItem('state', currentState)
        .then(data => console.log(data));
    },
    openProjectJSON() {
      ipc.send('show-open-dialog');
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
        str += `\t\t<${name}>\n\t\t</${name}>\n`;
      });
      return `<template>\n\t<div>\n${str}\t</div>\n</template>`;
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
          : `#app {\n\tfont-family: 'Avenir', Helvetica, Arial, sans-serif;\n\t-webkit-font-smoothing: antialiased;\n\t-moz-osx-font-smoothing: grayscale;\n\ttext-align: center;\n\tcolor: #2c3e50;\n\tmargin-top: 60px;\n}\n`;
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
      fs.copySync(
        '/Users/Hubert/Desktop/Codesmith/ProductionProject/dev/PreVue/vue-boiler-plate',
        data
      );
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
    ipc.on('json-location', (event, data) => {
      fs.writeFileSync(data, JSON.stringify(this.$store.state, null, 2));
      console.log('PROJECT SAVED AS A JSON OBJECT!');
      // console.log(rdmMsg);
    });
    ipc.on('open-location', (event, data) => {
      this.$store.dispatch(
        setState,
        JSON.parse(fs.readFileSync(data[0], 'utf8'))
      );
    });
  }
};
</script>

<style scoped>
#navbar {
  background-color: #d4d4dc;
  height: 50px;
}

.save-icon:hover {
  cursor: pointer;
}
</style>
