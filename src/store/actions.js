import * as types from './types';

const actions = {
  [types.registerComponent]: ({ state, commit }, payload) => {
    const { name } = payload;
    if (!state.componentMap[name]) {
      commit(types.ADD_TO_COMPONENT_MAP, payload);
    }
  },
  [types.setSelectedElementList]: ({ commit }, payload) => {
    if (payload) {
      commit(types.SET_SELECTED_ELEMENT_LIST, payload);
    }
  },
  [types.addToSelectedElementList]: ({ commit }, payload) => {
    commit(types.ADD_TO_SELECTED_ELEMENT_LIST, payload);
  }
};

export default actions;
