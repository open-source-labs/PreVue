// import Vue from 'vue';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/';

import 'vue-draggable-resizable/dist/VueDraggableResizable.css';

// Vue.config.productionTip = false;

// Vue.createApp({
//   // options object
//   router,
//   store,
//   render: (h) => h(App),
// });

const app = createApp(App);
app.use(router);
app.use(store);
app.mount('#app');

// new Vue({
//   router,
//   store,
//   render: (h) => h(App),
// }).$mount('#app');
