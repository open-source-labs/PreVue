<template>
  <div>
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
    EditQueue,
  },
};
</script>
