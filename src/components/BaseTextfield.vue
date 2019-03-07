<template>
  <div>
    <v-text-field
      :label="label ? label : null"
      maxlength="20"
      append-icon="add"
      @input="updateValue"
      type="text"
      :value="value"
      color="green accent-2"
    />
  </div>
</template>

<script>
export default {
  props: {
    value: [String, Number],
    label: String
  },
  methods: {
    updateValue(event) {
      this.$emit('input', event);
    }
  },
  inheritAttrs: false
};
</script>

<style scoped></style>
