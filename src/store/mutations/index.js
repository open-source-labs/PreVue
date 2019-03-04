import {
  ADD_TO_COMPONENT_MAP,
  ADD_TO_LIST,
  CLEAR_LIST,
  SET_LIST,
  UPDATE_SELECTED_CHILDREN,
  UPDATE_CHILDREN,
  SET_COMPONENT_MAP_LIST
} from '../types';

const mutations = {
  [ADD_TO_LIST]: function(state, payload) {
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
  [SET_LIST]: function(state, payload) {
    state.elementsList = payload;
  },
  [SET_COMPONENT_MAP_LIST]: function(state, payload) {
    const { value, componentName } = payload;
    state.componentMap[componentName].htmlElements = value;
  },
  [UPDATE_SELECTED_CHILDREN]: function(state, payload) {
    state.selectedChildren = payload;
  },
  [ADD_TO_COMPONENT_MAP]: function(state, payload) {
    const { name, htmlList, children } = payload;
    let newStateComponentMap = Object.assign({}, state.componentMap);
    newStateComponentMap[name] = {};
    newStateComponentMap[name].componentName = name;
    newStateComponentMap[name].htmlElements = htmlList;
    newStateComponentMap[name].children = children;
    state.componentMap = newStateComponentMap;
  },
  [CLEAR_LIST]: function(state) {
    state.elementsList = [];
    state.selectedChildren = [];
  },

  [UPDATE_CHILDREN]: function(state, payload) {
    const { name, newArray } = payload;
    state.componentMap[name].children = newArray;
  }
};

export default mutations;
