// import Vue from 'vue';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/';

//vuetify imports
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

//vuetify config
const vuetify = createVuetify({
  components,
  directives,
});
// Vue.config.productionTip = false;

// Creation and mounting of the app
const app = createApp(App);
app.use(vuetify);
app.use(router);
app.use(store);
app.mount('#app');
