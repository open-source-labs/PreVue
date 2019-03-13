<template>
  <v-toolbar dense id="toolbar">
    <v-toolbar-title id="nav" class="nav">
      <span>
        <v-icon class="save-icon" @click="saveState">save_alt</v-icon>
      </span>
      <button class="white--text" @click="exportProject">
        EXPORT YOUR PROJECT
      </button>
      <v-spacer></v-spacer>
      <router-link :to="{ name: 'tree' }">
        <span id="tree-link" class="purple--text text--accent-2"
          >View Component Tree</span
        >
      </router-link>
      <router-link :to="{ name: 'home' }" class="prevue">
        <span class="white--text">Pre</span>
        <span class="green--text text--accent-2">Vue</span>
      </router-link>
    </v-toolbar-title>
  </v-toolbar>
</template>

<script>
import { mapState } from 'vuex';
import fs from 'fs-extra';
import path from 'path';
// const { remote } = require('electron');
const ipc = require('electron').ipcRenderer;

import localforage from 'localforage';
export default {
  name: 'NavBar',
  props: ['route'],
  methods: {
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
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
}

#toolbar {
  background-color: #393f4d;
}
/* .nav > .prevue {
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
} */

.save-icon:hover {
  cursor: pointer;
}
</style>
