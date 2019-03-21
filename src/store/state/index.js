import icons from './icons';
import htmlElementMap from './htmlElementMap';

const newState = {
  icons,
  htmlElementMap,
  componentMap: {
    App: {
      componentName: 'App',
      children: ['HomeView']
    },
    HomeView: {
      componentName: 'HomeView',
      children: []
    }
  },
  routes: {
    HomeView: []
  },

  projects: [{ filename: 'Untitled-1', lastSavedLocation: '' }],
  activeRoute: 'HomeView',
  activeComponent: '',
  selectedElementList: [],
  projectNumber: 2,
  activeTab: 0
};

export default newState;
