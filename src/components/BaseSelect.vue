<template>
  <div>
    <label class="white--text" v-if="label">{{ label }}</label>
    <v-select
      :outline="true"
      :value="value"
      v-bind="$attrs"
      @change="updateValue"
      :items="options"
    ></v-select>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    options: {
      type: Array,
      required: true
    },
    value: [String, Number],
    label: String
  },

  methods: {
    updateValue(event) {
      console.log(event);
      this.$emit('input', event);
    }
  }
};
</script>

<style></style>
