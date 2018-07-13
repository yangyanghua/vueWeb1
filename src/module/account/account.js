
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
import password from './components/password/index.vue';/*修改密码*/
import constructionBank from './components/constructionBank/index.vue';/*修改密码*/
import management from './components/management/index.vue';/*账户管理*/
import role from './components/role/index.vue';  /*角色管理*/
const router = new VueRouter({
  routes: [
    { path: '/', component: password },
    { path: '/management', component: management },
    { path: '/role', component: role },
    { path: '/constructionBank', component: constructionBank },
  ]
})

new Vue({
  el: '#app',
  router,
  render: function(h) {
    return h(App);
  }
});


