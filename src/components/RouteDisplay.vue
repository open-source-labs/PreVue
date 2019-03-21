<template>
  <div class="route-display">
    <b-input
      v-model="newRoute"
      placeholder="Enter new route, then press Enter"
      @keyup.enter.native="handleEnterKeyPress"
    ></b-input>
    <Routes></Routes>
  </div>
</template>

<script>
import Routes from '@/components/Routes';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'RouteDisplay',
  components: {
    Routes
  },
  computed: {
    ...mapState(['routes'])
  },
  data() {
    return {
      newRoute: ''
    };
  },
  methods: {
    ...mapActions(['addRouteToRouteMap']),
    handleEnterKeyPress() {
      this.addRouteToRouteMap(this.newRoute)
        .then(() => {
          this.newRoute = '';
        })
        .catch(err => console.log(err));
    }
  }
};
</script>

<style scoped>
.route-display {
  border: 1px solid white;
  overflow: auto;
  height: 60%;
  padding: 0;
}

i:hover {
  cursor: pointer;
}
</style>
