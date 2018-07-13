import * as types from '../mutation-types';

// initial state
const state = {
    existInfo: false,
    areaInfo: '',
    areaOriInfo: [],
    currentCity: '',
    areaChangeFlag: 0
};

// mutations
const mutations = {
    [types.SET_AREA_EXIST](state, isExist) {
        state.existInfo = isExist;
    },
    [types.SET_AREA_ALLINFO](state, allInfo) {
        state.areaInfo = allInfo;
    },
    [types.SET_AREA_ORIINFO](state, oriInfo) {
        state.areaOriInfo = oriInfo;
    },
    [types.SET_AREA_SELECTCITY](state, city) {
        state.currentCity = city;
    },
    [types.SET_AREA_CHANGEFLAG](state) {
        state.areaChangeFlag = state.areaChangeFlag + 1;
    },
};

export default {
    state,
    mutations
};