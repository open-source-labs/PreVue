import {
  ADD_TO_COMPONENT_MAP,
  ADD_TO_SELECTED_ELEMENT_LIST,
  SET_SELECTED_ELEMENT_LIST
} from './types';

const mutations = {
  [ADD_TO_COMPONENT_MAP]: (state, payload) => {
    const { name, htmlList, children, htmlCode } = payload;
    state.componentMap = {
      ...state.componentMap,
      name: {
        componentName: name,
        children,
        htmlList,
        htmlCode
      }
    };
  },
  [ADD_TO_SELECTED_ELEMENT_LIST]: (state, payload) => {
    state.selectedElementList.push(payload);
  },
  [SET_SELECTED_ELEMENT_LIST]: (state, payload) => {
    state.selectedElementList = payload;
  }
};

export default mutations;
