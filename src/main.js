import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/';
import Buefy from 'buefy';

import 'vue-draggable-resizable/dist/VueDraggableResizable.css';

Vue.config.productionTip = false;

Vue.use(Buefy, {
  defaultIconPack: 'fas'
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
