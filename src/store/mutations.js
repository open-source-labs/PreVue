const mutations = {
  ADD_SHAPE(state, { shape, text }) {
    console.log('TEXT IS ', text);
    state.rectangles.push({ shape, text });
  },
  CHANGE_TEXT(state, value) {
    state.currentComponentName = value;
  }
};

export default mutations;
