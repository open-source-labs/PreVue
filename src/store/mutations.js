import {
  ADD_TO_COMPONENT_MAP,
  UPDATE_CHILDREN,
  ADD_TO_SELECTED_ELEMENT_LIST,
  SET_SELECTED_ELEMENT_LIST,
  SET_CLICKED_COMPONENT,
  ADD_TO_COMPONENT_HTML_LIST,
  ADD_TO_COMPONENT_HTML_CODE_LIST,
  SET_CLICKED_ELEMENT_LIST,
  DELETE_CLICKED_COMPONENT,
  SET_COMPONENT_MAP
} from './types';

const mutations = {
  [ADD_TO_COMPONENT_MAP]: (state, payload) => {
    const { componentName, htmlList, children, htmlCode } = payload;
    state.componentMap = {
      ...state.componentMap,
      [componentName]: {
        componentName,
        children,
        htmlList,
        htmlCode
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
    state.clickedComponentToDelete = payload;
    setTimeout(() => {
      state.clickedComponentToDelete = '';
      console.log('clickedComponentToDelete has been reset');
    }, 2500);
  },
  [ADD_TO_COMPONENT_HTML_LIST]: (state, elementName) => {
    const componentName = state.clickedComponent;
    state.componentMap[componentName].htmlList.push(elementName);
  },
  //TODO
  [ADD_TO_COMPONENT_HTML_CODE_LIST]: (state, elementName) => {
    const componentName = state.clickedComponent;
    state.componentMap[componentName].htmlCodeList.push(elementName);
  },
  [SET_CLICKED_ELEMENT_LIST]: (state, payload) => {
    const componentName = state.clickedComponent;
    state.componentMap[componentName].htmlList = payload;
  },
  [DELETE_CLICKED_COMPONENT]: state => {
    const { componentMap, clickedComponentToDelete: componentName } = state;
    console.log(componentMap);
    for (let compKey in componentMap) {
      let children = componentMap[compKey].children;
      children.forEach((child, index) => {
        if (componentName === child) this.$delete(children, index);
      });
    }
    delete componentMap[componentName];
    let newObj = Object.assign({}, componentMap);
    state.componentMap = newObj;
  },
  [SET_COMPONENT_MAP]: (state, payload) => {
    state.componentMap = payload;
  }
};

export default mutations;
