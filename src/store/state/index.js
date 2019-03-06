import icons from './icons';

const newState = {
  icons,
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
  displaySidebar: true
};

export default newState;
