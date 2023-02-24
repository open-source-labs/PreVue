import * as types from './types';

import localforage from 'localforage';

const mutations = {
  [types.ADD_COMPONENT_TO_COMPONENT_MAP]: (state, payload) => {
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
  },
  [types.ADD_TO_SELECTED_ELEMENT_LIST]: (state, payload) => {
    state.selectedElementList.push({ text: payload, children: [] });
  },
  [types.SET_SELECTED_ELEMENT_LIST]: (state, payload) => {
    state.selectedElementList = payload;
  },
  [types.ADD_TO_COMPONENT_HTML_LIST]: (state, elementName) => {
    const componentName = state.activeComponent;
    state.componentMap[componentName].htmlList.push({
      text: elementName,
      children: []
    });
  },
  [types.DELETE_FROM_COMPONENT_HTML_LIST]: (state, id) => {
    const componentName = state.activeComponent;
    const htmlList = state.componentMap[componentName].htmlList;

    function parseAndDelete(htmlList) {
      htmlList.forEach((element, index) => {
        if (element.children.length > 0) {
          parseAndDelete(element.children);
        }
        if (id === element._id) {
          htmlList.splice(index, 1);
        }
      });

      let copied = htmlList.slice(0);
      state.componentMap[componentName].htmlList = copied;
    }
    parseAndDelete(htmlList);
  },

  [types.SET_CLICKED_ELEMENT_LIST]: (state, payload) => {
    const componentName = state.activeComponent;
    state.componentMap[componentName].htmlList = payload;
  },
  [types.DELETE_ACTIVE_COMPONENT]: state => {
    const { componentMap, activeComponent } = state;

    let newObj = Object.assign({}, componentMap);

    delete newObj[activeComponent];

    for (let compKey in newObj) {
      let children = newObj[compKey].children;
      children.forEach((child, index) => {
        if (activeComponent === child) children.splice(index, 1);
      });
    }
    state.componentMap = newObj;
  },
  [types.SET_COMPONENT_MAP]: (state, payload) => {
    console.log(payload);
    state.componentMap = payload;
  },
  [types.DELETE_SELECTED_ELEMENT]: (state, payload) => {
    state.selectedElementList.splice(payload, 1);
  },
  [types.SET_STATE]: (state, payload) => {
    console.log('SETTING STATE');
    console.log(payload);
    Object.assign(state, payload);
  },
  [types.ADD_PROJECT]: (state, payload) => {
    console.log('PUSHING ', payload);
    state.projects.push(payload);
    state.projectNumber++;
  },
  [types.CHANGE_ACTIVE_TAB]: (state, payload) => {
    state.activeTab = payload;
  },
  [types.ADD_ROUTE]: (state, payload) => {
    state.routes = {
      ...state.routes,
      [payload]: []
    };
  },
  [types.ADD_ROUTE_TO_COMPONENT_MAP]: (state, payload) => {
    const { route, children } = payload;
    state.componentMap = {
      ...state.componentMap,
      [route]: {
        componentName: route,
        children
      }
    };
  },
  [types.SET_ACTIVE_ROUTE]: (state, payload) => {
    state.activeRoute = payload;
  },
  [types.ADD_COMPONENT_TO_ACTIVE_ROUTE_IN_ROUTE_MAP]: (state, payload) => {
    state.routes[state.activeRoute].push(payload);
  },
  [types.SET_ACTIVE_COMPONENT]: (state, payload) => {
    state.activeComponent = payload;
  },
  [types.SET_ROUTES]: (state, payload) => {
    state.routes = Object.assign({}, payload);
  },
  [types.SET_ACTIVE_ROUTE_ARRAY]: (state, payload) => {
    state.routes[state.activeRoute] = payload;
  },
  [types.ADD_COMPONENT_TO_ACTIVE_ROUTE_CHILDREN]: (state, payload) => {
    state.componentMap[state.activeRoute].children.push(payload);
  },
  [types.DELETE_PROJECT_TAB]: (state, payload) => {
    state.projects.splice(payload, 1);
    localforage.getItem(state.projects[payload - 1].filename).then(data => {
      state = data;
    });
    state.activeTab = state.activeTab - 1;
  },
  [types.UPDATE_COMPONENT_CHILDREN_MULTISELECT_VALUE]: (state, payload) => {
    state.componentChildrenMultiselectValue = payload;
  },
  [types.UPDATE_COMPONENT_CHILDREN_VALUE]: (state, payload) => {
    const { component, value } = payload;
    state.componentMap[component].children = value;
  },
  [types.UPDATE_ACTIVE_COMPONENT_CHILDREN_VALUE]: (state, payload) => {
    state.componentMap[state.activeComponent].children = payload;
  },
  [types.UPDATE_COMPONENT_NAME_INPUT_VALUE]: (state, payload) => {
    state.componentNameInputValue = payload;
  },
  [types.ADD_COMPONENT_TO_COMPONENT_CHILDREN]: (state, payload) => {
    const { component, value } = payload;
    state.componentMap[component].children.push(value);
  },
  [types.UPDATE_OPEN_MODAL]: (state, payload) => {
    state.modalOpen = payload;
  }
};

export default mutations;
