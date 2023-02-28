const getters = {
  componentFromMap(state) {
    return state.componentMap[state.activeComponent];
  },
  htmlListFromActiveComponent(state, getters) {
    return getters.componentFromMap.htmlList;
  }
};

export default getters;
