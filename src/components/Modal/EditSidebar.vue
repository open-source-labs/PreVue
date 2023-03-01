

<template>
  <div class="home-sidebar">
    <p>Edit Sidebar</p>
    <p class="panel-heading">{{ activeComponent }}</p>
    <div class="icon-row">
      <Icons @getClickedIcon="addToComponentElementList" />
    </div>
    <ChildrenMultiselect />
  </div>
</template>

<script>
import Icons from '../Icons.vue';
import { mapState } from 'vuex';
import * as types from '../../store/types.js';
import ChildrenMultiselect from '@/components/ChildrenMultiselect.vue';
export default {
  name: 'EditSidebar',
  components: {
    Icons,
    ChildrenMultiselect,
  },
  computed: {
    ...mapState(['activeComponent', 'modalOpen']),
  },
  methods: {
    addToComponentElementList(elementName) {
      this.$store.dispatch(types.addToComponentElementList, elementName);
    },
    // checkModalOpen() {
    //   console.log(this.modalOpen);
    //   console.log('icon  click with modal open');
    // },
  },
};
</script>
<style scoped>
.icon-row {
  margin-top: 10px;
}
</style>