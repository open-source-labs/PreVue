import * as types from './types';

const actions = {
  [types.registerComponent]: ({ state, commit }, payload) => {
    const { name } = payload;
    if (!state.componentMap[name]) {
      commit(types.ADD_TO_COMPONENT_MAP, payload);
    }
  }
};

export default actions;
