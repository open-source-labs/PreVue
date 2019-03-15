<template>
  <div class="home-sidebar">
    <p class="panel-heading">Edit {{ clickedComponent }}</p>

    <Icons @getClickedIcon="addToComponentElementList" />
  </div>
</template>

<script>
import Icons from './Icons';
import { mapState } from 'vuex';
import * as types from '../store/types.js';

export default {
  name: 'TestEditSidebar',

  components: {
    Icons
  },
  computed: {
    ...mapState(['clickedComponent', 'componentMap']),
    selectedChildren: {
      get() {
        return this.$store.state.componentMap[this.clickedComponent].children;
      },
      set(newArray) {
        const payload = { name: this.clickedComponent, newArray };
        this.$store.commit(types.UPDATE_CHILDREN, payload);
      }
    }
  },
  methods: {
    addToComponentElementList(elementName) {
      this.$store.dispatch(types.addToComponentElementList, elementName);
    }
  }
};
</script>
