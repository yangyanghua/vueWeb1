import * as types from '../mutation-types';
const state = {
    headImg: '',
    nickName: '',
};
// mutations
const mutations = {
    [types.SET_HEAD_IMG](state, img) {
        state.headImg = img;
    },
    [types.SET_NICK_NAME](state, name) {
        state.nickName = name;
    },
};
export default {
    state,
    mutations
  };
  