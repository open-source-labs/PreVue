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
      htmlList: [],
    },
    HomeView: {
      componentName: 'HomeView',
      children: [],
      htmlList: [],
    },
  },
  routes: {
    HomeView: [],
  },

  componentNameInputValue: '',
  projects: [{ filename: 'Untitled-1', lastSavedLocation: '' }],
  activeRoute: 'HomeView',
  activeComponent: '',
  selectedElementList: [],
  projectNumber: 2,
  activeTab: 0,
  componentChildrenMultiselectValue: [],
  modalOpen: false,
  htmlElements: [],
};

export default newState;
