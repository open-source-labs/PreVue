import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store.js';
import VueKonva from 'vue-konva';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

Vue.config.productionTip = false;
Vue.use(VueKonva);
Vue.use(Vuetify);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
