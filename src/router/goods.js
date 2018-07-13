
 // 商品模块
import goodsList from '@/module/goods/components/list/index.vue'
import goodsPublish from '@/module/goods/components/publish/index.vue'
import publicSuccess from '@/module/goods/components/publish/publicSuccess.vue'
import source from '@/module/goods/components/publish/source.vue'
import previewPage from '@/module/goods/components/publish/previewPage.vue'
export default  [
 {
    path: '/goods/publish',
    name: 'goodsPublish',
    component: goodsPublish,
    meta: { requiresAuth: true }
  },
  {
    path: '/goods/list',
    name: 'goodsList',
    component: goodsList,
    meta: { requiresAuth: true }
  },
  {
    path: '/goods/list/edit',
    name: 'goodsEdit',
    component: goodsPublish,
    meta: { requiresAuth: true }
  },
  {
    path: '/goods/publish/publicSuccess',
    name: 'publicSuccess',
    component: publicSuccess,
    meta: { requiresAuth: true }
  },
  {
    path: '/goods/source',
    name: 'source',
    component: source,
    meta: { requiresAuth: true }
  },
  {
    path: '/goods/publish/previewPage',
    name: 'previewPage',
    component: previewPage,
    meta: { requiresAuth: false }
  }
];
