const actions = {
  addShape({ state, commit }, componentName) {
    let shape = {
      x: 150,
      y: 150,
      width: 100,
      height: 100,
      fill: getRandomColor(),
      name: 'testshape' + ++state.rectNumber,
      draggable: true
    };
    function getRandomColor() {
      var letters = '0123456789ABCDEF';
      var color = '#';
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }
    let text = {
      x: 180,
      y: 125,
      fontFamily: 'Calibri',
      fontSize: 24,
      text: componentName,
      fill: 'black'
    };
    // state.id++;

    commit('ADD_SHAPE', { shape, text });
  },
  changeText({ commit }, value) {
    commit('CHANGE_TEXT', value);
  }
};

export default actions;
