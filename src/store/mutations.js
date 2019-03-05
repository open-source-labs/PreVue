import { ADD_TO_COMPONENT_MAP } from './types';

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
  }
};

export default mutations;
