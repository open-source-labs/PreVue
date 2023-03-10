import { Type } from '../types';

//Mutations
export const REPLACE_STATE: Type = 'REPLACE_STATE';
export const NAME_PROJECT: Type = 'NAME_PROJECT';
export const INITIALISESTORE: Type = 'INITIALISESTORE';
export const ADD_COMPONENT: Type = 'ADD_COMPONENT';
export const ADD_COMPONENT_TO_COMPONENT_MAP: Type =
  'ADD_COMPONENT_TO_COMPONENT_MAP';
export const SET_SELECTED_ELEMENT_LIST: Type = 'SET_SELECTED_ELEMENT_LIST';
export const ADD_TO_SELECTED_ELEMENT_LIST: Type =
  'ADD_TO_SELECTED_ELEMENT_LIST';
export const ADD_TO_COMPONENT_HTML_LIST: Type = 'ADD_TO_COMPONENT_HTML_LIST';
export const SET_CLICKED_ELEMENT_LIST: Type = 'SET_CLICKED_ELEMENT_LIST';
export const DELETE_ACTIVE_COMPONENT: Type = 'DELETE_ACTIVE_COMPONENT';
export const SET_COMPONENT_MAP: Type = 'SET_COMPONENT_MAP';
export const DELETE_FROM_QUEUE: Type = 'DELETE_FROM_QUEUE';
export const DELETE_SELECTED_ELEMENT: Type = 'DELETE_SELECTED_ELEMENT';
export const SET_STATE: Type = 'SET_STATE';
export const ADD_PROJECT: Type = 'ADD_PROJECT';
export const DELETE_FROM_COMPONENT_HTML_LIST: Type =
  'DELETE_FROM_COMPONENT_HTML_LIST';
export const CHANGE_ACTIVE_TAB: Type = 'CHANGE_ACTIVE_TAB';
export const ADD_COMPONENT_TO_ACTIVE_ROUTE_IN_ROUTE_MAP: Type =
  'ADD_COMPONENT_TO_ACTIVE_ROUTE_IN_ROUTE_MAP';
export const ADD_ROUTE: Type = 'ADD_ROUTE';
export const SET_ACTIVE_COMPONENT: Type = 'SET_ACTIVE_COMPONENT';
export const SET_ACTIVE_PROJECT: Type = 'SET_ACTIVE_PROJECT';
export const SET_ACTIVE_ROUTE: Type = 'SET_ACTIVE_ROUTE';
export const INCREMENT_PROJECT_ID: Type = 'INCREMENT_PROJECT_ID';
export const SET_ROUTES: Type = 'SET_ROUTES';
export const SET_COMPONENT_HTML_LIST: Type = 'SET_COMPONENT_HTML_LIST';
export const SET_ACTIVE_ROUTE_ARRAY: Type = 'SET_ACTIVE_ROUTE_ARRAY';
export const ADD_COMPONENT_TO_ACTIVE_ROUTE_CHILDREN: Type =
  'ADD_COMPONENT_TO_ACTIVE_ROUTE_CHILDREN';
export const ADD_ROUTE_TO_COMPONENT_MAP: Type = 'ADD_ROUTE_TO_COMPONENT_MAP';
export const DELETE_PROJECT_TAB: Type = 'DELETE_PROJECT_TAB';
export const UPDATE_COMPONENT_CHILDREN_MULTISELECT_VALUE: Type =
  'UPDATE_COMPONENT_CHILDREN_MULTISELECT_VALUE';
export const UPDATE_COMPONENT_NAME_INPUT_VALUE: Type =
  'UPDATE_COMPONENT_NAME_INPUT_VALUE';
export const UPDATE_COMPONENT_CHILDREN_VALUE: Type =
  'UPDATE_COMPONENT_CHILDREN_VALUE';
export const UPDATE_ACTIVE_COMPONENT_CHILDREN_VALUE: Type =
  'UPDATE_ACTIVE_COMPONENT_CHILDREN_VALUE';
export const ADD_COMPONENT_TO_COMPONENT_CHILDREN: Type =
  'ADD_COMPONENT_TO_COMPONENT_CHILDREN';
export const UPDATE_OPEN_MODAL: Type = 'UPDATE_OPEN_MODAL';

//Actions
export const registerComponent: Type = 'registerComponent';
export const setSelectedElementList: Type = 'setSelectedElementList';
export const addToSelectedElementList: Type = 'addToSelectedElementList';
export const addToComponentElementList: Type = 'addToComponentElementList';
export const setClickedElementList: Type = 'setClickedElementList';
export const deleteActiveComponent: Type = 'deleteActiveComponent';
export const setComponentMap: Type = 'setComponentMap';
export const deleteFromQueue: Type = 'deleteFromQueue';
export const deleteSelectedElement: Type = 'deleteSelectedElement';
export const setState: Type = 'setState';
export const addProject: Type = 'addProject';
export const deleteFromComponentHtmlList: Type = 'deleteFromComponentHtmlList';
export const changeActiveTab: Type = 'changeActiveTab';
export const addRouteToRouteMap: Type = 'addRouteToRouteMap';
export const setActiveComponent: Type = 'setActiveComponent';
export const setActiveRoute: Type = 'setActiveRoute';
export const incrementProjectId: Type = 'incrementProjectId';
export const setRoutes: Type = 'setRoutes';
export const setComponentHtmlList: Type = 'setComponentHtmlList';
export const deleteProjectTab: Type = 'deleteProjectTab';
export const updateComponentChildrenMultiselectValue: Type =
  'updateComponentChildrenMultiselectValue';
export const updateActiveComponentChildrenValue: Type =
  'updateActiveComponentChildrenValue';
export const updateComponentChildrenValue: Type =
  'updateComponentChildrenValue';
export const updateComponentNameInputValue: Type =
  'updateComponentNameInputValue';
export const updateOpenModal: Type = 'updateOpenModal';
export const addElement: Type = 'addElement';
export const initialiseStore: Type = 'initialiseStore';
export const nameProject: Type = 'nameProject';
export const replaceState: Type = 'replaceState';
