import * as types from './storeTypes';
import { Actions } from '../types';

const actions: Actions = {
  [types.incRerenderKey]: ({ commit }) => {
    commit(types.INC_RERENDER_KEY);
  },
  [types.setLogin]: ({ commit }, payload) => {
    commit(types.SET_LOGIN, payload);
  },
  [types.replaceState]: ({ commit }, payload) => {
    commit('replaceState', payload);
  },
  [types.nameProject]: ({ commit }, payload) => {
    commit(types.NAME_PROJECT, payload);
  },
  [types.initialiseStore]: ({ commit }) => {
    commit(types.INITIALISESTORE);
  },



  [types.registerComponent]: ({ state, commit }, payload) => {
    const { componentName } = payload;
   // console.log('componentName is', componentName)
   //console.log('componentNameInputValue is', state.componentNameInputValue)
    //console.log('componentMap is', state.componentMap)

    if (!state.componentMap[componentName]) {
      commit(types.ADD_COMPONENT_TO_COMPONENT_MAP, payload);

      commit(
        types.ADD_COMPONENT_TO_ACTIVE_ROUTE_CHILDREN,
        payload.componentName
      );
      commit(types.ADD_COMPONENT_TO_ACTIVE_ROUTE_IN_ROUTE_MAP, payload);

      const component = state.componentNameInputValue;
      const value = state.componentChildrenMultiselectValue.map(
        (component: string) => {
          return state.componentMap[component].componentName;
        }
      );
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
    //console.log('action payload is', payload);
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
    const activeRouteArray = [...state.routes[state.activeRoute]];
    const newActiveRouteArray = activeRouteArray.filter(componentData => {
      return state.activeComponent !== componentData.componentName;
    });
    commit(types.SET_ACTIVE_ROUTE_ARRAY, newActiveRouteArray);
    commit(types.SET_ACTIVE_COMPONENT, '');
  },
  [types.deleteSelectedElement]: ({ commit }, payload) => {
    //console.log('this is the payload', payload)
    commit(types.DELETE_SELECTED_ELEMENT, payload);
  },
  [types.setState]: ({ commit }, payload) => {
    commit(types.SET_STATE, payload);
  },
  [types.addProject]: ({ commit }, payload) => {
    commit(types.ADD_PROJECT, payload);
  },
  [types.deleteFromComponentHtmlList]: ({ commit }, payload) => {
    commit(types.DELETE_FROM_COMPONENT_HTML_LIST, payload);
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
    const route = state.activeRoute;
    const children: string[] = [];
    commit(types.ADD_ROUTE_TO_COMPONENT_MAP, { route, children });
    const component = 'App';
    const value = state.componentMap[state.activeRoute].componentName;
    commit(types.ADD_COMPONENT_TO_COMPONENT_CHILDREN, { component, value });
  },
  [types.setActiveRoute]: ({ commit }, payload) => {
    commit(types.SET_ACTIVE_ROUTE, payload);
  },
  [types.setActiveComponent]: ({ commit }, payload) => {
    console.log(payload);
    commit(types.SET_ACTIVE_COMPONENT, payload);
  },
  [types.setRoutes]: ({ commit }, payload) => {
    commit(types.SET_ROUTES, payload);
  },
  [types.deleteProjectTab]: ({ commit }, payload) => {
    commit(types.DELETE_PROJECT_TAB, payload);
  },
  [types.updateComponentChildrenMultiselectValue]: ({ commit }, payload) => {
    commit(types.UPDATE_COMPONENT_CHILDREN_MULTISELECT_VALUE, payload);
  },
  [types.updateActiveComponentChildrenValue]: ({ commit }, payload) => {
    console.log('payload', payload);
    commit(types.UPDATE_ACTIVE_COMPONENT_CHILDREN_VALUE, payload);
  },
  [types.updateComponentNameInputValue]: ({ commit }, payload) => {
    commit(types.UPDATE_COMPONENT_NAME_INPUT_VALUE, payload);
  },
  [types.updateOpenModal]: ({ commit }, payload) => {
    commit(types.UPDATE_OPEN_MODAL, payload);
  }
};

export default actions;
