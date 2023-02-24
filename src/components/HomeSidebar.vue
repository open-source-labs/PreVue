<template>
  <v-card>
    <v-card-title class="text-wrap text-h6">
      Create a custom component
    </v-card-title>
    <v-card-actions class="d-block">
      <v-form id="form1" v-on:submit.prevent="handleClick">
        <v-text-field
          v-model="componentNameInputValue"
          variant="solo"
          label="Name your component"
        >
        </v-text-field>
      </v-form>
    </v-card-actions>
    <v-card-actions class="center">
      <Icons />
    </v-card-actions>
    <v-card-actions>
      <ChildrenMultiselect />
    </v-card-actions>
    <v-card-actions class="center">
      <v-btn class="bg-success" id="add-component-btn" @click="handleClick">
        Add Component
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import Icons from './Icons.vue';
import ChildrenMultiselect from '@/components/ChildrenMultiselect.vue';
import { mapState, mapActions } from 'vuex';
import { toRaw } from 'vue';
import * as types from '../store/types.js';

export default {
  name: 'HomeSidebar',
  components: {
    ChildrenMultiselect,
    Icons
  },
  computed: {
    ...mapState([
      'componentMap',
      'selectedElementList',
      'routes',
      'activeRoute'
    ]),
    componentNameInputValue: {
      get() {
        // console.log(
        //   'componentInput',
        //   this.$store.state.componentNameInputValue
        // );
        return this.$store.state.componentNameInputValue;
      },
      set(value) {
        // console.log('value', value);
        this.updateComponentNameInputValue(value);
      }
    }
  },
  methods: {
    ...mapActions([
      'registerComponent',
      'addToSelectedElementList',
      'updateComponentNameInputValue'
    ]),
    // invoked when click "add component" button
    handleClick() {
      console.log('active routes', this.routes[this.activeRoute]); // toRaw?
      const component = {
        componentName: this.componentNameInputValue,
        x: 0,
        y: 0,
        w: 200,
        h: 200,
        htmlList: this.selectedElementList,
        children: [],
        isActive: false
      };

      // console.log('component', component);
      console.log('component (HomeSidebar handleClick)', component);
      this.registerComponent(component);
    }
  }
};
</script>
<style>
.v-label.v-field-label {
  font-size: 0.86rem;
}
.is-primary {
  height: 45px;
}
.center {
  justify-content: center;
}
form {
  /* margin-bottom: 2em; */
}
#add-component-btn {
  /* height: 25px;

  width: 100%; */
}

#form1 {
  /* background-color: white; */
}

.home-sidebar {
  /* background-color: #c8c8c8; */
}
</style>
