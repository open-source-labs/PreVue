import * as types from '../types.js';

const actions = {
  addToComponentMap({ commit }, payload) {
    commit(types.ADD_TO_COMPONENT_MAP, payload);
    commit(types.CLEAR_LIST);
  }
};

export default actions;
