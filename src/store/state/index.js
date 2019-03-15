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
  selectedElementList: [],
  clickedComponent: '',
  clickedComponentToDelete: '',
  projectNumber: 2,
  activeProjects: ['untitled-1'],
  activeTab: 0
};

export default newState;
