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
    HomeView: [
      {
        componentName: 'App',
        x: 0,
        y: 0,
        w: 200,
        h: 200,
        htmlList: [],
        children: []
      }
    ]
  },

  projects: ['Untitled-1', 'Untitled-2'],
  activeProject: 'Untitled-1',
  activeRoute: 'HomeView',
  activeComponent: '',
  projectId: 2,
  selectedElementList: [],
  clickedComponent: '',
  clickedComponentToDelete: ''
};

export default newState;
