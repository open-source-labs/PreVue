<template>
  <div>
    <p class="panel-heading">{{ activeComponent }} Code Display</p>
    <div id="codeDisplay"></div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { toRaw } from 'vue';
export default {
  name: 'ComponentCodeDisplay',
  computed: {
    ...mapState(['componentMap', 'activeComponent', 'htmlElementMap']),
    activeComponentHtmlList: {
      get() {
        return this.componentMap[this.activeComponent].htmlList;
      },
    },
  },
  watch: {
    activeComponentHtmlList: {
      handler(oldList, newList) {
        this.displayHtmlList(newList);
      },
      // dealing with nested objects, hence need deep property
      deep: true,
    },
  },
  mounted() {
    console.log(this.htmlList);
    this.displayHtmlList(this.activeComponentHtmlList);
  },
  methods: {
    traverseElement(list, codeDisplay, level = 0) {
      list.forEach((htmlElementTagObj) => {
        let htmlElementMapKey = htmlElementTagObj.text;
        let htmlelementNode = document.createElement('p');
        let openingTagNode = document.createElement('p');
        let closingTagNode = document.createElement('p');
        let openingTag = this.htmlElementMap[htmlElementMapKey][0];
        let closingTag = this.htmlElementMap[htmlElementMapKey][1];
        if (level >= 1) {
          htmlelementNode.classList.add('nested');
          htmlelementNode.innerHTML = '&emsp;'.repeat(level * 2);
          openingTagNode.classList.add('nested');
          openingTagNode.innerHTML = '&emsp;'.repeat(level * 2);
          closingTagNode.classList.add('nested');
          closingTagNode.innerHTML = '&emsp;'.repeat(level * 2);
        }
        if (htmlElementTagObj.children.length === 0) {
          htmlelementNode.innerText += openingTag + closingTag;
          codeDisplay.append(htmlelementNode);
        } else {
          openingTagNode.innerText += openingTag;
          codeDisplay.append(openingTagNode);
          this.traverseElement(
            htmlElementTagObj.children,
            codeDisplay,
            level + 1
          );
          closingTagNode.innerText += closingTag;
          codeDisplay.append(closingTagNode);
        }
      });
    },
    displayHtmlList(list) {
      let codeDisplay = document.querySelector('#codeDisplay');
      codeDisplay.innerText = '';
      this.traverseElement(list, codeDisplay);
    },
  },
};
</script>

<style scoped>
#component-code-display {
  padding: 10px;
}

.panel-heading {
  background-color: darkgray;
  padding: 10px;
}
#codeDisplay {
  padding: 10px;
  background: #3ab982
  /* background: linear-gradient(120deg, #5c258d, #4389a2); */
}
</style>
