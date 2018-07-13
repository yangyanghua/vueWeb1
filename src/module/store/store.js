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
import list from './components/storeInfo/index.vue';
import edit from './components/storeInfo/edit.vue';
import storeCategory from './components/storeCategory/index.vue';
import storeTemplate from './components/storeTemplate/index.vue';
import choosePro from './components/choosePro/index.vue';
//import storeBuild from './components/storeBuild/index.vue';
import FinalSett from './components/FinalSett/index.vue';
import collectionInfo from './components/FinalSett/collectionInfo.vue';

const router = new VueRouter({
  routes: [
    { path: '/', component: list },
    { path: '/edit', component: edit },
    { path: '/storeCategory', component: storeCategory },
    { path: '/storeTemplate', component: storeTemplate },
		{ path: '/choosePro', component: choosePro }, 
		{ path: '/FinalSett', component: FinalSett },
		{ path: '/collectionInfo', component: collectionInfo },
  ]
})

new Vue({
  el: '#app',
  router,
  render: function(h) {
    return h(App);
  }
});

