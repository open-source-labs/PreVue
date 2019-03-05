<template>
  <div>
    <span
      class="white--text"
      v-for="htmlCode in componentMap[compName].htmlCode"
      :key="Date.now()"
    >
      {{ htmlCode }}
      <br />
    </span>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'ComponentCodeDisplay',
  props: {
    compName: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState(['componentMap'])
  }
};
</script>

<style>
h1 {
  color: white;
}
</style>
