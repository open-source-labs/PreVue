import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/';
// import VueKonva from 'vue-konva';
import Vuetify from 'vuetify';
import VueDragResize from 'vue-drag-resize';
import VModal from 'vue-js-modal';

import 'vuetify/dist/vuetify.min.css';

Vue.config.productionTip = false;
// Vue.use(VueKonva);
Vue.use(Vuetify);
Vue.use(VModal, { dynamic: true });
Vue.component('vue-drag-resize', VueDragResize);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
