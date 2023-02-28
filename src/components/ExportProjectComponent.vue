<template>
  <!-- <i class="fas fa-file-export fa-lg" @click="exportProject"></i> -->
  <button @click="exportProject">
    <i class="fas fa-file-export fa-lg"></i>

    <br />
    <span class="white--text">Export Project</span>
  </button>
</template>

<script>
import { mapState } from 'vuex';
import fs from 'fs-extra';
import path from 'path';
export default {
  name: 'ExportProjectComponent',
  methods: {
    createRouter() {
      const imports = this.createRouterImports(
        this.componentMap['App'].children
      );
      const initRouter = this.initRouter(this.componentMap['App'].children);
      const exports = 'export default router;';

      const routerFileStr = imports + initRouter + exports;
      return routerFileStr;
    },
    createRouterImports(appChildren) {
      let str = "import * as VueRouter from 'vue-router'\n";
      appChildren.forEach(child => {
        str += `import ${child.componentName} from './views/${child.componentName}.vue'\n`;
      });
      return str;
    },
    initRouter(appChildren) {
      let str = `const router = VueRouter.createRouter({history: VueRouter.createWebHashHistory(), base: import.meta.env.BASE_URL, routes: [\n`;
      appChildren.forEach(child => {
        if (child.componentName === 'HomeView')
          str += `\t\t{\n\t\t\tpath: '/',\n\t\t\tname:'${child.componentName}',\n\t\t\tcomponent:${child.componentName}\n\t\t},\n`;
        else
          str += `\t\t{\n\t\t\tpath: '/${child.componentName}',\n\t\t\tname:'${child.componentName}',\n\t\t\tcomponent: ${child.componentName}\n\t\t},\n`;
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
            str += `\t\t\t<router-link to="/">${name.componentName}</router-link>\n`;
          else
            str += `\t\t\t<router-link to="/${name.componentName}">${name.componentName}</router-link>\n`;
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
        str += `import ${name.componentName} from '@/components/${name.componentName}.vue';\n`;
      });
      let childrenComponentNames = '';
      children.forEach(name => {
        childrenComponentNames += `\t\t${name.componentName},\n`;
      });
      return `\n\n<script>\n${str}\nexport default {\n\tname: '${componentName}',\n\tcomponents: {\n${childrenComponentNames}\t}\n};\n<\/script>`;
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
