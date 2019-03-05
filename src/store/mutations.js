import { ADD_TO_COMPONENT_MAP, TOGGLE_SIDEBAR } from './types';

const mutations = {
  [TOGGLE_SIDEBAR]: state => {
    state.displaySidebar = !state.displaySidebar;
  },
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
  }
};

export default mutations;
