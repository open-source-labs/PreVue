<template>
  <div>
    <div
      id="component-code-display"
      v-for="(htmlElementTag, idx) in renderHTMLCodeList"
      :key="idx + Date.now()"
    >
      <p class="white--text">{{ htmlElementMap[htmlElementTag] }}</p>
      <br>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'ComponentCodeDisplay',

  computed: {
    ...mapState(['componentMap', 'clickedComponent', 'htmlElementMap']),
    renderHTMLCodeList: {
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
</style>
