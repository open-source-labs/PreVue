<template>
  <!--where a user can create a new route in the left sidebar-->
  <v-card
    id="sidebar1"
    class="rounded-0"
    :style="{
      'background-color': '#3b444b',
      padding: '16px 0px 20px 0px'
    }"
  >
    <v-card-title
      :style="{
        'font-size': '20px',
        color: '#f5f4f3',
        'font-weight': '550',
        padding: '30px 24px 0 24px'
      }"
    >
      <strong>View Creator</strong>
    </v-card-title>
    <v-card-actions class="d-block">
      <v-form
        :style="{
          padding: '0 24px 0 24px'
        }"
        @submit.prevent="handleEnterKeyPress"
      >
        <v-text-field
          v-model="newRoute"
          variant="underlined"
          label="Enter A View Name"
          placeholder="myCustomView"
          required
          :style="{ color: '#f5f4f3' }"
        >
        </v-text-field>
      </v-form>
    </v-card-actions>
    <Routes></Routes>
  </v-card>
</template>

<script>
import Routes from '@/components/Routes.vue';
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
    // adds a new route to your route map
    ...mapActions(['addRouteToRouteMap']),
    handleEnterKeyPress(event) {
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
#sidebar1 > div {
  padding: 25;
}

.v-label.v-field-label,
.v-text-field input {
  font-size: 14px;
}

i:hover {
  cursor: pointer;
}
</style>
