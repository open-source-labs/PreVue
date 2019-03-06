import { ADD_TO_COMPONENT_MAP, SET_SELECTED_ELEMENT_LIST } from './types';

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
  [SET_SELECTED_ELEMENT_LIST]: (state, payload) => {
    state.selectedElementList = payload;
  }
};

export default mutations;
