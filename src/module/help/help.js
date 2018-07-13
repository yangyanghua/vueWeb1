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
import help from './components/help/index.vue';
const router = new VueRouter({
  routes: [
    { path: '/', component: help },
  ]
})

new Vue({
  el: '#app',
  router,
  render: function(h) {
    return h(App);
  }
});

