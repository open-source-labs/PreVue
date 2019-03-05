<template>
  <v-dialog v-model="dialog" hide-overlay persistent width="300">
    <v-card color="primary" dark>
      <v-card-text
        >Please stand by
        <v-progress-linear
          indeterminate
          color="white"
          class="mb-0"
        ></v-progress-linear>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'LoadingBar',
  data() {
    return {
      dialog: false
    };
  },
  created() {
    this.dialog = true;
  },
  props: {
    duration: {
      type: Number,
      required: true
    }
  },
  watch: {
    dialog() {
      setTimeout(() => (this.dialog = false), this.duration);
    }
  }
};
</script>

<style></style>
