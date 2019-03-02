const actions = {
  addShape({ state, commit }) {
    let shape = {
      x: 150,
      y: 150,
      width: 100,
      height: 100,
      fill: 'green',
      name: 'testshape' + ++state.rectNumber,
      draggable: true
    };
    let text = {
      x: 150,
      y: 150,
      fontFamily: 'Calibri',
      fontSize: 24,
      text: state.currentComponentName,
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
