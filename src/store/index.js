// import Vue from 'vue';
import { createStore } from 'vuex';

import state from './state';
import actions from './actions.js';
import mutations from './mutations.js';

// Vue.use(Vuex);

export default createStore({
  state,
  mutations,
  actions,
});
