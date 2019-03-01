<template>
  <div>
    <v-btn
      large
      depressed
      class="green accent-2"
      :disabled="componentName ? false : true"
    >
      <span>{{ name }}</span>
      <v-icon small right>{{ icon }}</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  props: {
    componentName: [String],
    name: [String],
    icon: [String]
  }
};
</script>

<style scoped></style>
