import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/';
import Vuetify from 'vuetify';
import VueDragResize from 'vue-drag-resize';
import VModal from 'vue-js-modal';
import { throttle } from 'lodash.throttle';
import { saveState } from './localStorage';

import 'vuetify/dist/vuetify.min.css';

Vue.config.productionTip = false;
Vue.use(Vuetify);
Vue.use(VModal, { dynamic: true });
Vue.component('vue-drag-resize', VueDragResize);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
