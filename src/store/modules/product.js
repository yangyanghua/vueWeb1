import * as types from '../mutation-types.js';
// initial state
const state = {
    id: '',
    productDetailHtml: '',
    basicInfo: '',
    imgInfo: '',
    payInfo: ''
};

// mutations
const mutations = {
    [types.SET_PRODUCT_INFO](state, product) {
        state.id = product.id;
    },
    [types.SET_PRODUCT_DETAILINFO](state, product) {
        state.productDetailHtml = product.productDetailHtml;
    },
    [types.SET_PRODUCT_IMGINFO](state, product) {
        state.imgInfo = {
            'image': product.image,
            'video': product.video
        };
    },
    [types.SET_PRODUCT_BASICINFO](state, basic) {
        // state.basicInfo = Object.assign(basic);
        state.basicInfo = JSON.parse(JSON.stringify(basic));
    },
    [types.SET_PRODUCT_PAYINFO](state, pay) {
        state.payInfo = JSON.parse(JSON.stringify(pay));
    }

};

export default {
    state,
    mutations
};