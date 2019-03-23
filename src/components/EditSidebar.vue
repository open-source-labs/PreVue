<template>
  <div class="home-sidebar">
    <p class="panel-heading">Edit {{ activeComponent }}</p>
    <div class="icon-row">
      <Icons @getClickedIcon="addToComponentElementList"/>
    </div>
    <ChildrenMultiselect/>
  </div>
</template>

<script>
import Icons from './Icons';
import { mapState } from 'vuex';
import * as types from '../store/types.js';
import ChildrenMultiselect from '@/components/ChildrenMultiselect';

export default {
  name: 'EditSidebar',

  components: {
    Icons,
    ChildrenMultiselect
  },
  computed: {
    ...mapState(['activeComponent'])
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
