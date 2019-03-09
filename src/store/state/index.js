import icons from './icons';
import htmlElementMap from './htmlElementMap';

const newState = {
  icons,
  htmlElementMap,
  componentMap: {
    App: {
      componentName: 'App',
      htmlList: [],
      children: ['child1']
    },
    child1: {
      componentName: 'child1',
      htmlList: [],
      children: []
    }
  },
  selectedElementList: [],
  clickedComponent: '',
  clickedComponentToDelete: ''
};

export default newState;
