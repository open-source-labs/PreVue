<template>
  <div>
    <vue-nestable v-model="test">
      <vue-nestable-handle slot-scope="{ item }" :item="item">
        <h3 class="white--text">{{ item.text }}</h3>
      </vue-nestable-handle>
    </vue-nestable>
    <button @click="logMe" class="white--text">Click</button>
  </div>
</template>

<script>
import { VueNestable, VueNestableHandle } from 'vue-nestable';
export default {
  name: 'Queue',
  methods: {
    logMe() {
      console.log(this.test);
    }
  },
  data() {
    return {
      test: [
        {
          id: 0,
          text: 'div'
        },
        {
          id: 1,
          text: 'button',
          children: [
            {
              id: 2,
              text: 'David'
            }
          ]
        },
        {
          id: 3,
          text: 'Lisa'
        },
        {
          id: 4,
          text: 'Andy'
        },
        {
          id: 5,
          text: 'Harry',
          children: [
            {
              id: 6,
              text: 'David'
            }
          ]
        },
        {
          id: 7,
          text: 'Lisa'
        }
      ]
    };
  },
  components: {
    VueNestable,
    VueNestableHandle
  }
};
</script>

<style></style>
