<template>
  <div>
    <v-btn
      large
      depressed
      class="green accent-2"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <slot />
    </v-btn>
  </div>
</template>

<script>
export default {
  inheritAttrs: false
};
</script>

<style scoped></style>
