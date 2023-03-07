<template>
  <!--exports the project as a zip file that includes your project code-->
  <!-- <i class="fas fa-file-export fa-lg" @click="exportProject"></i> -->
  <button @click="onClick">
    <i class="fas fa-file-export fa-lg"></i>

    <br />
    <span class="white--text">Export Project</span>
  </button>
</template>

<script>
import { mapState } from 'vuex';
import JSZip from '@progress/jszip-esm';
import { saveAs } from 'file-saver';
export default {
  name: 'ExportProjectComponent',
  methods: {
    buildDir() {
      const zip = new JSZip();

      zip.folder('project');
      zip.folder('project/public');
      zip.folder('project/src');
      zip.folder('project/src/components');
      zip.folder('project/src/views');
      zip.generateAsync({ type: 'blob' }).then(function(content) {
        saveAs(content, 'example1.zip');
      });
    },
    createRouter() {
      // console.log('appChildren', this.componentMap['App'].children);
      const imports = this.createRouterImports(
        this.componentMap['App'].children
      );
      const initRouter = this.initRouter(this.componentMap['App'].children);
      const exports = 'export default router;';

      const routerFileStr = imports + initRouter + exports;
      console.log(routerFileStr);
      return routerFileStr;
    },
    createRouterImports(appChildren) {
      let str = "import * as VueRouter from 'vue-router'\n";
      appChildren.forEach(child => {
        child = child.replace(/\s/g, '');
        str += `import ${child} from './views/${child}.vue'\n`;
      });
      return str;
    },
    initRouter(appChildren) {
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
    createComponentCode(componentName, children, htmlList) {
      let component;
      if (componentName === 'App') {
        // fs.writeFileSync(
        //   componentLocation + '.vue',
        //   this.writeTemplate(componentName, children) +
        //     this.writeStyle(componentName)
        // );
        console.log(
          'template',
          this.writeTemplate(componentName, children, htmlList)
        );
        component = this.writeTemplate(componentName, children, htmlList);
      } else {
        // fs.writeFileSync(
        //   componentLocation + '.vue',
        //   this.writeTemplate(componentName, children) +
        //     this.writeScript(componentName, children) +
        //     this.writeStyle(componentName)
        // );
        console.log(
          'template',
          this.writeTemplate(componentName, children, htmlList)
        );
        console.log('script', this.writeScript(componentName, children));

        component =
          this.writeTemplate(componentName, children, htmlList) +
          this.writeScript(componentName, children);
      }
      return component;
    },
    writeTemplate(compName, children, htmlList) {
      console.log('children', children);
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
          // accounts for nesting of html elements in a component
          function helper(array) {
            let string = '';
            array.forEach(element => {
              //get stuff from test prop
              string += `\t\t<${element.text}>\n`;
              if (element.children.length > 0) {
                string += helper(element.children, string);
              }
              string += `\t\t</${element.text}>\n`;
            });

            return string;
          }
          // console.log('htmlList', htmlList);
          // htmlList.forEach(element => {

          //   str += `\t\t<${element.text}>\n\t\t</${element.text}>\n`;
          // });
          // console.log('helper', helper(htmlList));
          str += helper(htmlList);
        }
      }

      return `<template>\n\t${str}\t</div>\n</template>`;
    },
    writeScript(componentName, children) {
      let str = '';
      children.forEach(name => {
        name = name.replace(/\s/g, '');
        str += `import ${name} from '@/components/${name}.vue';\n`;
      });
      let childrenComponentNames = '';
      children.forEach(name => {
        name = name.replace(/\s/g, '');
        childrenComponentNames += `\t\t${name},\n`;
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

      zip.folder('project');
      zip.folder('project/public');
      zip.folder('project/src');
      zip.folder('project/src/components');
      zip.folder('project/src/views');

      const index = this.writeIndex();

      zip.file('project/public/index.html', index);
      const packages = this.writePackages();
      zip.file('project/package.json', packages);
      const main = this.writeMain();
      zip.file('project/src/main.js', main);
      const config = this.writeConfig();
      zip.file('project/vite.config.js', config);

      const router = this.createRouter();
      zip.file('project/src/router.js', router);

      // zip.generateAsync({ type: 'blob' }).then(function(content) {
      //   saveAs(content, 'example5.zip');
      // });

      for (let componentName in this.componentMap) {
        let component;
        console.log('compMapObj', this.componentMap[componentName]);
        if (componentName !== 'App') {
          if (this.$store.state.routes[componentName]) {
            component = this.createComponentCode(
              // path.join(data, 'src', 'views', componentName),
              componentName,
              this.componentMap[componentName].children,
              this.componentMap[componentName].htmlList
            );
            zip.file(
              `project/src/views/${componentName.replace(/\s/g, '')}.vue`,
              component
            );
          } else {
            component = this.createComponentCode(
              // path.join(data, 'src', 'components', componentName),
              componentName,
              this.componentMap[componentName].children,
              this.componentMap[componentName].htmlList
            );
            zip.file(
              `project/src/components/${componentName.replace(/\s/g, '')}.vue`,
              component
            );
          }
        } else {
          component = this.createComponentCode(
            // path.join(data, 'src', componentName),
            componentName,
            this.componentMap[componentName].children,
            this.componentMap[componentName].htmlList
          );
          zip.file(`project/src/${componentName}.vue`, component);
        }
      }

      // fetch('http://localhost:3000/templates/index.html')
      //   .then(res => res.arrayBuffer())
      //   .then(data => {
      //     return zip.file('project/public/index.html', data);
      //   })
      //   .then(() => {
      //     zip.generateAsync({ type: 'blob' }).then(function(content) {
      //       saveAs(content, 'example.zip');
      //     });
      //   });

      zip.generateAsync({ type: 'blob' }).then(function(content) {
        saveAs(content, 'example5.zip');
      });
    }
  },
  computed: {
    ...mapState(['componentMap'])
  },
  mounted() {
    // ipc.on('export-project-location', (event, data) => {
    //   if (!fs.existsSync(data)) {
    //     fs.mkdirSync(data);
    //     console.log('FOLDER CREATED!');
    //     fs.mkdirSync(path.join(data, 'public'));
    //     fs.mkdirSync(path.join(data, 'src'));
    //     fs.mkdirSync(path.join(data, 'src', 'components'));
    //     fs.mkdirSync(path.join(data, 'src', 'views'));
    //   }
    // this.createRouter(data);
    // for (let componentName in this.componentMap) {
    //   if (componentName !== 'App') {
    //     if (this.$store.state.routes[componentName]) {
    //       this.createComponentCode(
    //         // path.join(data, 'src', 'views', componentName),
    //         componentName,
    //         this.componentMap[componentName].children
    //       );
    //     } else {
    //       this.createComponentCode(
    //         // path.join(data, 'src', 'components', componentName),
    //         componentName,
    //         this.componentMap[componentName].children
    //       );
    //     }
    //   } else {
    //     this.createComponentCode(
    //       // path.join(data, 'src', componentName),
    //       componentName,
    //       this.componentMap[componentName].children
    //     );
    //   }
    // }
  }
};
</script>

<style></style>
