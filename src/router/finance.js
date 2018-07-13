
 // 订单模块
 import list from '@/module/finance/components/list/index.vue';
// import detail from '@/module/order/components/detail/index.vue';
// import entLiquidation from '@/module/order/components/entLiquidation/index.vue';
// import refundList from '@/module/order/components/refund/list.vue';
// import refundInfo from '@/module/order/components/refund/info.vue';

 export default  [
    { path: '/finance/', component: list, meta: { requiresAuth: true } },
    // { path: '/order/detail', component: detail, meta: { requiresAuth: true } },
    // { path: '/order/entLiquidation', component: entLiquidation, meta: { requiresAuth: true } },

    // { path: '/refund', component: refundList, meta: { requiresAuth: true } },
    // { path: '/refund/info',name: 'refundInfo', component: refundInfo, meta: { requiresAuth: true } },
 ];
 