import * as types from '../mutation-types';
const state = {
    areaInfo: [],
    hasInfo: false,
};
// mutations
const mutations = {
    [types.SET_AREA_INFO](state, info) {
        state.areaInfo = info;
    },
    [types.SET_HAS_INFO](state, info) {
        state.hasInfo = info;
    },
};
export default {
    state,
    mutations
  };
  