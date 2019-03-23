<template>
  <div class="columns">
    <aside class="column is-3 aside hero is-fullheight" id="aside">
      <!-- <div class="column is-fullheight" id="add-component"> -->
      <EditSidebar class="home-sidebar" />
      <!-- </div> -->
    </aside>

    <div class="column is-6 hero is-fullheight">
      <ComponentCodeDisplay class="component-code-display" />
    </div>
    <div class="column is-3 aside hero is-fullheight">
      <EditQueue class="home-queue" />
    </div>
  </div>
</template>

<script>
import ComponentCodeDisplay from '@/components/ComponentCodeDisplay.vue';
import EditSidebar from '@/components/EditSidebar';
import EditQueue from '@/components/EditQueue';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Home',
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
    //   convert() {
    //     console.log('CONVERT CALLED');
    //     let list = this.componentMap[this.activeComponent].htmlList;
    //     console.log(list);
    //     this.parseAndDelete(list);
    //   },
    //   parseAndDelete(htmlList) {
    //     htmlList.forEach(element => {
    //       if (element.children.length > 0) {
    //         console.log('in recurse');
    //         this.parseAndDelete(element.children);
    //       }
    //       delete element._vm;
    //       delete element.parent;
    //       delete element.open;
    //       delete element.active;
    //       delete element.style;
    //       delete element.class;
    //       delete element.innerStyle;
    //       delete element.innerClass;
    //       delete element.innerBackStyle;
    //       delete element.innerBackClass;
    //     });
    //   }
  }
};
</script>

<style scoped>
.component-code-display,
.home-queue {
  background-color: #393f4d;
  height: 100%;
}

#aside {
  background-color: #d4d4dc;
  height: 100%;
  padding-right: 0;
}

#route-display {
  background-color: #393f4d;
  height: 100%;
  /* width: 100%; */
  padding: 0;
}

#add-component {
  border: 1px solid #d1bfa7;
  height: 100%;
  background-color: #d4d4dc;
}
</style>
