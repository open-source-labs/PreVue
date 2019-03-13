import * as types from './types';

const actions = {
  [types.registerComponent]: ({ state, commit }, payload) => {
    const { componentName } = payload;
    if (!state.componentMap[componentName]) {
      commit(types.ADD_TO_COMPONENT_MAP, payload);
      commit(types.SET_SELECTED_ELEMENT_LIST, []);
    }
  },
  [types.setSelectedElementList]: ({ commit }, payload) => {
    if (payload) {
      commit(types.SET_SELECTED_ELEMENT_LIST, payload);
    }
  },
  [types.addToSelectedElementList]: ({ commit }, payload) => {
    commit(types.ADD_TO_SELECTED_ELEMENT_LIST, payload);
  },
  [types.setClickedComponent]: ({ commit }, payload) => {
    commit(types.SET_CLICKED_COMPONENT, payload);
  },
  [types.addToComponentElementList]: ({ commit }, payload) => {
    commit(types.ADD_TO_COMPONENT_HTML_LIST, payload);
  },
  [types.setClickedElementList]: ({ commit }, payload) => {
    commit(types.SET_CLICKED_ELEMENT_LIST, payload);
  },
  [types.deleteClickedComponent]: ({ commit }) => {
    commit(types.DELETE_CLICKED_COMPONENT);
  },
  [types.getPrevState]: ({ commit }, payload) => {
    commit(types.GET_PREV_STATE, payload);
  },
  [types.deleteSelectedElement]: ({ commit }, payload) => {
    commit(types.DELETE_SELECTED_ELEMENT, payload);
  },
  [types.addProject]: ({ commit }, payload) => {
    commit(types.ADD_PROJECT, payload);
  }
};

export default actions;
