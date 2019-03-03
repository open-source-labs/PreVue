<template>
  <div>
    <label class="white--text" v-if="label">{{ label }}</label>
    <v-select :outline="true" :items="options"></v-select>
  </div>
</template>

<script>
export default {
  name: 'BaseSelect',
  inheritAttrs: false,
  props: {
    options: {
      type: Array,
      required: true
    },
    // value: [String, Number],
    label: String
  },

  methods: {
    updateValue(event) {
      this.$emit('input', event);
    }
  }
};
</script>

<style></style>
