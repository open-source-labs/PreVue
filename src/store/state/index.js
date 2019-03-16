import icons from './icons';
import htmlElementMap from './htmlElementMap';

const newState = {
  icons,
  htmlElementMap,
  componentMap: {
    App: {
      children: []
    }
  },
  routes: {
    HomeView: []
  },

  projects: ['Untitled-1'],
  activeRoute: 'HomeView',
  activeComponent: '',
  selectedElementList: [],
  clickedComponent: '',
  clickedComponentToDelete: '',
  projectNumber: 2,
  activeTab: 0
};

export default newState;
