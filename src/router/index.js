import Vue from 'vue'
import Router from 'vue-router'
import goods from './goods.js';
import store from './store.js';
import logistics from './logistics.js';
import order from './order.js';
import finance from './finance.js';
import account from './account.js';
import marketingCenter from './marketingCenter.js';
import join from './join.js';
import im from './im.js';
import login from '@/module/login/components/login/index.vue';
import index from '@/module/index/components/list/index.vue'; /*首页*/
import schoolList from '@/module/index/components/business_school/index.vue'; /*闪购商学院 列表*/
import schoolDetail from '@/module/index/components/business_school/detail.vue'; /*闪购商学院 详细*/
import noticeList from '@/module/index/components/notice/index.vue'; /*公告 列表*/
import noticeDetail from '@/module/index/components/notice/detail.vue'; /*公告 详细*/
import dataIdex from '@/module/data/components/index/index.vue'; /*公告 详细*/
import App from '../App';

Vue.use(Router)

 const router = new Router({
  routes: [
   ...goods,
   ...store,
   ...logistics,
   ...order,
   ...finance,
   ...account,
   ...marketingCenter,
   ...join,
   ...im,
   { path: '/login', component: login, meta: { requiresAuth: false } },
   { path: '/index', component: index, meta: { requiresAuth: true } },
   { path: '/index/schoolList', component: schoolList, meta: { requiresAuth: true } },
   { path: '/index/schoolDetail', component: schoolDetail, meta: { requiresAuth: true } },
   { path: '/index/noticeList', component: noticeList, meta: { requiresAuth: true } },
   { path: '/index/noticeDetail', component: noticeDetail, meta: { requiresAuth: true } },
   { path: '/dataIdex', component: dataIdex, meta: { requiresAuth: true } },
   { path: "*", redirect: '/index' },
  

  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
});

router.beforeEach((to, from, next) => {
  // console.log(from, from.path!="/login")
  //判断企业信息是否完整
  var ccb = localStorage.getItem('ccb')||'false';
//	  if (to.path == '/login') {
//	        // localStorage.removeItem('user');
//	  }
	if(ccb=='true'){
		if(to.path!='/account/entInfo/entUpdate' && to.path!='/login' && to.path!='/index' ){
			next({ path: '/index' });
		}		
	}

  // console.log(to, to.matched,to.matched.some(record => record.meta.requiresAuth));
  if (to.matched.some(record => record.meta.requiresAuth)) {
    let user = localStorage.getItem('user')&&JSON.parse(localStorage.getItem('user')).accessToken;
    let userInfo = JSON.parse(localStorage.getItem('user'))||{};
    let timeOut = localStorage.getItem('timeOut')&&(parseInt(localStorage.getItem('timeOut'))>new Date().getTime());
    // console.log(user, timeOut, localStorage.getItem('timeOut'), parseInt(localStorage.getItem('timeOut'))>new Date().getTime());
    if(user&&timeOut){   	
			next();
//    if(userInfo.isJoin){
//    		next();	
//    }else{
//    	if(userInfo.userEnter){
//			if(userInfo.userEnter.status == 'WAIT_AUDIT' || userInfo.userEnter.status == 'AUDIT_FALL'){//待审核
//				   next({ path: '/join/audit' });
//		    }else if(userInfo.userEnter.status == 'AUDIT_SUCCESS'){
//				   next({ path: '/join/pay' });
//			}
//    }else{
//    	 next({ path: '/join' });
//    }
//   }
   } else {      	
      next({ path: '/login' });
    } 
  } else {
    next();
  }

});
export default router;
