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
    },
    Parent1: {
      componentName: 'Parent1',
      x: 0,
      y: 0,
      w: 200,
      h: 200,
      htmlList: [],
      children: ['Child1']
    },
    Parent2: {
      componentName: 'Parent2',
      x: 0,
      y: 0,
      w: 200,
      h: 200,
      htmlList: [],
      children: ['Child2']
    },
    Child1: {
      componentName: 'Child1',
      x: 0,
      y: 0,
      w: 200,
      h: 200,
      htmlList: [],
      children: []
    },
    Child2: {
      componentName: 'Child2',
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
  clickedComponentToDelete: '',
  activeProjects: ['Project1']
};

export default newState;
