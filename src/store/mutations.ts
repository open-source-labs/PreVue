import * as types from './storeTypes';
import { State, Mutations, HtmlList, HtmlChild } from '../types';

const mutations: Mutations<State> = {
  initializeStore(state: State) {
    if (localStorage.getItem('store')) {
      this.replaceState(
        Object.assign(
          state,
          JSON.parse(localStorage.getItem('store') || `${state}`)
        )
      );
    }
  },
  replaceState(state: State, payload) {
    this.replaceState(payload);
  },
  [types.INC_RERENDER_KEY]: (state: State) => {
    state.rerenderKey++;
  },
  [types.SET_LOGIN]: (state: State, payload) => {
    state.loggedIn = payload;
  },
  [types.NAME_PROJECT]: (state: State, payload) => {
    state.projectName = payload;
  },
  [types.ADD_COMPONENT_TO_COMPONENT_MAP]: (state: State, payload) => {
    const { componentName, htmlList, children, isActive } = payload;
    state.componentMap = {
      ...state.componentMap,
      [componentName]: {
        componentName,
        x: 0,
        y: 0,
        w: 200,
        h: 200,
        children,
        htmlList,
        isActive
      }
    };

    //console.log('htmlList[0] is', htmlList[0].text)
  },
  [types.ADD_TO_SELECTED_ELEMENT_LIST]: (state: State, payload) => {//this
    state.selectedElementList.push({ 
      text: payload, 
      children: [],
      x: 20,
      y: 20,
      w: 100,
      h: 100
     });
  },
  [types.ADD_TO_SELECTED_ELEMENT_LIST]: (state: State, payload) => {
    //console.log('mutation payload is', payload)
    state.selectedElementList.push({ text: payload, children: []});
  },
  [types.SET_SELECTED_ELEMENT_LIST]: (state: State, payload) => {
    state.selectedElementList = payload;
  },
  [types.ADD_TO_COMPONENT_HTML_LIST]: (state: State, elementName) => {//and this
    const componentName: string = state.activeComponent;

    state.componentMap[componentName].htmlList.push({
      text: elementName,
      children: [],
      x: 20,
      y: 20,
      w: 100,
      h: 100
    });
  },
  [types.DELETE_FROM_COMPONENT_HTML_LIST]: (state: State, id) => {
    const componentName = state.activeComponent;
    const htmlList = state.componentMap[componentName].htmlList;

    function parseAndDelete(htmlList: HtmlList) {
      htmlList.forEach((element, index) => {
        if (element.children.length > 0) {
          parseAndDelete(element.children);
        }
        if (id === element._id) {
          htmlList.splice(index, 1);
        }
      });

      const copied = htmlList.slice(0);
      state.componentMap[componentName].htmlList = copied;
    }
    parseAndDelete(htmlList);
  },

  [types.SET_CLICKED_ELEMENT_LIST]: (state: State, payload) => {
    const componentName = state.activeComponent;
    state.componentMap[componentName].htmlList = payload;
  },
  [types.DELETE_ACTIVE_COMPONENT]: (state: State) => {
    const { componentMap, activeComponent } = state;

    const newObj = Object.assign({}, componentMap);

    delete newObj[activeComponent];

    for (const compKey in newObj) {
      const children = newObj[compKey].children;
      children.forEach((child, index) => {
        if (activeComponent === child) children.splice(index, 1);
      });
    }
    state.componentMap = newObj;
  },
  [types.SET_COMPONENT_MAP]: (state: State, payload) => {
    console.log(payload);
    state.componentMap = payload;
  },
  [types.DELETE_SELECTED_ELEMENT]: (state: State, payload) => {
    console.log(state.selectedElementList)
    //console.log('this is payload:', payload)
    state.selectedElementList.splice(payload, 1);
  },
  [types.SET_STATE]: (state: State, payload) => {
    Object.assign(state, payload);
  },

  [types.ADD_ROUTE]: (state: State, payload) => {
    state.routes = {
      ...state.routes,
      [payload]: []
    };
  },
  [types.ADD_ROUTE_TO_COMPONENT_MAP]: (state: State, payload) => {
    const { route, children } = payload;
    state.componentMap = {
      ...state.componentMap,
      [route]: {
        componentName: route,
        children
      }
    };
  },
  [types.SET_ACTIVE_ROUTE]: (state: State, payload) => {
    state.activeRoute = payload;
  },
  [types.ADD_COMPONENT_TO_ACTIVE_ROUTE_IN_ROUTE_MAP]: (
    state: State,
    payload
  ) => {
    state.routes[state.activeRoute].push(payload);
  },
  [types.SET_ACTIVE_COMPONENT]: (state: State, payload) => {
    state.activeComponent = payload;
  },
  [types.SET_ROUTES]: (state: State, payload) => {
    state.routes = Object.assign({}, payload);
  },
  [types.SET_ACTIVE_ROUTE_ARRAY]: (state: State, payload) => {
    state.routes[state.activeRoute] = payload;
  },
  [types.ADD_COMPONENT_TO_ACTIVE_ROUTE_CHILDREN]: (
    state: State,
    payload: string
  ) => {
    state.componentMap[state.activeRoute].children.push(payload);
  },
  [types.DELETE_PROJECT_TAB]: (state: State, payload) => {
    // delete project tab functionality yet to be implemented
  },
  [types.UPDATE_COMPONENT_CHILDREN_MULTISELECT_VALUE]: (
    state: State,
    payload
  ) => {
    console.log('payload', payload);
    state.componentChildrenMultiselectValue = payload;
  },
  [types.UPDATE_COMPONENT_CHILDREN_VALUE]: (state: State, payload) => {
    const { component, value } = payload;
    state.componentMap[component].children = value;
  },
  [types.UPDATE_ACTIVE_COMPONENT_CHILDREN_VALUE]: (state: State, payload) => {
    state.componentMap[state.activeComponent].children = payload;
  },
  [types.UPDATE_COMPONENT_NAME_INPUT_VALUE]: (state: State, payload) => {
    state.componentNameInputValue = payload;
  },
  [types.ADD_COMPONENT_TO_COMPONENT_CHILDREN]: (state: State, payload) => {
    const { component, value } = payload;
    state.componentMap[component].children.push(value);
  },
  [types.UPDATE_OPEN_MODAL]: (state: State, payload) => {
    state.modalOpen = payload;
  }
};

export default mutations;
