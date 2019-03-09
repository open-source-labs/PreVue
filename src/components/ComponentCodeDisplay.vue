<template>
  <div>
    <span
      class="white--text"
      v-for="(htmlElementTag, idx) in renderHTMLCodeList"
      :key="idx + Date.now()"
    >
      {{ htmlElementMap[htmlElementTag] }}
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
    renderHTMLCodeList: {
      get() {
        return this.componentMap[this.clickedComponent].htmlList;
      }
    }
  }
};
</script>

<style>
h1 {
  color: white;
}
</style>
