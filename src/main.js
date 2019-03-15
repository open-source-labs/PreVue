import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/';
import Vuetify from 'vuetify';
import VModal from 'vue-js-modal';
import { throttle } from 'lodash.throttle';
import VueDraggableResizable from 'vue-draggable-resizable';

import 'vuetify/dist/vuetify.min.css';
import 'vue-draggable-resizable/dist/VueDraggableResizable.css';

import Buefy from 'buefy';

Vue.config.productionTip = false;
Vue.use(Buefy);
// Vue.use(Vuetify);

Vue.use(VModal, { dynamic: true });

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
