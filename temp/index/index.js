import Vue from 'vue';
import App from './app';
import ElementUI from 'element-ui'
import '@/assets/css/element/element-variables.scss'
import VueRouter from 'vue-router'
import Format from '@/common/js/time.js'

Vue.use(ElementUI)
Vue.use(VueRouter);


// 定义router
// import list from './components/list/index.vue';
// import detail from './components/detail/index.vue';
// const router = new VueRouter({
//   routes: [
//     { path: '/', component: list },
//     { path: '/detail', component: detail }
//   ]
// })

new Vue({
  el: '#app',
  // router,
  render: function(h) {
    return h(App);
  }
});
