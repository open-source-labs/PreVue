<template>
  <!--the entire modal view with respective components rendered in it-->
  <v-container id="modal">
    <v-row>
      <v-col cols="4" class="editSidebar">
        <EditSidebar />
      </v-col>

      <v-col cols="4" class="componentCodeDisplay">
        <ComponentCodeDisplay />
      </v-col>

      <v-col cols="4" class="editQueue">
        <EditQueue />
      </v-col>
    </v-row>
  </v-container>
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
    this.updateComponentChildrenMultiselectValue(this.children);
    this.updateOpenModal(true);
  },
  computed: {
    ...mapState([
      'clickedComponent',
      'componentMap',
      'activeComponent',
      'routes',
      'activeRoute'
    ]),
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
  width: 70vw;
  height: 40vw;
}
</style>
