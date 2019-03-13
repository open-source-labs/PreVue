<template>
  <v-toolbar flat app>
    <v-toolbar-title id="nav" class="nav">
      <router-link :to="{ name: 'home' }" class="prevue">
        <span class="white--text">Pre</span>
        <span class="green--text text--accent-2">Vue</span>
      </router-link>
      <router-link :to="{ name: 'tree' }">
        <span id="tree-link" class="purple--text text--accent-2"
          >View Component Tree</span
        >
      </router-link>
      <button class="white--text" @click="exportProject">
        EXPORT YOUR PROJECT
      </button>
      <span>
        <v-icon class="save-icon" @click="saveProjectJSON">save_alt</v-icon>
        <span>SAVE</span>
      </span>
      <button class="white--text" @click="openProjectJSON">OPEN</button>
    </v-toolbar-title>
  </v-toolbar>
</template>

<script>
import { mapState } from 'vuex';
import fs from 'fs-extra';
import path from 'path';

const ipc = require('electron').ipcRenderer;
import { setState } from '../store/types';
import localforage from 'localforage';
import { readFileSync, readFile } from 'fs';
export default {
  name: 'NavBar',
  props: ['route'],
  methods: {
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
    ipc.on('json-location', (event, data) => {
      fs.writeFileSync(data, JSON.stringify(this.$store.state, null, 2));
      console.log('PROJECT SAVED AS A JSON OBJECT!');
      // console.log(rdmMsg);
    });
    ipc.on('open-location', (event, data) => {
      // console.log('READING DATA');
      // console.log(JSON.parse(readFileSync(data[0], 'utf8')));
      this.$store.dispatch(setState, JSON.parse(readFileSync(data[0], 'utf8')));
    });
  }
};
</script>

<style scoped>
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
}
.nav > .prevue {
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 1.5em;
  color: #39b982;
  text-decoration: none;
}

.nav .nav-item {
  box-sizing: border-box;
  margin: 0 5px;
  color: rgba(0, 0, 0, 0.5);
  text-decoration: none;
}

.nav .nav-item.router-link-exact-active {
  color: #39b982;
  border-bottom: solid 2px #39b982;
}

.tree-link {
  float: right;
}

a {
  text-decoration: none;
}

.save-icon:hover {
  cursor: pointer;
}
</style>
