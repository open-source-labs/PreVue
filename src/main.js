import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueKonva from 'vue-konva';

Vue.config.productionTip = false;
Vue.use(VueKonva);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
