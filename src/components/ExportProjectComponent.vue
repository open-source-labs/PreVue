<template>
  <!--exports the project as a zip file that includes your project code-->
  <v-btn class="export-btn" @click="onClick">
    <br />
    <span class="white--text">Export Project</span>
  </v-btn>
</template>

<script>
import { mapState } from 'vuex';
import JSZip from '@progress/jszip-esm';
import { saveAs } from 'file-saver';

export default {
  name: 'ExportProjectComponent',
  // below methods build boilerplate files and folders to be exported for further development
  methods: {
    createRouter() {
      // builds complete router file
      const imports = this.createRouterImports(
        this.componentMap['App'].children
      );
      const initRouter = this.initRouter(this.componentMap['App'].children);
      const exports = 'export default router;';

      const routerFileStr = imports + initRouter + exports;
      return routerFileStr;
    },
    createRouterImports(appChildren) {
      // parses user input and generates imports for router file
      let str = "import * as VueRouter from 'vue-router'\n";
      appChildren.forEach(child => {
        child = child.replace(/\s/g, '');
        str += `import ${child} from './views/${child}.vue'\n`;
      });
      return str;
    },
    initRouter(appChildren) {
      // parses user input and generates paths for router file
      let str = `const router = VueRouter.createRouter({history: VueRouter.createWebHashHistory(), base: import.meta.env.BASE_URL, routes: [\n`;
      appChildren.forEach(child => {
        child = child.replace(/\s/g, '');
        if (child === 'HomeView')
          str += `\t\t{\n\t\t\tpath: '/',\n\t\t\tname:'${child}',\n\t\t\tcomponent:${child}\n\t\t},\n`;
        else
          str += `\t\t{\n\t\t\tpath: '/${child}',\n\t\t\tname:'${child}',\n\t\t\tcomponent: ${child}\n\t\t},\n`;
      });
      str += `\t]\n})\n`;
      return str;
    },
    parseHtmlList(array) {
      let string = '';
      array.forEach(element => {
        string += `\t\t<${element.text}>\n`;
        if (element.children.length > 0) {
          string += this.parseHtmlList(element.children, string);
        }
        string += `\t\t</${element.text}>\n`;
      });
      return string;
    },
    createComponentCode(componentName, children, htmlList) {
      let component;
      if (componentName === 'App') {
        component = this.writeTemplate(componentName, children, htmlList);
      } else {
        component =
          this.writeTemplate(componentName, children, htmlList) +
          this.writeScript(componentName, children);
      }
      return component;
    },
    writeTemplate(compName, children, htmlList) {
      let str = '';
      if (compName === 'App') {
        str += `<div id="app">\n\t\t<div id="nav">\n`;
        children.forEach(name => {
          if (name === 'HomeView')
            str += `\t\t\t<router-link to="/">${name}</router-link>\n`;
          else
            str += `\t\t\t<router-link to="/${name}">${name}</router-link>\n`;
        });
        str += '\t\t\t<router-view></router-view>\n\t\t</div>\n';
      } else {
        str += `<div>\n`;
        children.forEach(name => {
          str += `\t\t<${name}>\n\t\t</${name}>\n`;
        });
        if (htmlList !== undefined) {
          str += this.parseHtmlList(htmlList);
        }
      }

      return `<template>\n\t${str}\t</div>\n</template>`;
    },
    writeScript(componentName, children) {
      let str = '';
      children.forEach(name => {
        if (typeof name === 'string') {
          name = name.replace(/\s/g, '');
          str += `import ${name} from '@/components/${name}.vue';\n`;
        }
      });
      let childrenComponentNames = '';
      children.forEach(name => {
        if (typeof name === 'string') {
          name = name.replace(/\s/g, '');
          childrenComponentNames += `\t\t${name},\n`;
        }
      });
      return `\n\n<script>\n${str}\nexport default {\n\tname: '${componentName.replace(
        /\s/g,
        ''
      )}',\n\tcomponents: {\n${childrenComponentNames}\t}\n};\n<\/script>`;
    },

    // creating files for static files
    writePackages() {
      let str =
        '{ \n\t"name": "vue-boiler-plate-routes",  \n\t"private": true,  \n\t"version": "0.1.0",  \n\t"scripts": {  \n\t\t"dev": "vite", \n\t\t"build": "vite build", \n\t\t"serve": "vite preview" \n\t}, \n\t"dependencies": {\n\t\t"vite": "^2.5.4",\n\t\t"vue": "^3.2.47",\n\t\t"vue-router": "^4.1.6"\n\t},\n\t"devDependencies": {\n\t\t"@vitejs/plugin-vue": "^1.6.1"\n\t},\n\t"main": "./src/main.js"\n\t}';
      return str;
    },
    writeMain() {
      let str =
        "import { createApp } from 'vue';\nimport App from './App.vue';\nimport router from './router';\nconst app = createApp(App);\napp.use(router);\napp.mount('#app');";
      return str;
    },
    writeConfig() {
      let str =
        "import { defineConfig } from 'vite';\n import vue from '@vitejs/plugin-vue';\nconst path = require('path');\nexport default defineConfig({\n\tplugins: [vue()],\n\tresolve: {\n\t\talias: {\n\t\t\t'@': path.resolve(__dirname, './src'),\n\t\t},\n\t},\n});";
      return str;
    },
    writeIndex() {
      let str = `<!DOCTYPE html>\n<html lang=\"en\">\n\t<head>\n\t\t<meta charset=\"utf-8\" />\n\t\t<meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\" />\n\t\t<meta name=\"viewport\" content=\"width=device-width,initial-scale=1.0\" />\n\t\t<link rel=\"icon\" href=\"/favicon.ico\" />\n\t\t<title>vue-boiler-plate-route</title>\n\t</head>\n\t\n\t<body>\n\t\t<noscript>\n\t\t<strong\n\t\t>We\'re sorry but vue-boiler-plate-routes doesn\'t work properly without\n\t\t\tJavaScript enabled. Please enable it to continue.</strong\n\t\t\t>\n\t\t</noscript>\n\t\t<div id=\"app\"></div>\n\t\t<!--builtfileswillbeautoinjected-->\n\t\n\t\<script type=\"module\" src=\"/src/main.js\"><\/script>\n\t</body>\n</html>`;
      return str;
    },
    onClick() {
      const zip = new JSZip();
      const project = this.$store.state.editedProjectName;
      console.log(project)
      zip.folder(`${project}`);
      zip.folder(`${project}/public`);
      zip.folder(`${project}/src`);
      zip.folder(`${project}/src/components`);
      zip.folder(`${project}/src/views`);

      const index = this.writeIndex();

      zip.file(`${project}/public/index.html`, index);
      const packages = this.writePackages();
      zip.file(`${project}/package.json`, packages);
      const main = this.writeMain();
      zip.file(`${project}/src/main.js`, main);
      const config = this.writeConfig();
      zip.file(`${project}/vite.config.js`, config);

      const router = this.createRouter();
      zip.file(`${project}/src/router.js`, router);

      for (let componentName in this.componentMap) {
        let component;
        if (componentName !== 'App') {
          if (this.$store.state.routes[componentName]) {
            component = this.createComponentCode(
              componentName,
              this.componentMap[componentName].children,
              this.componentMap[componentName].htmlList
            );
            zip.file(
              `${project}/src/views/${componentName.replace(/\s/g, '')}.vue`,
              component
            );
          } else {
            component = this.createComponentCode(
              componentName,
              this.componentMap[componentName].children,
              this.componentMap[componentName].htmlList
            );
            zip.file(
              `${project}/src/components/${componentName.replace(
                /\s/g,
                ''
              )}.vue`,
              component
            );
          }
        } else {
          component = this.createComponentCode(
            componentName,
            this.componentMap[componentName].children,
            this.componentMap[componentName].htmlList
          );
          zip.file(`${project}/src/${componentName}.vue`, component);
        }
      }

      zip.generateAsync({ type: 'blob' }).then(function(content) {
        saveAs(content, `${project}.zip`);
      });
    }
  },
  computed: {
    ...mapState(['componentMap']),
    projectName: {
      get() {
        return this.$store.state.projectName;
      }
    }
  }
};
</script>

<style scoped>
.white--text {
  font-weight: 700;
}

.white--text:hover {
  color: #39b982;
}
</style>
