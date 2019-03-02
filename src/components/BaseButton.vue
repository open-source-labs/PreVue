<template>
  <div>
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
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    componentName: [String],
    name: [String],
    icon: [String]
  }
};
</script>

<style scoped></style>
