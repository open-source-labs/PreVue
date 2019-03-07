import {
  ADD_TO_COMPONENT_MAP,
  UPDATE_CHILDREN,
  ADD_TO_SELECTED_ELEMENT_LIST,
  SET_SELECTED_ELEMENT_LIST,
  SET_CLICKED_COMPONENT,
  ADD_TO_COMPONENT_HTML_LIST,
  SET_CLICKED_ELEMENT_LIST
} from './types';

const mutations = {
  [ADD_TO_COMPONENT_MAP]: (state, payload) => {
    const { componentName, htmlList, children } = payload;
    state.componentMap = {
      ...state.componentMap,
      [componentName]: {
        componentName,
        children,
        htmlList
      }
    };
  },
  [UPDATE_CHILDREN]: function(state, payload) {
    const { name, newArray } = payload;
    state.componentMap[name].children = newArray;
  },
  [ADD_TO_SELECTED_ELEMENT_LIST]: (state, payload) => {
    state.selectedElementList.push(payload);
  },
  [SET_SELECTED_ELEMENT_LIST]: (state, payload) => {
    state.selectedElementList = payload;
  },
  [SET_CLICKED_COMPONENT]: (state, payload) => {
    state.clickedComponent = payload;
  },
  [ADD_TO_COMPONENT_HTML_LIST]: (state, elementName) => {
    const componentName = state.clickedComponent;
    state.componentMap[componentName].htmlList.push(elementName);
  },
  [SET_CLICKED_ELEMENT_LIST]: (state, payload) => {
    const componentName = state.clickedComponent;
    state.componentMap[componentName].htmlList = payload;
  }
};

export default mutations;
