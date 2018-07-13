
 // 营销中心
 // 闪购促销管理
//定义router
import salesPromotion from '@/module/marketingCenter/components/salesPromotion/index.vue';
import salesPromotion_detail from '@/module/marketingCenter/components/salesPromotion/detail.vue';
import salesPromotion_commodityAdd from '@/module/marketingCenter/components/salesPromotion/commodityAdd.vue';

export default  [
    { path: '/salesPromotion/', component: salesPromotion, meta: { requiresAuth: true } },
    { path: '/salesPromotion/salesPromotion_detail', component: salesPromotion_detail, meta: { requiresAuth: true } },
    { path: '/salesPromotion/salesPromotion_commodityAdd', component: salesPromotion_commodityAdd, meta: { requiresAuth: true } },
 
 ];



 