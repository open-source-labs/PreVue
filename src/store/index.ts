// import Vue from 'vue';
import { createStore } from 'vuex';
import { State } from '../types';

import state from './state/stateIndex';
import actions from './actions';
import mutations from './mutations';

const store = createStore({ state, mutations, actions });

store.subscribe((mutation, state) => {
  localStorage.setItem('store', JSON.stringify(state));
});

export default store;
