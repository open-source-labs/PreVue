import * as types from './storeTypes';
import { MutationTree } from 'vuex';
import { State, Mutations, HtmlList, HtmlChild } from '../types';

const mutations: Mutations<State> = {
  initialiseStore(state: State) {

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
  [types.UPDATE_PROJECT_NAME]: (state: State, payload) => {
    state.editedProjectName = payload;
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
  },
  [types.ADD_TO_SELECTED_ELEMENT_LIST]: (state: State, payload) => {
    state.selectedElementList.push({ 
      text: payload, 
      children: [],
      id: Date.now(),
      x: 20,
      y: 20,
      w: 100,
      h: 100,
      isActive: Boolean
     });
  },
  [types.SET_SELECTED_ELEMENT_LIST]: (state: State, payload) => {
    state.selectedElementList = payload;
  },
  [types.ADD_TO_COMPONENT_HTML_LIST]: (state: State, elementName) => { //and this
    const componentName: string = state.activeComponent;

    // state.componentMap[componentName].htmlList.push({
    //   text: elementName,
    //   children: [],
    //   x: 20,
    //   y: 20,
    //   w: 100,
    //   h: 100
    // })

    //find the active component and save the index
    const findIndex = function(obj){
      for(const num in obj){
        if(obj[num].componentName === componentName){
          return num
        }
      }
    }
    let index = findIndex(state.routes[state.activeRoute])
    console.log("index", index)

    //also adds to routes
    console.log("COMPONENT HTML LIST FUNCTION", state.routes[state.activeRoute])
    state.routes[state.activeRoute][index].htmlList.push({ 
      text: elementName,
      children: [],
      id: Date.now(),
      x: 20,
      y: 20,
      w: 100,
      h: 100,
      isActive: Boolean
    })
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

  // 
  [types.DELETE_ACTIVE_COMPONENT]: (state: State) => {
    const { routes, activeRoute, componentMap, activeComponent, arrayOfStates } = state;

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

  // gets the component, traverses the component document and performs a splice on the element when it finds it
  [types.DELETE_ACTIVE_ELEMENT]: (state: State) => {//new
    let { routes, activeElement, activeRoute, componentIndex } = state;
    // routes, activeRoute, arrayOfStates
    const component = routes[activeRoute][componentIndex];

    let newList
    let oldIndex = []

    function findAndDelete(arr, id) {
      for (const [i, el] of arr.entries()) {
        console.log("EL", el)
        if (el.id === id) {
          newList = arr.slice(); // create a shallow copy
          newList.splice(i, 1); // delete the id'd element
          if(!oldIndex.length){
            component.htmlList = newList 
          } else {
            if(oldIndex.length === 1){
              component.htmlList[oldIndex[0]].children = newList
            } else if (oldIndex.length === 2){
              component.htmlList[oldIndex[0]].children[oldIndex[1]].children = newList
            } else if (oldIndex.length === 3){
              component.htmlList[oldIndex[0]].children[oldIndex[1]].children[oldIndex[2]].children = newList
            } else if (oldIndex.length === 4){
              component.htmlList[oldIndex[0]].children[oldIndex[1]].children[oldIndex[2]].children[oldIndex[3]].children = newList
            } else if (oldIndex.length === 5){
              component.htmlList[oldIndex[0]].children[oldIndex[1]].children[oldIndex[2]].children[oldIndex[3]].children[oldIndex[4]].children = newList
            } else if (oldIndex.length === 6){
              component.htmlList[oldIndex[0]].children[oldIndex[1]].children[oldIndex[2]].children[oldIndex[3]].children[oldIndex[4]].children[oldIndex[5]].children = newList
            } else if (oldIndex.length === 7){
              component.htmlList[oldIndex[0]].children[oldIndex[1]].children[oldIndex[2]].children[oldIndex[3]].children[oldIndex[4]].children[oldIndex[5]].children[oldIndex[6]].children = newList
            }
          }
        } else if (el.children.length > 0) {
          console.log("CHILD")
          oldIndex.push(i)
          findAndDelete(el.children, id);
        }
        oldIndex = []
      }
    }
    findAndDelete(component.htmlList, activeElement.id);
  },

  [types.SET_ACTIVE_ELEMENT]: (state: State, payload) => {//new
    state.activeElement = payload;
  },
  [types.SET_COMPONENT_INDEX]: (state: State, payload) => {//new
    state.componentIndex = payload;
  },
  [types.SET_ELEMENT_INDEX]: (state: State, payload) => {//new
    state.elementIndex = payload;
  },

  // pushes new state to arrayOfStates
  [types.SAVE_STATE]: (state: State) => {//new
    const { routes, activeRoute, arrayOfStates } = state;
    const cloneOfActiveRoute = JSON.parse(JSON.stringify(routes[activeRoute]))
    state.arrayOfStates = [...state.arrayOfStates, cloneOfActiveRoute]
    if(arrayOfStates.length > 120){
      state.arrayOfStates = arrayOfStates.slice(20, arrayOfStates.length)
    }
    // console.log("pt 1", arrayOfStates)
  },
  // removing the top element of arrayOfStates, aka, the current state
  // assigning routes[activeRoute] to state we just removed
  [types.RESTORE_STATE]: (state: State) => {//new
    const { routes, activeRoute, arrayOfStates } = state;
    const prevRoute = arrayOfStates.pop();
    console.log('prevRoute',prevRoute)
    // console.log("pt 2", arrayOfStates[arrayOfStates.length - 1])
    routes[activeRoute] = prevRoute;
    console.log("pt 2", arrayOfStates)
    // console.log("pt 3", routes[activeRoute])
  },

  [types.SET_COMPONENT_MAP]: (state: State, payload) => {
    console.log(payload);
    state.componentMap = payload;
  },
  [types.DELETE_SELECTED_ELEMENT]: (state: State, payload) => {
    console.log(state.selectedElementList)
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
