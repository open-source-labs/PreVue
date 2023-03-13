<template>
  <!--where a user can create a new route in the left sidebar-->
  <v-card
    id="sidebar1"
    class="rounded-0"
    :style="{
      'background-color': '#565656',
      'border-bottom': '0.5px solid #6a696a',
      padding: '16px 0px 24px 0px'
    }"
  >
    <v-card-title
      :style="{
        'font-size': '14px',
        color: '#f5f4f3',
        'font-weight': '550',
        padding: '24px 24px 0 24px'
      }"
    >
    <strong>Route Creator</strong>
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
          label="Route name"
          placeholder="myCustomRoute"
          required
          :style="{ color: '#f5f4f3' }"
          
        >
        </v-text-field>
      </v-form>
    </v-card-actions>
    <Routes></Routes>
  </v-card>
  <!-- <div
    class="route-display"
    :style="{ 'border-bottom': '0.5px solid #6a696a' }"
  >
    <input
      v-model="newRoute"
      placeholder="Enter new route, then press Enter"
      @keyup.enter.native="handleEnterKeyPress"
    />

  </div> -->
</template>

<script>
import Routes from '@/components/Routes.vue';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'RouteDisplay',
  components: {
    Routes,
  },
  computed: {
    ...mapState(['routes']),
  },
  data() {
    return {
      newRoute: '',
    };
  },
  methods: {
    ...mapActions(['addRouteToRouteMap']),
    handleEnterKeyPress(event) {
      this.addRouteToRouteMap(this.newRoute)
        .then(() => {
          this.newRoute = '';
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style scoped>
/* .route-display {
  border: 1px solid white;
  overflow: auto;
  height: 60%;
  padding: 0;
} */
#sidebar1 > div {
  padding: 0;
}

.v-label.v-field-label,
.v-text-field input {
  font-size: 14px;
}

i:hover {
  cursor: pointer;
}
</style>
