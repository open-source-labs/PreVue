<template>
  <div class="componentDisplay">
    <button class="white--text" @click="consoleCM">
      CLICK TO SEE COMPONENT MAP
    </button>
    <LoadingBar :duration="2000" />
    <VueDragResize
      class="component"
      :isActive="true"
      :w="200"
      :h="200"
      v-on:resizing="resize"
      v-on:dragging="resize"
      v-for="(component, index) in Object.entries(getComponentMap)"
      :key="index"
      :style="{ border: '7px solid ' + getRandomColor() }"
      :snapToGrid="true"
      :gridX="200"
      :gridY="200"
      @clicked="handleClick(component[0])"
    >
      <h3>{{ component[0] }}</h3>
      <p
        v-for="(element, index) in component[1].htmlList"
        :key="index + Date.now()"
      >
        {{ element }}
      </p>
      <p
        v-for="(child, index) in component[1].children"
        :key="index + Date.now() / 2"
      >
        {{ child }}
      </p>

      <!-- <p>{{ width }} х {{ height }}</p> -->
    </VueDragResize>
    <modals-container></modals-container>
    <ComponentModal :modalWidth="800" :modalHeight="900" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import VueDragResize from 'vue-drag-resize';
import LoadingBar from './LoadingBar.vue';
import ComponentModal from './ComponentModal.vue';
import { setComponentMap } from '../store/types';

export default {
  name: 'ComponentDisplay',
  components: {
    VueDragResize,
    LoadingBar,
    ComponentModal
  },
  data() {
    return {
      //might make this an array of objects to correspond to each individual component
      width: 0,
      height: 0,
      top: 0,
      left: 0,
      lastTimeClicked: Date.now(),
      dialog: false,
      showModal: false
    };
  },
  // created() {
  // window.addEventListener('keyup', event => {
  //   console.log(event.key);
  //   if (event.key === 'Backspace') {
  //     if (
  //       this.$store.state.componentMap[this.$store.state.clickedComponent] &&
  //       this.$store.state.clickedComponentToDelete
  //     ) {
  //       console.log(this.$store.state.clickedComponent, ' WILL BE DELETED');
  //       this.$store.dispatch('deleteClickedComponent');
  //     }
  //   }
  // });
  // },
  computed: {
    ...mapState(['componentMap']),
    getComponentMap: {
      get() {
        return this.componentMap;
      },
      set(value) {
        this.$store.dispatch(setComponentMap, value);
      }
    }
  },
  methods: {
    resize(newRect) {
      this.width = newRect.width;
      this.height = newRect.height;
      this.top = newRect.top;
      this.left = newRect.left;
    },
    getRandomColor() {
      var letters = '0123456789ABCDEF';
      var color = '#';
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    },
    handleClick(componentName) {
      this.$store.dispatch('setClickedComponent', componentName);
      if (Date.now() - this.lastTimeClicked < 200)
        this.doubleClick(componentName);
      else {
        this.lastTimeClicked = Date.now();
      }
    },
    doubleClick() {
      this.$modal.show('demo-login');
    },
    consoleCM() {
      console.log(this.componentMap);
    }
  }
};
</script>

<style scoped>
/* .component {
  background-color: green;
} */
.componentDisplay {
  grid-area: componentDisplay;
}

h3,
p {
  color: white;
}

.vdr.active:before {
  outline-style: solid !important;
}
</style>
