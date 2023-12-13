<template>
  <div>
    <p class="panel-heading">{{ activeComponent }} Code Display</p>
    <div id="codeDisplay"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'ComponentCodeDisplay',
  computed: {
    ...mapState(['componentMap', 'activeComponent', 'htmlElementMap', 'routes', 'activeRoute', 'componentIndex']),
    activeComponentHtmlList: {
      get() {
       console.log("COMPCODE", this.routes[this.activeRoute][this.componentIndex].htmlList)
       return this.routes[this.activeRoute][this.componentIndex].htmlList

        // return html list associated with active component from state
        return this.componentMap[this.activeComponent].htmlList;
      }
    }
  },
  watch: {
    activeComponentHtmlList: {
      // watching htmlList in state to reactively display any changes as a result of changes made to list in sibling component
      handler(oldList, newList) {
        console.log("CHANGED")
        this.displayHtmlList(newList);
      },
      // dealing with nested objects, hence need deep property
      deep: true
    }
  },
  mounted() {
    // when component is mounted, displays the html list from state associated with active component
    this.displayHtmlList(this.activeComponentHtmlList);
  },
  methods: {
    // parses active component html list in state to create live code display
    traverseElement(list, codeDisplay, level = 0) {
      list.forEach(htmlElementTagObj => {
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
      // renders html list from state associated with active component to the screen
      let codeDisplay = document.querySelector('#codeDisplay');
      codeDisplay.innerText = '';
      this.traverseElement(list, codeDisplay);
    }
  }
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
  background: #3ab982;
}
</style>
