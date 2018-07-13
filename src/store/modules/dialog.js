import * as types from '../mutation-types';
const state = {
    goodsDialogVisible: false,//选择商品弹窗
    list: [],
    isListChanged: false,
    dialogForId: ''
};

// mutations
const mutations = {
  [types.SET_GOODS_DIALOG](state, status) {
    state.goodsDialogVisible = status;
      state.isListChanged = false;
  },
  [types.SET_GOODS_DIALOG_ID](state, id) {
    console.log('dialog id ', id);
    state.dialogForId = id;
  },
  [types.SET_GOODS_DIALOG_LIST](state, items) {
    console.log('SET_GOODS_DIALOG_LIST ', items);
    state.list = [...items];
    state.goodsDialogVisible = false;
    
  },
  [types.IS_GOODS_DIALOG_CHANGED](state, status) {
    state.isListChanged = status;
  },
};


export default {
  state,
  mutations
};
