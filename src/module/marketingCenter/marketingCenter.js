import Vue from 'vue';
import App from './app';
import ElementUI from 'element-ui'
import '@/assets/css/element/element-variables.scss'
import VueRouter from 'vue-router'
import Format from '@/common/js/time.js'
import Filter from '@/common/js/filters.js'

Vue.use(ElementUI)
Vue.use(VueRouter);


//定义router
import salesPromotion from '@/module/marketingCenter/components/salesPromotion/index.vue';
import salesPromotion_detail from '@/module/marketingCenter/components/salesPromotion/detail.vue';
import salesPromotion_storeAdd from '@/module/marketingCenter/components/salesPromotion/storeAdd.vue';
import salesPromotion_commodityAdd from '@/module/marketingCenter/components/salesPromotion/commodityAdd.vue';
import salesPromotion_limitAdd from '@/module/marketingCenter/components/salesPromotion/limitAdd.vue';
const router = new VueRouter({
  routes: [
    { path: '/', component: salesPromotion },
    { path: '/salesPromotion_detail', component: salesPromotion_detail },
    { path: '/salesPromotion_storeAdd', component: salesPromotion_storeAdd },
    { path: '/salesPromotion_commodityAdd', component: salesPromotion_commodityAdd },
    { path: '/salesPromotion_limitAdd', component: salesPromotion_limitAdd }
  ]
})

new Vue({
  el: '#app',
  router,
  render: function(h) {
    return h(App);
  }
});

