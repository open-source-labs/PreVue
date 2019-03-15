<template>
  <table class="table is-fullwidth is-scrollable">
    <a class="panel-block" v-for="item in name">
      <span class="panel-icon">
        <i class="fas fa-location-arrow" aria-hidden="true"></i>
      </span>
      {{ item }}
    </a>
  </table>
</template>

<script>
export default {
  name: 'Routes',
  data() {
    return {
      name: ['test', 'test2', 'test3', 'test4', 'test5']
    };
  }
};
</script>
