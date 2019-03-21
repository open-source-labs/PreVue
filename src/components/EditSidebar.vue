<template>
  <div class="home-sidebar">
    <p class="panel-heading">Edit {{ activeComponent }}</p>
    <div class="icon-row">
      <Icons @getClickedIcon="addToComponentElementList"/>
    </div>
  </div>
</template>

<script>
import Icons from './Icons';
import { mapState } from 'vuex';
import * as types from '../store/types.js';

export default {
  name: 'EditSidebar',

  components: {
    Icons
  },
  computed: {
    ...mapState(['activeComponent', 'componentMap']),
    selectedChildren: {
      get() {
        return this.$store.state.componentMap[this.activeComponent].children;
      },
      set(newArray) {
        const payload = { name: this.activeComponent, newArray };
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
<style scoped>
.icon-row {
  margin-top: 10px;
}
</style>
