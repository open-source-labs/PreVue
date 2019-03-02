<template>
  <v-btn
    large
    depressed
    class="green accent-2"
    :disabled="componentName ? false : true"
    v-on="$listeners"
  >
    <span>{{ name }}</span>
    <v-icon small right>{{ icon }}</v-icon>
  </v-btn>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    componentName: [String],
    name: [String],
    icon: [String]
  }
};
</script>

<style scoped></style>
