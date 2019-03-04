import * as types from '../types';

const mutations = {
  [types.ADD_TO_LIST]: function(state, payload) {
    const {
      id,
      icon: { caption }
    } = payload;

    const newElement = {
      id,
      text: caption
    };
    state.elementsList.push(newElement);
  },
  //REFACTOR SAME FUNCTIONALITY MUTATIONS
  [types.SET_LIST]: function(state, payload) {
    state.elementsList = payload;
  },
  [types.UPDATE_SELECTED_CHILDREN]: function(state, payload) {
    state.selectedChildren = payload;
  },
  [types.ADD_TO_COMPONENT_MAP]: function(state, payload) {
    const { name, htmlList, children } = payload;
    let newStateComponentMap = Object.assign({}, state.componentMap);
    newStateComponentMap[name] = {};
    newStateComponentMap[name].htmlElements = htmlList;
    newStateComponentMap[name].children = children;
    state.componentMap = newStateComponentMap;
  },
  [types.CLEAR_LIST]: function(state) {
    state.elementsList = [];
  }
};

export default mutations;
