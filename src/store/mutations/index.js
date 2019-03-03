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
  [types.SET_LIST]: function(state, payload) {
    const newElementList = payload;
    state.elementsList = newElementList;
  },
  [types.ADD_TO_COMPONENT_MAP]: function(state, payload) {
    const { name, htmlList } = payload;
    let newStateComponentMap = Object.assign({}, state.componentMap);
    newStateComponentMap[name] = htmlList;
    state.componentMap = newStateComponentMap;
  },
  [types.CLEAR_LIST]: function(state) {
    state.elementsList = [];
  }
};

export default mutations;
