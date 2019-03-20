import icons from './icons';
import htmlElementMap from './htmlElementMap';

const newState = {
  icons,
  htmlElementMap,
  componentMap: {
    App: {
      children: ['HomeView']
    },
    HomeView: {
      children: ['asdf']
    }
  },
  routes: {
    HomeView: []
  },

  projects: [{ filename: 'Untitled-1', lastSavedLocation: '' }],
  activeRoute: 'HomeView',
  activeComponent: '',
  selectedElementList: [],
  clickedComponent: '',
  clickedComponentToDelete: '',
  projectNumber: 2,
  activeTab: 0
};

export default newState;
