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
  selectedElementList: [],
  clickedComponent: '',
  clickedComponentToDelete: ''
};

export default newState;
