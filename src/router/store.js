// 店铺模块

//定义router
import list from '@/module/store/components/storeInfo/index.vue';
import edit from '@/module/store/components/storeInfo/edit.vue';
import storeCategory from '@/module/store/components/storeCategory/index.vue';
import storeTemplate from '@/module/store/components/storeTemplate/index.vue';
import choosePro from '@/module/store/components/choosePro/index.vue';
//import storeBuild from '@/module/store/components/storeBuild/index.vue';
import FinalSett from '@/module/store/components/FinalSett/index.vue';
import collectionInfo from '@/module/store/components/FinalSett/collectionInfo.vue';
// import miniPage from '@/module/store/components/miniPage/index.vue';

export default [{
    path: '/store/info',
    component: list,
  meta: { requiresAuth: true }
  },
  {
    path: '/store/info/edit',
    component: edit,
    meta: { requiresAuth: true }
  },
//{
//  path: '/store/storeCategory',
//  component: storeCategory,
//  meta: { requiresAuth: true }
//},
//{
//  path: '/store/storeTemplate',
//  component: storeTemplate,
//  meta: { requiresAuth: true }
//},
//{
//  path: '/store/storeTemplate/choosePro',
//  component: choosePro,
//  meta: { requiresAuth: true }
//},
  {
    path: '/store/FinalSett',
    component: FinalSett,
    meta: { requiresAuth: true }
  },
  {
    path: '/store/collectionInfo',
    component: collectionInfo,
    meta: { requiresAuth: true }
  },
  // {
  //   path: '/store/miniPage',
  //   component: miniPage,
  //   meta: { requiresAuth: true }
  // },

];
