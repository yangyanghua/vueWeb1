import * as types from '../mutation-types';
const state = {
  uuid: '',
  list: [],//所要显示的组件uuid全部储存在这个数组中
};

// mutations
const mutations = {
  [types.SET_SELECTED_COMPONENT](state, uid) {
    state.uuid = uid;
  },
  [types.ADD_COMPONENT](state, uid) {
    state.list.push(uid);
  },
  [types.DELETE_COMPONENT](state, uid) {
    let deleteIndex = state.list.findIndex(item => item === uid);
    if (deleteIndex > -1) {
      if ((deleteIndex + 1) <= state.list.length) {
        state.uuid = state.list[deleteIndex + 1];
      } 
      state.list = state.list.filter(item => (item !== uid));
      if(state.list.length===1){
        state.uuid = state.list[0];
      }
      console.log('after delete state is ', state);
    }
  },
};


export default {
  state,
  mutations
};
