import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import * as getters from './getters';
import area from './modules/area';
import areaSelection from './modules/areaSelection';
import product from './modules/product';
import miniPage from './modules/miniPage';
import dialog from './modules/dialog';
import im from './modules/im';
// import promise from 'es6-promise';

// promise.polyfill();
Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    actions,
    getters,
    modules: {
        areaSelection,
        area,
        product,
        dialog,
        im,
        miniPage
    },
    strict: debug,
    // plugins: debug ? [createLogger()] : []
});