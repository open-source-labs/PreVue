import * as types from './types';

const actions = {
  [types.registerComponent]: ({ state, commit }, payload) => {
    const { componentName } = payload;
    if (!state.componentMap[componentName]) {
      commit(types.ADD_COMPONENT_TO_COMPONENT_MAP, payload);
      commit(types.ADD_COMPONENT_TO_ACTIVE_ROUTE_CHILDREN, payload);
      commit(types.ADD_COMPONENT_TO_ACTIVE_ROUTE_IN_ROUTE_MAP, payload);

      let component = state.componentNameInputValue;
      let value = state.componentChildrenMultiselectValue.map(component => {
        return state.componentMap[component];
      });
      commit(types.UPDATE_COMPONENT_CHILDREN_VALUE, { component, value });
      commit(types.UPDATE_COMPONENT_CHILDREN_MULTISELECT_VALUE, []);
      commit(types.UPDATE_COMPONENT_NAME_INPUT_VALUE, '');
      commit(types.SET_SELECTED_ELEMENT_LIST, []);
    }
  },
  [types.setSelectedElementList]: ({ commit }, payload) => {
    if (payload) {
      commit(types.SET_SELECTED_ELEMENT_LIST, payload);
    }
  },
  [types.addToSelectedElementList]: ({ commit }, payload) => {
    console.log('payload', payload);
    commit(types.ADD_TO_SELECTED_ELEMENT_LIST, payload);
  },
  [types.addToComponentElementList]: ({ commit }, payload) => {
    commit(types.ADD_TO_COMPONENT_HTML_LIST, payload);
  },
  [types.setClickedElementList]: ({ commit }, payload) => {
    commit(types.SET_CLICKED_ELEMENT_LIST, payload);
  },
  [types.deleteActiveComponent]: ({ state, commit }) => {
    commit(types.DELETE_ACTIVE_COMPONENT);
    let activeRouteArray = [...state.routes[state.activeRoute]];
    let newActiveRouteArray = activeRouteArray.filter(componentData => {
      return state.activeComponent !== componentData.componentName;
    });
    commit(types.SET_ACTIVE_ROUTE_ARRAY, newActiveRouteArray);
    commit(types.SET_ACTIVE_COMPONENT, '');
  },
  [types.deleteSelectedElement]: ({ state, commit }, payload) => {
    commit(types.DELETE_SELECTED_ELEMENT, payload);
  },
  [types.setState]: ({ commit }, payload) => {
    // console.log('COMMITTING PAYLOAD: ', payload);
    commit(types.SET_STATE, payload);
  },
  [types.addProject]: ({ commit }, payload) => {
    commit(types.ADD_PROJECT, payload);
  },
  [types.changeActiveTab]: ({ commit }, payload) => {
    commit(types.CHANGE_ACTIVE_TAB, payload);
  },
  [types.setComponentMap]: ({ commit }, payload) => {
    commit(types.SET_COMPONENT_MAP, payload);
  },
  [types.addRouteToRouteMap]: ({ state, commit }, payload) => {
    commit(types.ADD_ROUTE, payload);
    commit(types.SET_ACTIVE_ROUTE, payload);
    let route = state.activeRoute;
    let children = [];
    commit(types.ADD_ROUTE_TO_COMPONENT_MAP, { route, children });
    let component = 'App';
    let value = state.componentMap[state.activeRoute];
    commit(types.ADD_COMPONENT_TO_COMPONENT_CHILDREN, { component, value });
  },
  [types.setActiveRoute]: ({ commit }, payload) => {
    commit(types.SET_ACTIVE_ROUTE, payload);
  },
  [types.setActiveComponent]: ({ commit }, payload) => {
    commit(types.SET_ACTIVE_COMPONENT, payload);
  },
  [types.setRoutes]: ({ commit }, payload) => {
    commit(types.SET_ROUTES, payload);
  },
  [types.updateComponentChildrenMultiselectValue]: ({ commit }, payload) => {
    commit(types.UPDATE_COMPONENT_CHILDREN_MULTISELECT_VALUE, payload);
  },
  [types.updateActiveComponentChildrenValue]: ({ commit }, payload) => {
    commit(types.UPDATE_ACTIVE_COMPONENT_CHILDREN_VALUE, payload);
    commit(types.UPDATE_COMPONENT_CHILDREN_MULTISELECT_VALUE, []);
  },
  [types.updateComponentNameInputValue]: ({ commit }, payload) => {
    commit(types.UPDATE_COMPONENT_NAME_INPUT_VALUE, payload);
  }
};

export default actions;
