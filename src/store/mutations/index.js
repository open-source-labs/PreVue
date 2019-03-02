import * as types from '../types';
const mutations = {
  [types.ADD_TO_LIST]: function(state, value) {
    console.log(value);
  }
};

export default mutations;
