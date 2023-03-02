<template>
  <div id="modal">
    <div>
      <EditSidebar />
    </div>
    <div>
      <ComponentCodeDisplay />
    </div>
    <div>
      <EditQueue />
    </div>
  </div>
</template>
<script>
import ComponentCodeDisplay from './ComponentCodeDisplay.vue';
import EditSidebar from './EditSidebar.vue';
import EditQueue from './EditQueue.vue';
import { mapState, mapActions } from 'vuex';
export default {
  name: 'Modal',
  components: {
    ComponentCodeDisplay,
    EditSidebar,
    EditQueue
  },
  mounted() {
    console.log('CHILDREN', this.children);
    this.updateComponentChildrenMultiselectValue(this.children);
    console.log('MODAL IS OPEN');
    this.updateOpenModal(true);
  },
  computed: {
    ...mapState([
      'clickedComponent',
      'componentMap',
      'activeComponent',
      'routes'
    ]),
    children() {
      console.log('activeComponent', this.activeComponent);
      return this.componentMap[this.activeComponent].children.reduce(
        (acc, curr) => {
          return acc.concat(curr);
        },
        []
      );
    }
  },
  methods: {
    ...mapActions([
      'updateComponentChildrenMultiselectValue',
      'updateOpenModal'
    ])
  }
};
</script>

<style>
#modal {
  width: 500px;
}
</style>
