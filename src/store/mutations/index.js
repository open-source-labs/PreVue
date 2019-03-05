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
    console.log(payload);
    const { icon } = payload;

    const newElement = {
      text: icon
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
    const { name, htmlList, children, htmlCode } = payload;
    console.log('htmlList', htmlList);
    console.log('htmlCode', htmlCode);
    let newStateComponentMap = Object.assign({}, state.componentMap);
    newStateComponentMap[name] = {};
    newStateComponentMap[name].componentName = name;
    newStateComponentMap[name].htmlElements = htmlList;
    newStateComponentMap[name].htmlCode = htmlCode;
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
