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
import template from './components/template/index.vue';
import template_detail from './components/template/detail.vue';
import address from './components/address/index.vue';
import address_detail from './components/address/detail.vue';
import courier from './components/courier/index.vue';
import order from './components/order/index.vue';
const router = new VueRouter({
  routes: [
    { path: '/', component: template },
    { path: '/template_detail', component: template_detail },
    { path: '/address', component: address },
    { path: '/address_detail', component: address_detail },
    { path: '/courier', component: courier },
    { path: '/order', component: order }
  ]
})

new Vue({
  el: '#app',
  router,
  render: function(h) {
    return h(App);
  }
});

