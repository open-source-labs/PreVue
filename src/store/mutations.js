import { ADD_TO_COMPONENT_MAP } from './types';

const mutations = {
  [ADD_TO_COMPONENT_MAP]: (state, payload) => {
    const { componentName, htmlList, children, htmlCode } = payload;
    state.componentMap = {
      ...state.componentMap,
      componentName: {
        componentName,
        children,
        htmlList,
        htmlCode
      }
    };
  }
};

export default mutations;
