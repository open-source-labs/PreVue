<template>
  <div>
    <span
      class="white--text"
      v-for="(htmlElementTag, idx) in activeComponentHtmlList"
      :key="idx + Date.now()"
    >
      <span v-if="htmlElementTag.children.length > 0">
        {{ htmlElementMap[htmlElementTag.text][0] }}
        <div v-for="(child, idx) in htmlElementTag.children" :key="idx">
          <p class="nested">
            {{ htmlElementMap[child.text][0] }}
            {{ htmlElementMap[child.text][1] }}
          </p>
        </div>
        {{ htmlElementMap[htmlElementTag.text][1] }}
      </span>
      <span v-else>
        {{ htmlElementMap[htmlElementTag.text][0] }}
        {{ htmlElementMap[htmlElementTag.text][1] }}
      </span>
      <br />
    </span>
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
  }
};
</script>

<style scoped>
#component-code-display {
  padding-left: 10px;
}
.nested {
  margin-left: 20px;
}
</style>
