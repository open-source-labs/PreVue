// Vuex state, single source of truth

import icons from './icons';
import htmlElementMap from './htmlElementMap';
import { State } from '../../types';

const newState: State = {
  icons,
  htmlElementMap,
  componentMap: {
    App: {
      componentName: 'App',
      children: ['HomeView'],
      htmlList: []
    },
    HomeView: {
      componentName: 'HomeView',
      children: [],
      htmlList: []
    }
  },
  routes: {
    HomeView: []
  },

  componentNameInputValue: '',
  activeRoute: 'HomeView',
  activeComponent: '',
  
  activeElement: '',
  componentIndex: 0,
  elementIndex: 0,
  
  selectedElementList: [],
  projectName: 'Project-Name',
  componentChildrenMultiselectValue: [],
  modalOpen: false,
  htmlElements: [],
  saved: false,
  loggedIn: false,
  rerenderKey: 0
};

export default newState;
