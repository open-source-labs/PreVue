<template>
  <div>
    <div id="codeDisplay"></div>
    <!-- <span
      class="white--text"
      v-for="(htmlElementName, idx) in activeComponentHtmlList"
      :key="idx + Date.now()"
    >
      <span v-if="htmlElementName.children.length > 0">
        {{ htmlElementMap[htmlElementName.text][0] }}
        <div v-for="(child, idx) in htmlElementName.children" :key="idx">
          <p class="nested">
            {{ htmlElementMap[child.text][0] }}
            {{ htmlElementMap[child.text][1] }}
          </p>
        </div>
        {{ htmlElementMap[htmlElementName.text][1] }}
      </span>
      <span v-else>
        {{ htmlElementMap[htmlElementName.text][0] }}
        {{ htmlElementMap[htmlElementName.text][1] }}
      </span>
      <br />
    </span>-->
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'ComponentCodeDisplay',

  computed: {
    ...mapState(['componentMap', 'clickedComponent', 'htmlElementMap']),
    activeComponentHtmlList: {
      get() {
        return this.componentMap[this.clickedComponent].htmlList;
      }
    }
  },
  watch: {
    activeComponentHtmlList(oldList, newList) {
      this.displayHtmlList(newList);
    }
  },
  mounted() {
    this.displayHtmlList(this.activeComponentHtmlList);
  },
  methods: {
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
          htmlelementNode.innerHTML = '&emsp;'.repeat(level);
          openingTagNode.classList.add('nested');
          openingTagNode.innerHTML = '&emsp;'.repeat(level);
          closingTagNode.classList.add('nested');
          closingTagNode.innerHTML = '&emsp;'.repeat(level);
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
    }
  }
};
</script>

<style scoped>
#component-code-display {
  padding-left: 10px;
}
.nested {
  white-space: pre;
}
</style>
