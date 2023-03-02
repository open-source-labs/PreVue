// import Vue from 'vue';
import { createStore } from 'vuex';

import state from './state';
import actions from './actions.js';
import mutations from './mutations.js';

const store = createStore({ state, mutations, actions });

store.subscribe((mutation, state) => {
  localStorage.setItem('store', JSON.stringify(state));
});

export default store;
