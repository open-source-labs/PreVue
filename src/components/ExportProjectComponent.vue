<template>
  <i class="fas fa-file-export fa-lg" @click="exportProject"></i>
</template>

<script>
import { mapState } from 'vuex';
import fs from 'fs-extra';
import path from 'path';
const ipc = require('electron').ipcRenderer;
export default {
  name: 'NewProjectComponent',
  methods: {
    exportProject: function() {
      // console.log(path.join('vue-boiler-plate'));
      ipc.send('show-export-dialog');
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
    ipc.on('export-project-location', (event, data) => {
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

<style></style>
