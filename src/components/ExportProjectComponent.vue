<template>
  <!-- <i class="fas fa-file-export fa-lg" @click="exportProject"></i> -->
  <button @click="exportProject">
    <i class="fas fa-file-export fa-lg"></i>

    <br>
    <span class="white--text">Export Project</span>
  </button>
</template>

<script>
import { mapState } from 'vuex';
const { remote } = require('electron');
import fs from 'fs-extra';
import path from 'path';
const ipc = require('electron').ipcRenderer;
export default {
  name: 'ExportProjectComponent',
  methods: {
    exportProject: function() {
      ipc.send('show-export-dialog');
    },
    createRouter(location) {
      fs.writeFileSync(
        path.join(location, 'src', 'router.js'),
        this.createRouterImports(this.componentMap['App'].children) +
          '\nVue.use(Router);\n' +
          this.createExport(this.componentMap['App'].children)
      );
    },
    createRouterImports(appChildren) {
      let str = "import Vue from 'vue'\nimport Router from 'vue-router'\n";
      appChildren.forEach(child => {
        str += `import ${child.componentName} from './views/${
          child.componentName
        }.vue'\n`;
      });
      return str;
    },
    createExport(appChildren) {
      let str =
        "export default new Router({\n\tmode: 'history',\n\tbase: process.env.BASE_URL,\n\troutes: [\n";
      appChildren.forEach(child => {
        if (child.componentName === 'HomeView')
          str += `\t\t{\n\t\t\tpath: '/',\n\t\t\tname:'${
            child.componentName
          }',\n\t\t\tcomponent:${child.componentName}\n\t\t},\n`;
        else
          str += `\t\t{\n\t\t\tpath: '/${child.componentName}',\n\t\t\tname:'${
            child.componentName
          }',\n\t\t\tcomponent: ${child.componentName}\n\t\t},\n`;
      });
      str += `\t]\n})\n`;
      return str;
    },
    createComponentCode(componentLocation, componentName, children) {
      if (componentName === 'App') {
        fs.writeFileSync(
          componentLocation + '.vue',
          this.writeTemplate(componentName, children) +
            this.writeStyle(componentName)
        );
      } else {
        fs.writeFileSync(
          componentLocation + '.vue',
          this.writeTemplate(componentName, children) +
            this.writeScript(componentName, children) +
            this.writeStyle(componentName)
        );
      }
    },
    writeTemplate(compName, children) {
      let str = '';
      if (compName === 'App') {
        str += `<div id="app">\n\t\t<div id="nav">\n`;
        children.forEach(name => {
          if (name === 'HomeView')
            str += `\t\t\t<router-link to="/">${
              name.componentName
            }</router-link>\n`;
          else
            str += `\t\t\t<router-link to="/${name.componentName}">${
              name.componentName
            }</router-link>\n`;
        });
        str += '\t\t\t<router-view></router-view>\n\t\t</div>\n';
      } else {
        str += `<div>\n`;
        children.forEach(name => {
          str += `\t\t<${name.componentName}>\n\t\t</${name.componentName}>\n`;
        });
      }

      return `<template>\n\t${str}\t</div>\n</template>`;
    },
    writeScript(componentName, children) {
      let str = '';
      children.forEach(name => {
        str += `import ${name.componentName} from '@/components/${
          name.componentName
        }.vue';\n`;
      });
      let childrenComponentNames = '';
      children.forEach(name => {
        childrenComponentNames += `\t\t${name.componentName},\n`;
      });
      return `\n\n<script>\n${str}\nexport default {\n\tname: '${componentName}',\n\tcomponents: {\n${childrenComponentNames}\t}\n};\n<\/script>`;
    },
    writeStyle(componentName) {
      let style =
        componentName !== 'App'
          ? ''
          : `#app {\n\tfont-family: 'Avenir', Helvetica, Arial, sans-serif;\n\t-webkit-font-smoothing: antialiased;\n\t-moz-osx-font-smoothing: grayscale;\n\ttext-align: center;\n\tcolor: #2c3e50;\n\tmargin-top: 60px;\n}\n`;
      return `\n\n<style scoped>\n${style}</style>`;
    },
    createIndexFile(location) {
      let str = `<!DOCTYPE html>\n<html lang="en">\n\n<head>`;
      str += `\n\t<meta charset="utf-8">`;
      str += `\n\t<meta http-equiv="X-UA-Compatible" content="IE=edge">`;
      str += `\n\t<meta name="viewport" content="width=device-width,initial-scale=1.0">`;
      str += `\n\t<link rel="icon" href="<%= BASE_URL %>favicon.ico">`;
      str += `\n\t<title>vue-boiler-plate-routes</title>`;
      str += `\n</head>\n\n`;
      str += `<body>`;
      str += `\n\t<noscript>`;
      str += `\n\t\t<strong>We're sorry but vue-boiler-plate-routes doesn't work properly without JavaScript enabled. Please enable it
      to continue.</strong>`;
      str += `\n\t</noscript>`;
      str += `\n\t<div id="app"></div>`;
      str += `\n\t<!-- built files will be auto injected -->`;
      str += `\n</body>\n\n`;
      str += `</html>\n`;
      fs.writeFileSync(path.join(location, 'public', 'index.html'), str);
    },
    createMainFile(location) {
      let str = `import Vue from 'vue'`;
      str += `\nimport App from './App.vue'`;
      str += `\nimport router from './router'`;
      str += `\n\nVue.config.productionTip = false`;
      str += `\n\nnew Vue({`;
      str += `\n\trouter,`;
      str += `\n\trender: h => h(App)`;
      str += `\n}).$mount('#app')`;
      fs.writeFileSync(path.join(location, 'src', 'main.js'), str);
    },
    createBabel(location) {
      let str = `module.exports = {`;
      str += `\n\tpresets: [`;
      str += `\n\t\t'@vue/app'`;
      str += `\n\t]`;
      str += `\n}`;
      fs.writeFileSync(path.join(location, 'babel.config.js'), str);
    },
    createPackage(location) {
      let str = `{`;
      str += `\n\t"name": "vue-boiler-plate-routes",`;
      str += `\n\t"version": "0.1.0",`;
      str += `\n\t"private": true,`;
      str += `\n\t"scripts": {`;
      str += `\n\t\t"start": "vue-cli-service serve",`;
      str += `\n\t\t"build": "vue-cli-service build",`;
      str += `\n\t\t"lint": "vue-cli-service lint"`;
      str += `\n\t},`;
      str += `\n\t"dependencies": {`;
      str += `\n\t\t"vue": "^2.6.6",`;
      str += `\n\t\t"vue-router": "^3.0.1"`;
      str += `\n\t},`;
      str += `\n\t"devDependencies": {`;
      str += `\n\t\t"@vue/cli-plugin-babel": "^3.5.0",`;
      str += `\n\t\t"@vue/cli-plugin-eslint": "^3.5.0",`;
      str += `\n\t\t"@vue/cli-service": "^3.5.0",`;
      str += `\n\t\t"babel-eslint": "^10.0.1",`;
      str += `\n\t\t"eslint": "^5.8.0",`;
      str += `\n\t\t"eslint-plugin-vue": "^5.0.0",`;
      str += `\n\t\t"vue-template-compiler": "^2.5.21"`;
      str += `\n\t},`;
      str += `\n\t"eslintConfig": {`;
      str += `\n\t\t"root": true,`;
      str += `\n\t\t"env": {`;
      str += `\n\t\t\t"node": true`;
      str += `\n\t\t},`;
      str += `\n\t\t"extends": [`;
      str += `\n\t\t\t"plugin:vue/essential",`;
      str += `\n\t\t\t"eslint:recommended"`;
      str += `\n\t\t],`;
      str += `\n\t\t"rules": {},`;
      str += `\n\t\t"parserOptions": {`;
      str += `\n\t\t\t"parser": "babel-eslint"`;
      str += `\n\t\t}`;
      str += `\n\t},`;
      str += `\n\t"postcss": {`;
      str += `\n\t\t"plugins": {`;
      str += `\n\t\t\t"autoprefixer": {}`;
      str += `\n\t\t}`;
      str += `\n\t},`;
      str += `\n\t"browserslist": [`;
      str += `\n\t\t"> 1%",`;
      str += `\n\t\t"last 2 versions",`;
      str += `\n\t\t"not ie <= 8"`;
      str += `\n\t]`;
      str += `\n}`;
      fs.writeFileSync(path.join(location, 'package.json'), str);
    }
  },
  computed: {
    ...mapState(['componentMap'])
  },
  mounted() {
    ipc.on('export-project-location', (event, data) => {
      if (!fs.existsSync(data)) {
        fs.mkdirSync(data);
        console.log('FOLDER CREATED!');
        fs.mkdirSync(path.join(data, 'public'));
        fs.mkdirSync(path.join(data, 'src'));
        fs.mkdirSync(path.join(data, 'src', 'assets'));
        fs.mkdirSync(path.join(data, 'src', 'components'));
        fs.mkdirSync(path.join(data, 'src', 'views'));
      }
      // fs.copySync(
      //   path.join(remote.app.getAppPath(), '../vue-boiler-plate-routes/'),
      //   data
      // );
      // .then(() => console.log('success!'))
      // .catch(err => console.err(err));
      this.createIndexFile(data);
      this.createMainFile(data);
      this.createBabel(data);
      this.createPackage(data);

      this.createRouter(data);
      for (let componentName in this.componentMap) {
        if (componentName !== 'App') {
          if (this.$store.state.routes[componentName]) {
            this.createComponentCode(
              path.join(data, 'src', 'views', componentName),
              componentName,
              this.componentMap[componentName].children
            );
          } else {
            this.createComponentCode(
              path.join(data, 'src', 'components', componentName),
              componentName,
              this.componentMap[componentName].children
            );
          }
        } else {
          this.createComponentCode(
            path.join(data, 'src', componentName),
            componentName,
            this.componentMap[componentName].children
          );
        }
      }
    });
  }
};
</script>

<style></style>
