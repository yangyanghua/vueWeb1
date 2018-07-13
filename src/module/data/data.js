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
import flow from './components/flow/index.vue';//模块
import sales from './components/sales/index.vue';//流量模块
import index from './components/index/index.vue';//默认模块
const router = new VueRouter({
  routes: [
    { path: '/', component: index },
    { path: '/flow', component: flow },
    { path: '/sales', component: sales }
  ]
})

new Vue({
  el: '#app',
  router,
  render: function(h) {
    return h(App);
  }
});

