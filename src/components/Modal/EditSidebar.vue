<template>
  <!--renders Icons and childrenMultiSelect in modal view after doubleclicking component-->
  <div class="home-sidebar">
    <p class="panel-heading">Edit {{ activeComponent }}</p>
    <div class="icon-row">
      <Icons @getClickedIcon="addToComponentElementList" />
    </div>
    <ChildrenMultiselect />
  </div>
</template>

<script>
import Icons from '../Icons.vue';
import { mapState } from 'vuex';
import * as types from '../../store/storeTypes';
import ChildrenMultiselect from '@/components/ChildrenMultiselect.vue';
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
    // adds HTML elements to selected component
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

button:hover {
  color: red !important;
}
.panel-heading {
  padding: 10px;
  background-color: darkgray;
}
</style>
