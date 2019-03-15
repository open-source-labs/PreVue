import icons from './icons';
import htmlElementMap from './htmlElementMap';

const newState = {
  icons,
  htmlElementMap,
  componentMap: {
    App: {
      componentName: 'App',
      x: 0,
      y: 0,
      w: 200,
      h: 200,
      htmlList: [],
      children: []
    }
  },
  routes: {
    HomeView: []
  },
  activeComponent: '',
  activeProject: '',
  activeRoute: '',
  selectedElementList: [],
  clickedComponent: '',
  clickedComponentToDelete: '',
  activeProjects: ['Project1']
};

export default newState;
